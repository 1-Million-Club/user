import { Outlet } from 'react-router';
import NavBar from '../ui/nav';

export default function DashboardLayout() {
  return (
    <section>
      <NavBar />
      <div className="mt-24 max-w-4xl mx-auto">
        <Outlet />
      </div>
    </section>
  );
}
