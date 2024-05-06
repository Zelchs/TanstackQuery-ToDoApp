import { createRoute } from '@tanstack/react-router';
import AddTodoForm from '../pages/AddTodoForm';
import { rootRoute } from './root-route';

export const addTodoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/add',
  component: () => <AddTodoForm />,
});
