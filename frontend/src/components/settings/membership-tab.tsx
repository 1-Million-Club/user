import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useState } from 'react';

type PaymentStatus = 'Success' | 'Failed' | 'Pending';

type Payment = {
  id: string;
  period: string;
  amount: string;
  status: PaymentStatus;
  year: string;
};

const payments: Payment[] = [
  {
    id: '1',
    period: 'January 2026',
    amount: 'GHS 1,500',
    status: 'Success',
    year: '2026',
  },
  {
    id: '2',
    period: 'February 2026',
    amount: 'GHS 1,500',
    status: 'Failed',
    year: '2026',
  },
  {
    id: '3',
    period: 'March 2026',
    amount: 'GHS 1,500',
    status: 'Success',
    year: '2026',
  },
  {
    id: '4',
    period: 'April 2026',
    amount: 'GHS 1,500',
    status: 'Success',
    year: '2026',
  },
  {
    id: '5',
    period: 'January 2025',
    amount: 'GHS 1,500',
    status: 'Success',
    year: '2025',
  },
  {
    id: '6',
    period: 'February 2025',
    amount: 'GHS 1,500',
    status: 'Success',
    year: '2025',
  },
];

const statusStyles: Record<PaymentStatus, string> = {
  Success: 'bg-[#ECFDF5] text-[#059669] border-[#A7F3D0] hover:bg-[#DCFCE7]',
  Failed: 'bg-[#FFF1F2] text-[#E11D48] border-[#FECDD3] hover:bg-[#FFE4E6]',
  Pending: 'bg-[#FFFBEB] text-[#D97706] border-[#FDE68A] hover:bg-[#FEF3C7]',
};

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-sm text-quarternary">{label}</span>
      <span className="text-sm font-semibold text-[#0A0A0A]">{value}</span>
    </div>
  );
}

export function MembershipTab() {
  const [yearFilter, setYearFilter] = useState('2026');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = payments.filter((p) => {
    const matchYear = p.year === yearFilter;
    const matchStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchYear && matchStatus;
  });

  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-bold text-[#0A0A0A] text-xl">Membership</h2>

      {/* Cohort / Status / Valid until */}
      <div className="flex flex-col gap-4">
        <div className="flex items-start gap-16">
          <DetailRow label="Cohort" value="Cohort 3" />
          <DetailRow
            label="Status"
            value={
              <Badge className="bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0] hover:bg-[#DCFCE7] font-semibold text-sm px-2 py-0 rounded-md">
                Active
              </Badge>
            }
          />
          <DetailRow label="Valid until" value="March 2026" />
        </div>

        <hr className="border-[#F0F0F0]" />

        <div className="flex items-start gap-16">
          <DetailRow label="Membership fee" value="GHS 500/year" />
          <DetailRow label="Next billing date" value="March 2027" />
        </div>

        <hr className="border-[#F0F0F0]" />
      </div>

      {/* Payment history */}
      <div className="flex flex-col gap-4">
        <h3 className="font-bold text-[#0A0A0A] text-lg">Payment history</h3>

        {/* Filters */}
        <div className="flex items-center gap-2">
          <Select value={yearFilter} onValueChange={setYearFilter}>
            <SelectTrigger className="w-24 h-8 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="2026">2026</SelectItem>
                <SelectItem value="2025">2025</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-28 h-8 text-sm">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="Success">Success</SelectItem>
                <SelectItem value="Failed">Failed</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="rounded-lg border border-[#E5E5E5] overflow-hidden">
          <Table>
            <TableHeader className="bg-[#F5F5F5]">
              <TableRow className="border-b border-[#E5E5E5] hover:bg-[#F5F5F5]">
                <TableHead className="text-sm font-medium text-quarternary py-3">
                  Period
                </TableHead>
                <TableHead className="text-sm font-medium text-quarternary py-3">
                  Amount
                </TableHead>
                <TableHead className="text-sm font-medium text-quarternary py-3">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length > 0 ? (
                filtered.map((payment) => (
                  <TableRow
                    key={payment.id}
                    className="border-b border-[#E5E5E5]"
                  >
                    <TableCell className="text-sm font-medium text-[#0A0A0A] py-4">
                      {payment.period}
                    </TableCell>
                    <TableCell className="text-sm font-medium text-[#0A0A0A] py-4">
                      {payment.amount}
                    </TableCell>
                    <TableCell className="py-4">
                      <Badge
                        className={`text-sm font-medium px-2.5 py-0.5 rounded-md border ${statusStyles[payment.status]}`}
                      >
                        {payment.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="text-center text-sm text-[#A3A3A3] h-24"
                  >
                    No payment records found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
