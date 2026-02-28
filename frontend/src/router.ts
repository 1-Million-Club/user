import { createBrowserRouter } from 'react-router';
import DashboardLayout from './components/layouts/dashboard-layout';
import AccountSetup from './pages/account-setup';
import CheckIns from './pages/check-ins';
import Dashboard from './pages/dashboard';
import Home from './pages/home';
import Login from './pages/login';
import Quiz from './pages/quiz';

export const router = createBrowserRouter([
  { path: '/', Component: Home },
  { path: '/login', Component: Login },
  { path: '/set-up', Component: AccountSetup },
  {
    path: '/dashboard',
    Component: DashboardLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: 'check-ins', Component: CheckIns },
      { path: 'quiz', Component: Quiz },
    ],
  },
]);
