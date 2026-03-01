import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

export default function ProfileTab() {
  return (
    <div className="flex flex-col items-center gap-6">
      {/* Avatar card */}
      <div className="bg-[#FFF7ED] w-117.25 rounded-2xl p-4 flex flex-col items-center gap-2">
        <Avatar className="size-12">
          <AvatarFallback>JD</AvatarFallback>
          <AvatarImage src="https://i.pravatar.cc/72" />
        </Avatar>

        <p className="font-bold text-[#0A0A0A] text-base">John Cena</p>
        <div className="flex items-center gap-2 text-sm font-semibold">
          <span className="text-quarternary text-xs">Member since</span>
          <span className="text-[#0A0A0A] text-sm">December 2025</span>
          <span className="text-[#059669] rounded-[6px] text-sm font-semibold py-0.5 px-1.5 bg-[#ECFDF5]">
            Active
          </span>
        </div>
      </div>

      <div className="border-dashed border w-full border-[#D4D4D4]"></div>

      <div className="flex flex-col gap-4 w-117.25">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[#0E021A]">
            Full name
          </label>
          <input
            type="text"
            defaultValue="John Cena"
            className="border border-[#E5E5E5] rounded-lg px-3 py-2.5 text-sm text-[#0E021A] focus:outline-none focus:ring-2 focus:ring-[#297AFF]/30"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[#0E021A]">
            Email address
          </label>
          <input
            type="email"
            defaultValue="Kwamecohort@mail.com"
            disabled
            className="border border-[#F0F0F0] rounded-lg px-3 py-2.5 text-sm text-[#A3A3A3] bg-[#F7F7F7] cursor-not-allowed"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[#0E021A]">
            Phone number
          </label>
          <div className="flex items-center border border-[#E5E5E5] rounded-lg overflow-hidden">
            <button className="flex items-center gap-1.5 px-3 py-2.5 border-r border-[#E5E5E5] bg-white text-sm font-medium text-[#0E021A] shrink-0 hover:bg-[#F5F5F5] transition-colors">
              🇬🇭 <span>233</span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                className="text-quarternary"
              >
                <path
                  d="M3 4.5L6 7.5L9 4.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <input
              type="tel"
              placeholder="055 0000 000"
              className="flex-1 px-3 py-2.5 text-sm text-[#0E021A] placeholder:text-[#A3A3A3] focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
