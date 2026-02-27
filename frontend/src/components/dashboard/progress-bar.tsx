interface ProgressBarProps {
  value: number;
  max?: number;
  label: string;
  className?: string;
}

export function ProgressBar({
  value,
  max = 100,
  label,
  className,
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div className={className}>
      <div className="relative">
        <div
          className="h-5 w-full overflow-hidden rounded-sm"
          style={{
            backgroundImage:
              'repeating-linear-gradient(120deg, #E9D5FF 0px, #E9D5FF 5px, #F3E8FF 5px, #F3E8FF 9px)',
          }}
        >
          <div
            className="h-full rounded-sm bg-[#A855F7] transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>

        {!!value && (
          <div
            className="absolute -bottom-2 -translate-x-1/2 rotate-180 transition-all duration-300"
            style={{ left: `${percentage}%` }}
          >
            <div className="h-0 w-0 border-t-8 border-r-[6px] border-l-[6px] border-t-[#A855F7] border-r-transparent border-l-transparent" />
          </div>
        )}
      </div>

      {!!value && (
        <p className="text-tertiary mt-3 text-center text-sm font-medium">
          {label}
        </p>
      )}
    </div>
  );
}
