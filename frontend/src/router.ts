import { createBrowserRouter } from 'react-router';
import Login from './pages/login';

export const router = createBrowserRouter([
  { path: 'login', Component: Login },
]);
