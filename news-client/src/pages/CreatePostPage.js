import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';


const CREATE_POST = gql`
  mutation CreatePost($title: String!, $author: String!, $url: String!) {
    createPost(title: $title, author: $author, url: $url) {
      id
      title
      author
      url
      createdAt
    }
  }
`;

function CreatePostPage() {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');
    const [urlError, setUrlError] = useState('');
    const [createPost] = useMutation(CREATE_POST);

    const navigate = useNavigate();  


    const validateUrl = (url) => {
        const regex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(\/[^\s]*)?$/;
        return regex.test(url);
    };


    const handleCreatePost = async () => {
    
        if (!validateUrl(url)) {
            setUrlError('Veuillez entrer une URL valide.');
            return;
        }

        try {
            await createPost({ variables: { title, author, url } });
            navigate('/'); 
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    
    const handleBack = () => {
        navigate(-1); 
    };

    return (
        <div className="create-post-container">

            <h2>Creer un Nouveau Post</h2>
            <form onSubmit={(e) => e.preventDefault()} className="form-container">
                <div>
                    <label>Titre</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Auteur</label>
                    <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>URL</label>
                    <input
                        type="url"
                        value={url}
                        onChange={(e) => {
                            setUrl(e.target.value);
                            setUrlError('');  
                        }}
                        required
                    />
                    {urlError && <p style={{ color: 'red' }}>{urlError}</p>}
                </div>
                <button onClick={handleCreatePost}>Creer Post</button>
                <button onClick={handleBack} className="back-button">Retour</button>
            </form>
        </div>
    );
}

export default CreatePostPage;
