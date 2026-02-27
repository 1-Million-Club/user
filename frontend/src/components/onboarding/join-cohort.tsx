import { Check } from 'lucide-react';
import type { SetStateAction } from 'react';
import { Link } from 'react-router';
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog';

export default function JoinCohort({
  showModal,
  setShowModal,
}: {
  showModal: boolean;
  setShowModal: React.Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogContent className="md:max-w-249 p-0 h-[90%] overflow-hidden flex flex-col">
        <DialogTitle className="sr-only">Join Cohort Modal</DialogTitle>
        <article className="flex flex-1 min-h-0">
          <div className="bg-[#F7F7F7] shrink-0 py-10 rounded-lg gap-4 flex flex-col items-center justify-center px-5 md:w-112.5">
            <img src="/logo.webp" alt="logo" className="size-12" />
            <div className="max-w-68.5">
              <h1 className="text-lg md:text-[26px] font-bold text-[#0E021A] text-center">
                One Million Club
              </h1>
              <p className="text-center font-medium text-sm text-tertiary">
                A structured accountability system designed to help you stay
                consistent with your investment goals.
              </p>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto min-h-0">
            {/* <JoinCohortForm /> */}

            {/* success */}
            <div className="flex flex-col justify-center h-full items-center gap-8">
              <div className="size-20 flex items-center justify-center rounded-full bg-[#10B981]">
                <Check color="white" className="size-10" size={24} />
              </div>
              <div className="max-w-95 text-center space-y-2">
                <h3 className="text-[#0E021A] font-bold text-xl">
                  You’re In 🎉
                </h3>
                <p className="text-[#404040] font-medium">
                  We’ve sent an activation link to:{' '}
                  <span className="text-dark-black">kwamecohort@mail.com</span>{' '}
                  <br /> The email usually arrives within 1–2 minutes.
                </p>
              </div>

              <p className="text-center text-[#404040] font-medium">
                Didn’t receive any email?{' '}
                <Link to={'#'} className="text-[#A855F7] font-semibold">
                  Contact us
                </Link>
              </p>
            </div>
          </div>
        </article>
      </DialogContent>
    </Dialog>
  );
}
