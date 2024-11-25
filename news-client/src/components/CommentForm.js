import React, { useState } from 'react';

function CommentForm({ onAddComment }) {
    const [name, setName] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddComment(name, content);
        setName('');
        setContent('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Auteur"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <textarea
                placeholder="Commentaire"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
            />
            <button type="submit">Ajouter un commentaire</button>
        </form>
    );
}

export default CommentForm;
