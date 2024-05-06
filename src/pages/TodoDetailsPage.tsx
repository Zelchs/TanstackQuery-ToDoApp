import React from 'react';
import { useQuery } from '@tanstack/react-query';
import Comments from '../components/containers/Comments';
import { getTodo } from '../utils/api';
import { Todo } from '../utils/types';
import { todoDetailsRoute } from '../routes/todosDetails-route';

const TodoDetailsPage: React.FC = () => {
  const { id } = todoDetailsRoute.useParams();

  const {
    data: todo,
    isLoading,
    error,
  } = useQuery<Todo, Error>({
    queryKey: ['todo', id],
    queryFn: () => getTodo(id),
    enabled: !!id,
  });

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  if (!todo) return <div>Todo not found.</div>;

  return (
    <div className="container mt-5">
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
  );
};

export default TodoDetailsPage;
