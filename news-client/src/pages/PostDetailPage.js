import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gql, useQuery, useMutation } from '@apollo/client';


const GET_POSTS = gql`
  query GetPosts {
    posts(order: "DESC") {
      id
      author
      title
      url
      createdAt
      comments {
        id
        content
        name
        createdAt
      }
    }
  }
`;


const ADD_COMMENT = gql`
  mutation AddComment($postId: ID!, $name: String!, $content: String!) {
    createComment(postId: $postId, name: $name, content: $content) {
      id
      content
      name
      createdAt
    }
  }
`;

function PostDetailPage() {
    const { id } = useParams(); 
    const [name, setName] = useState('');
    const [content, setContent] = useState('');
    const [post, setPost] = useState(null); 

    const { loading, error, data } = useQuery(GET_POSTS); 
    const [addComment] = useMutation(ADD_COMMENT, {
        onCompleted: (data) => {
            if (data && data.createComment) {
                setPost((prevPost) => ({
                    ...prevPost,
                    comments: [...prevPost.comments, data.createComment],
                }));
            }
        },
    });

    const navigate = useNavigate(); 

    useEffect(() => {
        if (data && data.posts) {
            const foundPost = data.posts.find((post) => post.id === id); 
            setPost(foundPost);
        }
    }, [data, id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    if (!post) return <div>Post not found</div>;

   
    const formatDate = (timestamp) => {
        return new Date(parseInt(timestamp)).toLocaleString();
    };

    const handleAddComment = async () => {
        try {
            await addComment({
                variables: { postId: id, name, content },
            });
            setName(''); 
            setContent('');  
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    const handleBackToHome = () => {
        navigate('/'); 
    };

    return (
        <div className="container">
            <button className="button" onClick={handleBackToHome}>Revenir a la page d'accueil</button>
            <h2>{post.title} ({post.url})</h2>
            <p className="info">By {post.author}    on {formatDate(post.createdAt)}</p>

            <div className="form-container">
                <input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <textarea
                    placeholder="Your Comment"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <button className="submit-button" onClick={handleAddComment}>Add Comment</button>
            </div>

            <div className="comment-container">
                {post.comments.map((comment) => (
                    <div key={comment.id} className="comment">
                        <strong className="comment-name">{comment.name}</strong>:
                        <p className="comment-text">{comment.content}</p>
                        <p className="comment-date">Commented on: {formatDate(comment.createdAt)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PostDetailPage;
