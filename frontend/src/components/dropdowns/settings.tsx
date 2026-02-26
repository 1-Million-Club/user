import { ChevronDown, LogOut, Settings } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

export default function SettingsDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1 outline-none">
        <Avatar className="size-8">
          <AvatarFallback className="bg-[#000130] text-white text-xs font-semibold">
            LN
          </AvatarFallback>
          <AvatarImage src="" />
        </Avatar>
        <ChevronDown size={16} color="#525252" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-56 rounded-xl p-2"
        style={{
          boxShadow:
            '0 0 18px 3px rgba(206,206,206,0.18), 0 0 12px 4px rgba(0,0,0,0.09)',
        }}
      >
        {/* User info */}
        <div className="flex items-center gap-3 px-3 py-2.5">
          <Avatar className="size-9 shrink-0">
            <AvatarFallback className="bg-[#FFBB61] text-white text-xs font-semibold">
              LN
            </AvatarFallback>
            <AvatarImage src="" />
          </Avatar>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-semibold text-black truncate">
              Lina Niss
            </span>
            <span className="text-xs text-[#344054] truncate">
              lina.niss@onemillion.io
            </span>
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="flex items-center gap-3 rounded-lg px-3 py-2.5 cursor-pointer">
          <Settings size={16} className="text-quarternary" />
          <span className="text-sm font-medium text-dark-black">Settings</span>
        </DropdownMenuItem>

        <DropdownMenuItem className="flex items-center gap-3 rounded-lg px-3 py-2.5 cursor-pointer">
          <LogOut size={16} className="text-quarternary" />
          <span className="text-sm font-medium text-dark-black">Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
