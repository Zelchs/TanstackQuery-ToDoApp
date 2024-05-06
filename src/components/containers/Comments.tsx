import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Comment, CommentsProps, NewComment } from '../../utils/types';
import {
  getComments,
  addComment,
  editComment,
  deleteComment,
} from '../../utils/api';
import Button from '../atoms/Button';
import Textarea from '../atoms/TextArea';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons';

const Comments: React.FC<CommentsProps> = ({ todoId }) => {
  const [newComment, setNewComment] = useState('');
  const queryClient = useQueryClient();

  const { data: comments, isLoading } = useQuery<Comment[]>({
    queryKey: ['comments', todoId],
    queryFn: () => getComments(todoId),
    enabled: !!todoId,
  });

  const addCommentMutation = useMutation({
    mutationFn: (newComment: NewComment) => addComment(newComment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', todoId] });
    },
  });

  const editCommentMutation = useMutation({
    mutationFn: (data: { id: number; text: string }) =>
      editComment(data.id, data.text),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', todoId] });
    },
  });

  const deleteCommentMutation = useMutation({
    mutationFn: (id: number) => deleteComment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', todoId] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addCommentMutation.mutate({ todoId, text: newComment });
    setNewComment('');
  };

  const handleEditComment = (id: number) => {
    if (!comments) {
      console.log('No comments available.');
      return;
    }

    const currentComment = comments.find(comment => comment.id === id);
    if (!currentComment) {
      console.log('Comment not found.');
      return;
    }

    const newText = prompt('Enter new comment text:', currentComment.text);
    if (newText !== null) {
      editCommentMutation.mutate({ id, text: newText });
    }
  };

  const handleDeleteComment = (id: number) => {
    deleteCommentMutation.mutate(id);
  };

  if (isLoading) return <div>Loading comments...</div>;
  if (!comments) return <div>No comments found.</div>;

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
                onClick={() => handleEditComment(comment.id)}
                className="btn btn-sm btn-primary"
              >
                <FontAwesomeIcon icon={faEdit} /> Edit
              </Button>
              <Button
                onClick={() => handleDeleteComment(comment.id)}
                className="btn btn-sm btn-danger ml-2"
              >
                <FontAwesomeIcon icon={faTrashAlt} /> Delete
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
