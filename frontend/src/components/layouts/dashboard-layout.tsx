import { Outlet } from 'react-router';
import NavBar from '../ui/nav';

export default function DashboardLayout() {
  return (
    <section>
      <NavBar />
      <div className="mt-24 max-w-7xl px-8">
        <Outlet />
      </div>
    </section>
  );
}
