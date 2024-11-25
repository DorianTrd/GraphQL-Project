import React from 'react';

function CommentList({ comments }) {
    return (
        <div>
            {comments.map((comment) => (
                <div key={comment.id}>
                    <strong>{comment.name}</strong> <small>{new Date(comment.createdAt).toLocaleString()}</small>
                    <p>{comment.content}</p>
                </div>
            ))}
        </div>
    );
}

export default CommentList;
