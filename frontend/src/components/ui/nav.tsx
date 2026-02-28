import { cn } from '@/lib/utils';
import { NavLink, useLocation } from 'react-router';
import InvestAIDropdown from '../dropdowns/ai';
import NotificationsDropdown from '../dropdowns/notification';
import SettingsDropdown from '../dropdowns/settings';

const navLinks = [
  { name: 'Dashboard', link: '/Dashboard' },
  { name: 'Check-ins', link: '/dashboard/check-ins' },
  { name: 'Resources', link: '/dashboard/resources' },
];

export default function NavBar() {
  const { pathname } = useLocation();
  const isQuizPage = pathname === '/dashboard/quiz';

  return (
    <header className="fixed top-0 z-20 flex w-full items-center justify-between border-b border-[#E5E5E5] bg-white py-4">
      <article className="flex items-center mx-auto justify-between gap-4 w-4xl">
        <article className="flex items-center justify-between gap-4">
          <img src="/logo.webp" alt="one million club" className="size-8" />
          {!isQuizPage && (
            <div className="border-dark-gray bg-dark-gray h-10 w-0.5 border" />
          )}
          {!isQuizPage && (
            <nav className="flex items-center justify-center gap-4">
              {navLinks.map((item) => (
                <NavLink
                  to={item.link}
                  key={item.link}
                  className={({ isActive }) =>
                    cn(
                      'text-tertiary rounded-[5px] p-2 text-sm font-semibold',
                      isActive && 'bg-[#297AFF33] text-[#0E47A4]',
                    )
                  }
                  end
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>
          )}
        </article>

        <article className="flex items-center justify-center gap-4">
          {!isQuizPage && <InvestAIDropdown />}
          {!isQuizPage && <NotificationsDropdown />}
          <SettingsDropdown />
        </article>
      </article>
    </header>
  );
}
