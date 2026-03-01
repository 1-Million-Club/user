import { Switch } from '@/components/ui/switch';
import { useState } from 'react';

type NotificationSetting = {
  id: string;
  title: string;
  description: string;
};

const notificationSettings: NotificationSetting[] = [
  {
    id: 'email',
    title: 'Email',
    description: 'Receive reminders and alerts via email',
  },
  {
    id: 'in-app',
    title: 'In-app',
    description: 'Receive reminders and alerts via the notifications channel',
  },
];

export function NotificationsTab() {
  const [enabled, setEnabled] = useState<Record<string, boolean>>({
    email: true,
    'in-app': true,
  });

  function toggle(id: string) {
    setEnabled((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="font-bold text-[#0A0A0A] text-xl">Notifications</h2>
        <p className="text-sm text-quarternary font-medium">
          Select which channel you would like to receive alerts
        </p>
      </div>

      <div className="flex flex-col gap-3 mt-2">
        {notificationSettings.map((setting) => (
          <div
            key={setting.id}
            className="flex items-center justify-between border border-[#F0F0F0] rounded-xl px-4 py-3.5"
          >
            <div className="flex flex-col gap-0.5">
              <p className="text-sm font-semibold text-[#0A0A0A]">
                {setting.title}
              </p>
              <p className="text-sm text-quarternary font-medium">
                {setting.description}
              </p>
            </div>
            <Switch
              checked={enabled[setting.id]}
              onCheckedChange={() => toggle(setting.id)}
              className="data-[state=checked]:bg-[#297AFF] w-11"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
