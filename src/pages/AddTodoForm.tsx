import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addTodo } from '../utils/api';
import Input from '../components/atoms/Input';
import Button from '../components/atoms/Button';
import Textarea from '../components/atoms/TextArea';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Todo } from '../utils/types';

const AddTodoForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const queryClient = useQueryClient();

  const addTodoMutation = useMutation({
    mutationFn: (newTodo: Omit<Todo, 'id'>) => addTodo(newTodo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      window.location.href = '/';
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTodoMutation.mutate({ title, content, completed: false });
  };

  return (
    <div className="container">
      <h2 className="text-center">Add Todo</h2>
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
        <Button type="submit" className="btn-primary mt-2">
          <FontAwesomeIcon icon={faPlus} /> Add
        </Button>
      </form>
    </div>
  );
};

export default AddTodoForm;
