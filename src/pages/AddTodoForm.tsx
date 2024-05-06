import React, { useState } from 'react';
import Input from '../components/atoms/Input';
import Button from '../components/atoms/Button';
import { addTodo } from '../utils/api';
import Textarea from '../components/atoms/TextArea';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const AddTodoForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTodo({ title, content, completed: false })
      .then(() => {
        window.location.href = '/';
      })
      .catch(error => {
        console.error('Error adding todo:', error);
      });
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
        <div className="form-group">
          <Button type="submit" className="btn-primary mt-2">
            <FontAwesomeIcon icon={faPlus} /> Add
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddTodoForm;
