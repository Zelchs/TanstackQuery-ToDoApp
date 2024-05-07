import { createRoute } from '@tanstack/react-router';
import RickAndMorty from '../pages/CharactersPage';
import { rootRoute } from './root-route';

export const rickAndMortyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/rick-and-morty',
  component: () => <RickAndMorty />,
});
