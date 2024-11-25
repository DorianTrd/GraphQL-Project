import React from 'react';
import { Link } from 'react-router-dom';

function PostCard({ post, deletePost }) {
    // Conversion du timestamp en objet Date, puis formatage de la date
    const formattedDate = new Date(parseInt(post.createdAt)).toLocaleString();

    return (
        <div className="post-card">
            <h3>{post.title} ({post.url})</h3>
            <p>By {post.author} on {formattedDate}</p>
            <Link to={`/post/${post.id}`}>View Comments</Link>
            <button onClick={() => deletePost(post.id)}>Delete</button>
        </div>
    );
}

export default PostCard;
