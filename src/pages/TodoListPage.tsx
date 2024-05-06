import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import TodoItem from '../components/molecules/TodoItem';
import { getTodos, deleteTodo, toggleTodo } from '../utils/api';
import { Todo } from '../utils/types';

const TodoListPage: React.FC = () => {
  const queryClient = useQueryClient();
  const {
    data: todos,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['todos'],
    queryFn: () => getTodos().then(response => response.data),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const toggleMutation = useMutation({
    mutationFn: (data: { id: number; completed: boolean }) =>
      toggleTodo(data.id, data.completed),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const handleDeleteTodo = (id: number) => {
    deleteMutation.mutate(id);
  };

  const handleToggleComplete = (id: number, completed: boolean) => {
    toggleMutation.mutate({ id, completed });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  return (
    <div className="container">
      <h2 className="text-center">Todo List</h2>
      <div className="row">
        {todos?.map((todo: Todo) => (
          <div key={todo.id} className="col-lg-4 mb-4">
            <TodoItem
              id={todo.id}
              title={todo.title}
              completed={todo.completed || false}
              onToggleComplete={() =>
                handleToggleComplete(todo.id, !todo.completed)
              }
              onDelete={() => handleDeleteTodo(todo.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoListPage;
