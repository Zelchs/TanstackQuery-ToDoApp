import React, { useState, useEffect } from 'react';
import { useParams } from '@tanstack/react-router';
import Comments from '../components/containers/Comments';
import { getTodo } from '../utils/api';
import { Todo } from '../utils/types';

const TodoDetailsPage: React.FC = () => {
  const { id } = useParams({ from: '/todos/$id' });
  const [todo, setTodo] = useState<Todo | undefined>(undefined);

  useEffect(() => {
    if (id) {
      getTodo(id)
        .then(response => {
          setTodo(response.data);
        })
        .catch(error => {
          console.error('Error fetching todo:', error);
        });
    }
  }, [id]);

  return (
    <div className="container mt-5">
      {todo ? (
        <div>
          <h2 className={todo.completed ? 'text-decoration-line-through' : ''}>
            {todo.title}
          </h2>
          <div className="card mt-3">
            <div className="card-body">
              <p className="card-text">{todo.content}</p>
            </div>
          </div>
          <hr className="mt-4 mb-4" />
          <Comments todoId={todo.id} />
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default TodoDetailsPage;
