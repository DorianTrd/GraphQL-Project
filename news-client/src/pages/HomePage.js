import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import PostCard from '../components/PostCard';


const GET_POSTS = gql`
  query GetPosts($order: String!) {
    posts(order: $order) {
      id
      title
      author
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


const DELETE_POST = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id)
  }
`;

function HomePage() {
    const [order, setOrder] = useState("DESC"); 
    const { loading, error, data } = useQuery(GET_POSTS, {
        variables: { order }, 
    });
    const [deletePostMutation] = useMutation(DELETE_POST);
    const navigate = useNavigate();

    
    const deletePost = async (id) => {
        try {
            const { data } = await deletePostMutation({ variables: { id } });
            if (data.deletePost) {
                console.log(`Post ${id} deleted`);
            } else {
                console.error('Failed to delete the post');
            }
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };


    const goToCreatePostPage = () => {
        navigate('/create'); 
    };

    const handleSortAscending = () => {
        setOrder("ASC"); 
    };

 
    const handleSortDescending = () => {
        setOrder("DESC"); 
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="home-page">
            <button onClick={goToCreatePostPage}>Create a New Post</button>

        
            <div className="sort-buttons">
                <button onClick={handleSortAscending}>Trier par Date Croissante</button>
                <button onClick={handleSortDescending}>Trier par Date Decroissante</button>
            </div>

            <div className="post-list">
                {data.posts.map((post) => (
                    <PostCard key={post.id} post={post} deletePost={deletePost} />
                ))}
            </div>
        </div>
    );
}

export default HomePage;
