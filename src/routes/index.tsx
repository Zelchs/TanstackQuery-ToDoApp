import { createRouter } from '@tanstack/react-router';
import { rootRoute } from './root-route';
import { indexRoute } from './index-route';
import { addTodoRoute } from './addTodo-route';
import { editTodoRoute } from './editTodo-route';
import { todoDetailsRoute } from './todosDetails-route';

const routeTree = rootRoute.addChildren([
  indexRoute,
  addTodoRoute,
  editTodoRoute,
  todoDetailsRoute,
]);

export const router = createRouter({ routeTree });
