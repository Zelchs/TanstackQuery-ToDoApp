import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import Button from '../atoms/Button';
import Textarea from '../atoms/TextArea';
import { Comment, CommentsProps, NewComment } from '../../utils/types';
import { getComments, editComment, deleteComment } from '../../utils/api';
import { addComment } from '../../utils/api';

const Comments: React.FC<CommentsProps> = ({ todoId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    getComments(todoId)
      .then(response => {
        setComments(response.data);
      })
      .catch(error => {
        console.error('Error fetching comments:', error);
      });
  }, [todoId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const commentData: NewComment = { todoId, text: newComment };
    addComment(commentData)
      .then(response => {
        setComments(prevComments => [
          ...prevComments,
          { id: response.id, todoId, text: newComment },
        ]);
        setNewComment('');
      })
      .catch(error => {
        console.error('Error adding comment:', error);
      });
  };

  const handleEditComment = (id: number, newText: string) => {
    editComment(id, newText)
      .then(() => {
        setComments(prevComments =>
          prevComments.map(comment => {
            if (comment.id === id) {
              return { ...comment, text: newText };
            }
            return comment;
          })
        );
      })
      .catch(error => {
        console.error('Error editing comment:', error);
      });
  };

  const handleDeleteComment = (id: number) => {
    deleteComment(id)
      .then(() => {
        setComments(prevComments =>
          prevComments.filter(comment => comment.id !== id)
        );
      })
      .catch(error => {
        console.error('Error deleting comment:', error);
      });
  };

  return (
    <div className="mt-4">
      <h4 className="mb-3">Comments</h4>
      <ul className="list-group">
        {comments.map(comment => (
          <li
            key={comment.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <span>{comment.text}</span>
            <span className="ml-2">
              <Button
                onClick={() => {
                  const newText = prompt(
                    'Enter new comment text:',
                    comment.text
                  );
                  if (newText !== null) {
                    handleEditComment(comment.id, newText);
                  }
                }}
                className="btn btn-sm btn-primary"
              >
                <FontAwesomeIcon icon={faEdit} />
                <span className="ml-1">Edit</span>
              </Button>
              <Button
                onClick={() => handleDeleteComment(comment.id)}
                className="btn btn-sm btn-danger ml-2"
              >
                <FontAwesomeIcon icon={faTrashAlt} />
                <span className="ml-1">Delete</span>
              </Button>
            </span>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit} className="mt-3">
        <Textarea
          value={newComment}
          onChange={e => setNewComment(e.target.value)}
          placeholder="Add a new comment"
          className="mb-2"
        />
        <Button type="submit" className="btn btn-primary">
          <FontAwesomeIcon icon={faPlus} /> Add Comment
        </Button>
      </form>
    </div>
  );
};

export default Comments;
