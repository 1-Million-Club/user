interface ConsistencyScoreProps {
  hasData: boolean;
}

const RADIUS = 54;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function CircularProgress({
  percentage,
  empty,
}: {
  percentage: number;
  empty?: boolean;
}) {
  const offset = CIRCUMFERENCE - (percentage / 100) * CIRCUMFERENCE;

  return (
    <div
      className="relative flex items-center justify-center shrink-0"
      style={{ width: 130, height: 130 }}
    >
      <svg width="130" height="130" className="-rotate-90">
        <circle
          cx="65"
          cy="65"
          r={RADIUS}
          fill="none"
          stroke="#F7F7F7"
          strokeWidth="10"
        />
        {!empty && (
          <circle
            cx="65"
            cy="65"
            r={RADIUS}
            fill="none"
            stroke="#16A34A"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
            className="transition-all duration-500"
          />
        )}
      </svg>
      <div className="absolute flex flex-col items-center justify-center text-center">
        {empty ? (
          <p className="text-[10px] text-[#A3A3A3] px-5 ">
            Your score will appear after your first check-in.
          </p>
        ) : (
          <>
            <span className="text-xl font-extrabold text-[#0A0A0A]">75%</span>
            <span className="text-xs text-quarternary leading-tight mt-0.5">
              3 of 4 months
              <br />
              completed
            </span>
          </>
        )}
      </div>
    </div>
  );
}

export function ConsistencyScore({ hasData }: ConsistencyScoreProps) {
  return (
    <div className="flex-1 rounded-2xl border border-[#e5e5e5] bg-white  py-4">
      <h3 className="text-base font-semibold border-b border-[#F0F0F0] pb-2 px-5 text-[#404040] mb-4">
        Consistency score
      </h3>

      <div className="flex items-center gap-5 px-5">
        <CircularProgress percentage={75} empty={!hasData} />

        {hasData ? (
          <div className="flex flex-col gap-1">
            <span className="text-xl font-bold text-[#0A0A0A]">Strong</span>
            <p className=" text-quarternary font-medium leading-relaxed">
              Great work. You're building strong consistency. 1 more consecutive
              check-in to reach Excellent.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2 flex-1">
            {[80, 60, 90, 50].map((w, i) => (
              <div
                key={i}
                className="h-3 rounded-full bg-[#F5F5F5]"
                style={{ width: `${w}%` }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
