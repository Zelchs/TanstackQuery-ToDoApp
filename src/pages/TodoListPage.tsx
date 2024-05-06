import React, { useState, useEffect } from 'react';
import TodoItem from '../components/molecules/TodoItem';
import { getTodos, deleteTodo, toggleTodo } from '../utils/api';
import { Todo } from '../utils/types';

const TodoListPage: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    getTodos()
      .then(response => {
        setTodos(response.data);
      })
      .catch(error => {
        console.error('Error fetching todos:', error);
      });
  }, []);

  const handleDeleteTodo = (id: number) => {
    deleteTodo(id)
      .then(() => {
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
      })
      .catch(error => {
        console.error('Error deleting todo:', error);
      });
  };

  const handleToggleComplete = (id: number) => {
    const todo = todos.find(todo => todo.id === id);
    if (!todo) {
      console.error(`Todo with id ${id} not found`);
      return;
    }

    toggleTodo(id, !todo.completed)
      .then(() => {
        setTodos(prevTodos =>
          prevTodos.map(todoItem => {
            if (todoItem.id === id) {
              return { ...todoItem, completed: !todoItem.completed };
            }
            return todoItem;
          })
        );
      })
      .catch(error => {
        console.error('Error updating todo:', error);
      });
  };

  return (
    <div className="container">
      <h2 className="text-center">Todo List</h2>
      <div className="row">
        {todos.map(todo => (
          <div key={todo.id} className="col-lg-4 mb-4">
            <TodoItem
              id={todo.id}
              title={todo.title}
              completed={todo.completed || false}
              onToggleComplete={() => handleToggleComplete(todo.id)}
              onDelete={() => handleDeleteTodo(todo.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoListPage;
