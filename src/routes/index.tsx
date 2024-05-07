import { createRouter } from '@tanstack/react-router';
import { rootRoute } from './root-route';
import { indexRoute } from './index-route';
import { addTodoRoute } from './addTodo-route';
import { editTodoRoute } from './editTodo-route';
import { todoDetailsRoute } from './todosDetails-route';
import { rickAndMortyRoute } from './rickAndMorty-route';

const routeTree = rootRoute.addChildren([
  indexRoute,
  addTodoRoute,
  editTodoRoute,
  todoDetailsRoute,
  rickAndMortyRoute,
]);

export const router = createRouter({ routeTree });
