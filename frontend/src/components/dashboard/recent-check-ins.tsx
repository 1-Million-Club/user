import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

interface CheckIn {
  date: string;
  amount: string;
}

const recentCheckIns: CheckIn[] = [
  { date: '17 January, 2026', amount: 'GHS 1,500' },
  { date: '20 February, 2026', amount: 'GHS 1,500' },
  { date: '18 March, 2026', amount: 'GHS 1,500' },
];

interface RecentCheckInsProps {
  hasData: boolean;
}

export function RecentCheckIns({ hasData }: RecentCheckInsProps) {
  return (
    <div
      className={cn(
        'flex-1 rounded-2xl border border-[#E5E5E5] bg-white ',
        hasData ? 'py-3' : 'pt-3 pb-0',
      )}
    >
      <div className="flex items-center justify-between mb-4 px-3">
        <h3 className="font-semibold text-[#404040]">Recent check-ins</h3>
        {hasData && (
          <button className="flex items-center border cursor-pointer border-[#F0F0F0] px-3 rounded-md py-2 gap-1 text-sm font-medium text-[#0A0A0A] hover:opacity-70 transition-opacity">
            View all <ChevronRight size={16} />
          </button>
        )}
      </div>

      <div className="flex items-center justify-between bg-[#F9FAFB] text-[#344054] font-medium text-xs px-3 py-2 border-y border-[#E5E5E5]">
        <span>Date</span>
        <span>Amount</span>
      </div>

      <div className="relative px-3">
        <div
          className={
            !hasData ? 'opacity-30 pointer-events-none select-none' : ''
          }
        >
          {recentCheckIns.map((item) => (
            <div
              key={item.date}
              className="flex items-center justify-between text-sm font-semibold text-[#101928] py-2.5 border-b border-[#F5F5F5] last:border-0"
            >
              <span>{item.date}</span>
              <span>{item.amount}</span>
            </div>
          ))}
        </div>

        {!hasData && (
          <div className="absolute  -bottom-1 top-0 left-0 right-0 rounded-b-2xl flex items-center bg-[#F0F0F0]/80 justify-center">
            <p className="font-semibold text-[#0A0A0A] text-center">
              You haven't submitted any
              <br />
              check-ins yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
