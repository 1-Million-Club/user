import { MembershipTab } from '@/components/settings/membership-tab';
import { NotificationsTab } from '@/components/settings/notification-tab';
import ProfileTab from '@/components/settings/profile-tab';
import { SecurityTab } from '@/components/settings/security-tab';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Bell, CreditCard, HelpCircle, Lock, User, X } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router';

type Tab = 'profile' | 'membership' | 'notifications' | 'security' | 'legal';

const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: 'profile', label: 'Profile', icon: <User size={16} /> },
  { id: 'membership', label: 'Membership', icon: <CreditCard size={16} /> },
  { id: 'notifications', label: 'Notifications', icon: <Bell size={16} /> },
  { id: 'security', label: 'Security', icon: <Lock size={16} /> },
  { id: 'legal', label: 'Legal and support', icon: <HelpCircle size={16} /> },
];

export default function Settings() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const activeTab = (searchParams.get('tab') as Tab) ?? 'profile';

  function setTab(tab: Tab) {
    setSearchParams({ tab }, { replace: true });
  }

  return (
    <section className="h-screen flex flex-col overflow-hidden">
      {/* Sticky header */}
      <header className="shrink-0 flex md:w-4xl mx-auto items-center justify-between pt-12 pb-6">
        <h3 className="font-semibold text-[#001213] text-2xl">Settings</h3>
        <Button
          onClick={() => navigate(-1)}
          variant="outline"
          className="border-[#E5E5E5]"
        >
          Close <X />
        </Button>
      </header>

      {/* Body: nav + content */}
      <div className="flex flex-1 md:w-4xl mx-auto min-h-0 gap-6">
        {/* Left nav — does not scroll */}
        <nav className="w-56 shrink-0 border-r border-[#D4D4D4] pr-4 flex flex-col gap-1 self-start sticky top-0">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setTab(tab.id)}
                className={cn(
                  'flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-left transition-colors w-full',
                  isActive
                    ? 'bg-[#CCDFFF47] text-[#297AFF]'
                    : 'text-[#404040] hover:bg-[#F5F5F5]',
                )}
              >
                <span
                  className={isActive ? 'text-[#297AFF]' : 'text-quarternary'}
                >
                  {tab.icon}
                </span>
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Scrollable right content only */}
        <div className="flex-1 overflow-y-auto pb-10 min-h-0">
          {activeTab === 'profile' && <ProfileTab />}
          {activeTab === 'membership' && <MembershipTab />}
          {activeTab === 'notifications' && <NotificationsTab />}
          {activeTab === 'security' && <SecurityTab />}
          {activeTab === 'legal' && (
            <PlaceholderTab label="Legal and support" />
          )}
        </div>
      </div>
    </section>
  );
}

function PlaceholderTab({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center h-64 text-[#A3A3A3] text-sm font-medium">
      {label} settings coming soon.
    </div>
  );
}
