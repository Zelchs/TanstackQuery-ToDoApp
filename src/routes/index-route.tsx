import { createRoute } from '@tanstack/react-router';
import TodoListPage from '../pages/TodoListPage';
import { rootRoute } from './root-route';

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => <TodoListPage />,
});
