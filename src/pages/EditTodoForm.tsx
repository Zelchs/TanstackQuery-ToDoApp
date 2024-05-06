import React, { useState, useEffect } from 'react';
import Input from '../components/atoms/Input';
import Button from '../components/atoms/Button';
import { useParams } from '@tanstack/react-router';
import { getTodo, updateTodo } from '../utils/api';
import Textarea from '../components/atoms/TextArea';
import { Todo } from '../utils/types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';

const EditTodoForm: React.FC = () => {
  const { id } = useParams({ from: '/edit/todo/$id' });
  const [todo, setTodo] = useState<Todo | undefined>(undefined);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (id) {
      getTodo(id)
        .then(response => {
          setTodo(response.data);
          setTitle(response.data.title);
          setContent(response.data.content);
        })
        .catch(error => {
          console.error('Error fetching todo:', error);
        });
    }
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      updateTodo(id, { title, content })
        .then(() => {
          window.location.href = `/todos/${id}`;
        })
        .catch(error => {
          console.error('Error updating todo:', error);
        });
    } else {
      console.error('ID parameter is undefined');
    }
  };

  return (
    <div className="container">
      {todo ? (
        <div>
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
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default EditTodoForm;
