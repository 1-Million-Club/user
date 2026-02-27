import { cn } from '@/lib/utils';
import { Sparkles } from 'lucide-react';
import { NavLink, useLocation } from 'react-router';
import NotificationsDropdown from '../dropdowns/notification';
import SettingsDropdown from '../dropdowns/settings';
import { Button } from './button';

const navLinks = [
  { name: 'Dashboard', link: '/Dashboard' },
  { name: 'Check-ins', link: '/check-ins' },
  { name: 'Resources', link: '/resources' },
];

export default function NavBar() {
  const { pathname } = useLocation();
  const isQuizPage = pathname === '/dashboard/quiz';

  return (
    <header className="fixed top-0 z-20 flex w-full items-center justify-between border-b border-[#E5E5E5] bg-white px-8 py-4">
      <article className="flex items-center justify-between gap-4 w-7xl">
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
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>
          )}
        </article>

        <article className="flex items-center justify-center gap-4">
          {!isQuizPage && (
            <Button className="bg-linear-to-r rounded-[48px] text-sm gap-2 from-[#EF24EB] to-[#9B53FF]">
              <Sparkles fill="white" />
              Ask InvestAI
            </Button>
          )}
          {!isQuizPage && <NotificationsDropdown />}

          <SettingsDropdown />
        </article>
      </article>
    </header>
  );
}
