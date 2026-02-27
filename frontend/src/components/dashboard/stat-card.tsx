import { ArrowDown, ArrowUp, Ellipsis } from 'lucide-react';
import { ProgressBar } from './progress-bar';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  onMenuClick?: () => void;
  trend?: {
    value: string | number;
    direction: 'up' | 'down';
    label: string;
  };
}

export function StatCard({
  title,
  value,
  subtitle,
  trend,
  onMenuClick,
}: StatCardProps) {
  return (
    <article className="w-[267.5px]  flex-1 space-y-2 rounded-2xl border border-[#E5E5E5] p-4">
      <div className="flex items-center justify-between">
        <h5 className="text-sm font-semibold text-[#404040]">{title}</h5>

        <button
          type="button"
          onClick={onMenuClick}
          className="transition-opacity hover:opacity-70"
          aria-label="More options"
        >
          <Ellipsis color="#171717" size={16} />
        </button>
      </div>

      <h3 className="text-dark-black text-[28px] font-bold">{value}</h3>

      <div className="flex items-center gap-1.5">
        {subtitle && (
          <p className="text-quarternary text-sm font-medium">{subtitle}</p>
        )}

        {trend && <div className="size-1.25 rounded-full bg-[#A3A3A3]"></div>}

        {trend && (
          <div
            className={`flex items-center gap-0.5 text-sm font-semibold ${
              trend.direction === 'up' ? 'text-[#16A34A]' : 'text-[#DC2626]'
            }`}
          >
            {trend.direction === 'up' ? (
              <ArrowUp size={16} />
            ) : (
              <ArrowDown size={16} />
            )}
            <span>
              {trend.value} {trend.label}
            </span>
          </div>
        )}
      </div>
      <ProgressBar value={0} label="check in rate: 45%" />
    </article>
  );
}
