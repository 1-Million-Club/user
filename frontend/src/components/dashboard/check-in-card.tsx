import { FlameIcon } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import CheckInModal from './check-in-modal';

interface CheckInCardProps {
  hasData: boolean;
}

export default function CheckInCard({ hasData }: CheckInCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`relative  flex-1 rounded-2xl overflow-hidden px-6 py-5 flex flex-col ${hasData ? 'items-start justify-start text-left' : 'items-center justify-center text-center'}`}
      style={{
        backgroundImage:
          'repeating-linear-gradient(120deg, #3B82F6 0px, #3B82F6 40px, #297AFF 40px, #297AFF 120px)',
      }}
    >
      <CheckInModal isOpen={isOpen} setIsOpen={setIsOpen} />
      {!hasData ? (
        <>
          <p className="relative text-white font-bold text-2xl mb-1">
            Submit your first check-in
          </p>
          <p className="relative text-white font-medium text-sm mb-4">
            Report your investment for March 2026.
          </p>
          <Button
            onClick={() => setIsOpen(true)}
            className="relative bg-white text-[#1E40AF] hover:bg-white/90 font-medium text-sm rounded-md px-3 py-2.5"
          >
            Submit first check-In
          </Button>
        </>
      ) : (
        <div className="space-y-3.75">
          <div className="flex items-center gap-2">
            <FlameIcon color="white" fill="white" />
            <p className="font-bold text-white text-lg">Next check-in</p>
          </div>

          <div className="text-white">
            <h5 className="font-extrabold text-2xl">June 2026</h5>
            <p className="text-sm font-medium">Due June 30</p>
          </div>

          <Button
            onClick={() => setIsOpen(true)}
            className="relative bg-white text-[#1E40AF] hover:bg-white/90 font-medium text-sm rounded-md px-3 py-2.5"
          >
            Submit check-In
          </Button>
        </div>
      )}
    </div>
  );
}
