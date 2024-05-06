import React, { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getTodo, updateTodo } from '../utils/api';
import Input from '../components/atoms/Input';
import Button from '../components/atoms/Button';
import Textarea from '../components/atoms/TextArea';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { Todo } from '../utils/types';
import { editTodoRoute } from '../routes/editTodo-route';

const EditTodoForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = editTodoRoute.useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const { data: todo, isLoading } = useQuery({
    queryKey: ['todo', id],
    queryFn: () => getTodo(id),
  });

  useEffect(() => {
    if (todo) {
      setTitle(todo.title);
      setContent(todo.content);
    }
  }, [todo]);

  const updateMutation = useMutation({
    mutationFn: (data: { id: string; data: Partial<Todo> }) =>
      updateTodo(data.id, data.data),
    onSuccess: () => {
      navigate({ to: `/todos/${id}` });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate({ id, data: { title, content } });
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container">
      <h2 className="text-center">Edit Todo</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <Input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Content:</label>
          <Textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            className="form-control"
          />
        </div>
        <Button type="submit" className="btn-primary">
          <FontAwesomeIcon icon={faSave} /> Save
        </Button>
      </form>
    </div>
  );
};

export default EditTodoForm;
