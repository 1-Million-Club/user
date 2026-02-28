import type { CheckIn } from '@/pages/check-ins';
import { MoreVertical, Share, SquareDashed } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

type CheckInStatus = 'Completed' | 'Missed' | 'Late' | 'Upcoming';

const statusStyles: Record<CheckInStatus, string> = {
  Completed: 'bg-[#ECFDF5] text-[#059669] border-[#A7F3D0] hover:bg-[#DCFCE7]',
  Missed: 'bg-[#FFF1F2] text-[#E11D48] border-[#FECDD3] hover:bg-[#FFE4E6]',
  Late: 'bg-[#FFFBEB] text-[#D97706] border-[#FDE68A] hover:bg-[#FEF3C7]',
  Upcoming: 'bg-[#EFF6FF] text-[#3B82F6] border-[#BFDBFE] hover:bg-[#DBEAFE]',
};

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-sm text-quarternary font-semibold">{label}</span>
      <span className="text-sm font-semibold text-[#0A0A0A]">{value}</span>
    </div>
  );
}

export default function CheckInActions({
  //   id,
  period,
  status,
  amount,
  lastCheckInDate,
  //   year,
}: CheckIn) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="h-8 w-8 border border-[#E4E7EC] p-0"
          >
            <MoreVertical size={16} className="text-[#171717]" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem
            className="gap-3 py-2.5"
            onClick={() => setOpen(true)}
          >
            <SquareDashed size={18} />
            <span>View details</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-0 gap-0 rounded-2xl max-h-[98%] overflow-y-auto">
          <DialogHeader className="px-6 pt-6 pb-4">
            <DialogTitle className="text-[#0E021A] text-base font-bold">
              Check-in details
            </DialogTitle>
            <DialogDescription className="sr-only">
              Details for {period} check-in
            </DialogDescription>
          </DialogHeader>

          <div className="px-6 py-4 flex flex-col gap-0">
            {/* Status + Submission date */}
            <div className="flex flex-col gap-2 pb-5">
              <div className="flex flex-col gap-1.5">
                <span className="text-sm text-quarternary font-semibold">
                  Status
                </span>
                <Badge
                  className={`w-fit text-sm font-medium px-2.5 py-0.5 rounded-md border ${statusStyles[status as CheckInStatus]}`}
                >
                  {status}
                </Badge>
              </div>

              <DetailRow
                label="Submission date"
                value={lastCheckInDate ?? '-'}
              />
            </div>

            <hr className="border-[#F0F0F0] border-dashed mb-3" />

            {/* Period + Frequency + Investment plan */}
            <div className="flex flex-col gap-4 pb-4">
              <DetailRow label="Period" value={period} />

              <div className="grid grid-cols-2 gap-4">
                <DetailRow label="Frequency" value="Monthly" />
                <DetailRow label="Investment plan" value="Treasury Bill" />
              </div>
            </div>

            <hr className="border-[#F0F0F0] border-dashed mb-3" />

            {/* Amount + Image + Note */}
            <div className="flex flex-col gap-3">
              <DetailRow label="Amount" value={amount ?? '-'} />
              <DetailRow label="Image" value="None" />
              <DetailRow label="Note" value="-" />
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 px-6 py-3 border-t border-dashed border-[#F0F0F0]">
            <Button
              variant="ghost"
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-[#0A0A0A] bg-[#F7F7F7] hover:bg-[#F7F7F7]"
            >
              Close
            </Button>
            <Button className="text-white text-sm font-semibold gap-2 px-5 rounded-lg">
              <Share size={15} />
              Export/Share
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
