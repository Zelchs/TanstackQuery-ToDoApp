import { createRoute } from '@tanstack/react-router';
import EditTodoForm from '../pages/EditTodoForm';
import { rootRoute } from './root-route';

export const editTodoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/edit/todo/$id',
  component: () => <EditTodoForm />,
});
