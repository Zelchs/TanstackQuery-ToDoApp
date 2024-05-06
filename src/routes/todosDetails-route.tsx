import { createRoute } from '@tanstack/react-router';
import TodoDetailsPage from '../pages/TodoDetailsPage';
import { rootRoute } from './root-route';

export const todoDetailsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/todos/$id',
  component: () => <TodoDetailsPage />,
});
