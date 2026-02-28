import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import type { ColumnDef } from '@tanstack/react-table';
import { MoreVertical } from 'lucide-react';

type MemberStatus = 'Active' | 'Inactive';

type Member = {
  id: string;
  name: string;
  investmentType: string;
  lastCheckInDate: string;
  status: MemberStatus;
};

const members: Member[] = [
  {
    id: '1',
    name: 'Leslie Alexander',
    investmentType: 'Treasury bill',
    lastCheckInDate: '17 Oct, 2020',
    status: 'Active',
  },
  {
    id: '2',
    name: 'Courtney Henry',
    investmentType: 'Savings',
    lastCheckInDate: '8 Sep, 2020',
    status: 'Inactive',
  },
  {
    id: '3',
    name: 'Darlene Robertson',
    investmentType: 'Stocks',
    lastCheckInDate: '24 May, 2020',
    status: 'Active',
  },
  {
    id: '4',
    name: 'Esther Howard',
    investmentType: 'Treasury bill',
    lastCheckInDate: '1 Feb, 2020',
    status: 'Active',
  },
];

const columns: ColumnDef<Member>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => (
      <span className="font-medium text-[#0A0A0A]">{row.getValue('name')}</span>
    ),
  },
  {
    accessorKey: 'investmentType',
    header: 'Investment type',
    filterFn: (row, id, value) => value === '' || row.getValue(id) === value,
  },
  {
    accessorKey: 'lastCheckInDate',
    header: 'Last check-in date',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status: MemberStatus = row.getValue('status');
      const isActive = status === 'Active';
      return (
        <Badge
          className={`text-sm font-medium px-2.5 py-0.5 rounded-md border ${
            isActive
              ? 'bg-[#ECFDF5] text-[#059669] border-[#A7F3D0] hover:bg-[#DCFCE7]'
              : 'bg-[#FFF1F2] text-[#E11D48] border-[#FECDD3] hover:bg-[#FFE4E6]'
          }`}
        >
          {status}
        </Badge>
      );
    },
    filterFn: (row, id, value) => value === '' || row.getValue(id) === value,
  },
  {
    id: 'actions',
    header: '',
    cell: () => (
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-[#000000] border border-[#E4E7EC] hover:text-[#0A0A0A] hover:bg-gray-100"
      >
        <MoreVertical size={16} />
      </Button>
    ),
  },
];

export default function MembersTable() {
  return (
    <div className="mt-8">
      <DataTable
        columns={columns}
        data={members}
        searchKey="name"
        searchPlaceholder="Search members..."
        showPagination
      />
    </div>
  );
}
