import { router } from './routes';
import { RouterProvider } from '@tanstack/react-router';

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
