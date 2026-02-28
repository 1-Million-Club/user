import { cn } from '@/lib/utils';

export default function Accountability({ hasData }: { hasData: boolean }) {
  return (
    <article className="grid grid-cols-2 divide-x divide-[#F0F0F0] px-5 py-3">
      <div className="space-y-2">
        <div>
          <h5 className="text-quarternary text-sm font-medium">Subgroup</h5>
          <p className="font-bold text-[#0A0A0A]">Group A</p>
        </div>
        <div>
          <h5 className="text-quarternary text-sm font-medium">Steward</h5>
          <p className="font-bold text-[#0A0A0A]">Anne Marie</p>
        </div>
      </div>

      <div className="gap-1 flex flex-col items-center justify-center ml-4">
        {hasData ? (
          <>
            <h5 className="text-[#A3A3A3] font-bold">
              {' '}
              <span className="text-[#0A0A0A] text-3xl">4</span> /6
            </h5>

            <div className="flex items-center  gap-0.5 w-full">
              {Array.from({ length: 6 }).map((_, i) => {
                const isFirst = i === 0;
                const isLast = i === 6 - 1;
                const isFilled = i < 4;

                return (
                  <div
                    key={i}
                    className={cn(
                      'h-4 flex-1 transition-all',
                      isFilled ? 'bg-[#06B6D4]' : 'bg-[#CFFAFE]',
                    )}
                    style={{
                      borderRadius: isFirst
                        ? '999px 0px 0px 999px'
                        : isLast
                          ? '4px 999px 999px 4px'
                          : '0px',
                    }}
                  />
                );
              })}
            </div>

            <p className="text-quarternary text-sm font-medium">
              members have completed June check-in.
            </p>
          </>
        ) : (
          <div>
            <div className="flex justify-center">
              <img
                src="/avatar1.png"
                alt="accountability avatar 1"
                className="size-4.5 rounded-full relative top-0"
              />
              <img
                src="/avatar2.png"
                alt="accountability avatar 2"
                className="size-4.5 rounded-full relative top-1.5 right-1.5 z-3"
              />
              <img
                src="/avatar3.png"
                alt="accountability avatar 3"
                className="size-4.5 rounded-full relative top-4 right-9 z-4"
              />
              <img
                src="/avatar4.png"
                alt="accountability avatar 4"
                className="size-4.5 rounded-full relative top-1.5 right-16 z-3"
              />
            </div>
            <p className="text-quarternary mt-4 font-medium text-center">
              Your subgroup is waiting for this month’s check-in.
            </p>
          </div>
        )}
      </div>
    </article>
  );
}
