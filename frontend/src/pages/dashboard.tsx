import Accountability from '@/components/dashboard/accountability';
import CheckInCard from '@/components/dashboard/check-in-card';
import { ConsistencyScore } from '@/components/dashboard/consistency-score';
import MembersTable from '@/components/dashboard/members-table';
import { RecentCheckIns } from '@/components/dashboard/recent-check-ins';
import { StatCard } from '@/components/dashboard/stat-card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';

const membershipDetails = [
  { label: 'Cohort', value: 'Cohort 3' },
  { label: 'Membership', value: 'Valid until March 2027', badge: 'Active' },
  { label: 'Investment Plan', value: 'Treasury bill' },
  { label: 'Frequency', value: 'Monthly' },
];

export default function DashboardHeader() {
  const [hasData, setHasData] = useState(false);

  return (
    <section className="pb-10">
      <article>
        <h1 className="font-semibold border-b w-fit pb-4 text-2xl border-[#D4D4D4] border-dashed text-[#001213]">
          Hey, John 👋
        </h1>

        <div className="mt-4">
          <div className="flex items-center gap-8">
            {membershipDetails.map((item) => (
              <div key={item.label} className="flex flex-col gap-1">
                <span className="text-quarternary font-semibold">
                  {item.label}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-[#0A0A0A]">
                    {item.value}
                  </span>
                  {item.badge && (
                    <Badge className="bg-[#ECFDF5] text-[#059669] hover:bg-[#DCFCE7] text-sm font-medium px-2 py-0 rounded-sm">
                      {item.badge}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </article>

      <div className="flex items-stretch gap-6 mt-8">
        <CheckInCard
          hasData={hasData}
          onCheckInSuccess={() => setHasData(true)}
        />
        <StatCard
          title="Total Self-Reported Investment"
          value={hasData ? 'GHS  8,500' : '0'}
          subtitle={
            hasData
              ? '45% of 1 million'
              : 'Your total will update after your first check-in.'
          }
          trend={
            hasData
              ? { value: '+3', direction: 'down', label: 'this week' }
              : undefined
          }
        />
      </div>

      <div className="flex items-stretch gap-6 mt-8">
        <RecentCheckIns hasData={hasData} />
        <ConsistencyScore hasData={hasData} />
      </div>

      <article className="border border-[#F0F0F0] rounded-2xl py-3 mt-8">
        <div className="flex items-center justify-between px-5 pb-3 border-b border-[#F0F0F0]">
          <h5 className="font-semibold text-[#404040]">Accountability group</h5>
          <Select>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="week">This week</SelectItem>
                <SelectItem value="month">This month</SelectItem>
                <SelectItem value="year">This year</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Accountability hasData={hasData} />
      </article>

      <MembersTable />
    </section>
  );
}
