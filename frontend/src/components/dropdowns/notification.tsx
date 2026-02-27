import { cn } from '@/lib/utils';
import {
  AlarmClock,
  Bell,
  ChevronLeft,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

export interface NotificationAction {
  label: string;
  onClick: () => void;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  action?: NotificationAction;
}

// Mock data — replace with real data source
const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Check-in reminder',
    message: 'Your June check-in is due on June 30. Stay consist...',
    timestamp: '15 minutes ago',
    read: false,
    action: { label: 'Submit check-in', onClick: () => {} },
  },
  {
    id: '2',
    title: 'June check-in reminder',
    message: 'Your June check-in is due on June 30. Stay consist...',
    timestamp: '15 minutes ago',
    read: true,
    action: { label: 'Submit check-in', onClick: () => {} },
  },
  {
    id: '3',
    title: 'June check-in reminder',
    message: 'Your June check-in is due on June 30. Stay consist...',
    timestamp: '15 minutes ago',
    read: true,
    action: { label: 'Submit check-in', onClick: () => {} },
  },
  {
    id: '4',
    title: 'Check-in reminder',
    message: 'Your June check-in is due on June 30. Stay consist...',
    timestamp: '15 minutes ago',
    read: false,
  },
  {
    id: '5',
    title: 'Check-in reminder',
    message: 'Your June check-in is due on June 30. Stay consist...',
    timestamp: '15 minutes ago',
    read: false,
  },
  {
    id: '6',
    title: 'June check-in reminder',
    message: 'Your June check-in is due on June 30. Stay consist...',
    timestamp: '15 minutes ago',
    read: true,
    action: { label: 'Submit check-in', onClick: () => {} },
  },
  {
    id: '7',
    title: 'Check-in reminder',
    message: 'Your June check-in is due on June 30. Stay consist...',
    timestamp: '15 minutes ago',
    read: false,
  },
  {
    id: '8',
    title: 'June check-in reminder',
    message: 'Your June check-in is due on June 30. Stay consist...',
    timestamp: '15 minutes ago',
    read: true,
    action: { label: 'Submit check-in', onClick: () => {} },
  },
];

function NotificationIcon() {
  return (
    <div className="flex items-center justify-center size-9 rounded-full bg-[#FEF08A]">
      <AlarmClock size={18} color="#171717" />
    </div>
  );
}

interface NotificationItemProps {
  notification: Notification;
  onClick: (n: Notification) => void;
}

function NotificationItem({ notification, onClick }: NotificationItemProps) {
  return (
    <button
      onClick={() => onClick(notification)}
      className={cn(
        'w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-colors hover:bg-gray-50',
        !notification.read && 'bg-[#2563EB33] hover:bg-[#2563EB33]/50',
      )}
    >
      <NotificationIcon />
      <div className="flex-1 min-w-0">
        <p
          className={cn(
            'text-sm truncate font-medium',
            notification.read ? ' text-[#737373]' : 'text-[#0A0A0A]',
          )}
        >
          {notification.title}
        </p>
        <p
          className={cn(
            'font-medium text-xs truncate',
            notification.read ? 'text-[#737373]' : 'text-[#0A0A0A]',
          )}
        >
          {notification.message}
        </p>
        <p className="text-xs text-[#737373] mt-1">{notification.timestamp}</p>
      </div>
    </button>
  );
}

interface NotificationDetailProps {
  notification: Notification;
  onBack: () => void;
}

function NotificationDetail({ notification, onBack }: NotificationDetailProps) {
  return (
    <div className="p-4">
      <button
        onClick={onBack}
        className="text-[#171717] cursor-pointer text-sm mb-4 flex items-center gap-1 hover:text-black transition-colors"
      >
        <ChevronLeft size={16} color="#171717" />
      </button>
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-bold text-darker-black">
          {notification.title}
        </p>
        <span className="text-xs text-[#737373] shrink-0 mt-0.5">
          {notification.timestamp}
        </span>
      </div>
      <p className="text-sm text-[#737373] mt-2 leading-relaxed">
        {/* Show full message — in real usage this would be the full text */}
        Your June check-in is due on June 30. Stay consistent and submit early.
      </p>
      {notification.action && (
        <Button
          className="mt-4 rounded-lg text-white text-sm h-9 px-4"
          onClick={notification.action.onClick}
        >
          {notification.action.label}
        </Button>
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="size-12 rounded-full bg-[#F5F5F5] flex items-center justify-center mb-3">
        <Bell size={20} className="text-[#A3A3A3]" />
      </div>
      <p className="text-sm font-semibold text-[#1A1A1A]">No notifications</p>
      <p className="text-xs text-[#A3A3A3] mt-1">You're all caught up!</p>
    </div>
  );
}

interface NotificationsDropdownProps {
  notifications?: Notification[];
}

export default function NotificationsDropdown({
  notifications = mockNotifications,
}: NotificationsDropdownProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Notification | null>(null);
  const [items, setItems] = useState<Notification[]>(notifications);

  const unreadCount = items.filter((n) => !n.read).length;

  const handleSelect = (n: Notification) => {
    setSelected(n);
    // Mark as read
    setItems((prev) =>
      prev.map((item) => (item.id === n.id ? { ...item, read: true } : item)),
    );
  };

  const handleMarkAllRead = () => {
    setItems((prev) => prev.map((item) => ({ ...item, read: true })));
  };

  return (
    <DropdownMenu
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) setSelected(null);
      }}
    >
      <DropdownMenuTrigger className="relative outline-none" asChild>
        <button className="relative flex items-center justify-center cursor-pointer">
          <Bell size={22} color="#737373" fill="#737373" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-0 flex items-center justify-center size-3 rounded-full bg-[#EF4444] text-[#EF4444] text-[9px] font-bold leading-none">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-72 rounded-2xl p-0 overflow-hidden"
        style={{
          boxShadow:
            '0 0 18px 3px rgba(206,206,206,0.18), 0 0 12px 4px rgba(0,0,0,0.09)',
        }}
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        {selected ? (
          <NotificationDetail
            notification={selected}
            onBack={() => setSelected(null)}
          />
        ) : (
          <>
            {/* Header */}
            <div className="flex items-center justify-between px-4 pt-4 pb-2">
              <span className="text-sm font-bold text-[#1A1A1A]">
                Notifications
              </span>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <button
                    onClick={handleMarkAllRead}
                    className="p-1 rounded hover:bg-gray-100 transition-colors"
                    title="Mark all as read"
                  >
                    <SlidersHorizontal size={15} color="#525252" />
                  </button>
                )}
                <button
                  onClick={() => setOpen(false)}
                  className="p-1 rounded hover:bg-gray-100 transition-colors"
                >
                  <X size={15} color="#525252" />
                </button>
              </div>
            </div>

            {/* List */}
            <div className="max-h-[380px] overflow-y-auto px-1 pb-2">
              {items.length === 0 ? (
                <EmptyState />
              ) : (
                <div className="flex flex-col gap-0.5">
                  {items.map((n) => (
                    <NotificationItem
                      key={n.id}
                      notification={n}
                      onClick={handleSelect}
                    />
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
