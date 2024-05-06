import { createRootRoute } from '@tanstack/react-router';
import RootLayout from '../pages/RootLayout';
import { Outlet } from '@tanstack/react-router';

export const rootRoute = createRootRoute({
  component: () => (
    <>
      <RootLayout />
      <Outlet />
    </>
  ),
});
