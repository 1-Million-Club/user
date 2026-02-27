import JoinCohort from '@/components/onboarding/join-cohort';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Link } from 'react-router';

export default function Home() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <style>{`
        @keyframes float1 {
          0%, 100% { transform: translateY(-50%) translateY(0px); }
          50% { transform: translateY(-50%) translateY(-12px); }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float3 {
          0%, 100% { transform: translateY(-50%) translateY(0px) rotate(-3deg); }
          50% { transform: translateY(-50%) translateY(-14px) rotate(3deg); }
        }
        @keyframes float4 {
          0%, 100% { transform: translateY(0px) rotate(2deg); }
          50% { transform: translateY(-10px) rotate(-2deg); }
        }
        .float-icon-1 { animation: float2 3.2s ease-in-out infinite; }
        .float-icon-2 { animation: float4 2.8s ease-in-out infinite 0.4s; }
        .float-icon-3 { animation: float2 3.6s ease-in-out infinite 0.8s; }
        .float-icon-4 { animation: float4 3s ease-in-out infinite 1.2s; }
      `}</style>

      <JoinCohort showModal={showModal} setShowModal={setShowModal} />

      <section className="px-4 md:px-6 pt-4 h-screen flex flex-col w-screen overflow-hidden">
        <header className="max-w-7xl flex items-center justify-between">
          <img src="/logo.webp" alt="logo" className="size-10" />
          <Button
            onClick={() => setShowModal(true)}
            className="bg-[#F7F7F7] hover:bg-[#F7F7F7] py-2 px-4 flex items-center text-dark-black rounded-md"
          >
            Sign up
          </Button>
        </header>

        <div className="relative flex items-center justify-center my-auto">
          {/* Concentric ellipses — smallest to largest */}
          <img
            src="/Ellipse6.png"
            alt=""
            className="absolute w-60 md:w-105 pointer-events-none"
          />
          <img
            src="/Ellipse7.png"
            alt=""
            className="absolute w-80 md:w-135 pointer-events-none"
          />
          <img
            src="/Ellipse6.png"
            alt=""
            className="absolute w-100 md:w-165 pointer-events-none"
          />
          <img
            src="/Ellipse7.png"
            alt=""
            className="absolute w-120 md:w-185 pointer-events-none"
          />

          {/* Left middle — stock arrows (home2) */}
          <img
            src="/home2.webp"
            alt="stock arrows"
            className="float-icon-1 absolute w-28 left-52 -top-5 md:top-8 -translate-y-1/2 pointer-events-none drop-shadow-md"
          />

          {/* Top right — accounting clipboard (home4) */}
          <img
            src="/home4.webp"
            alt="accounting"
            className="float-icon-2 absolute w-28 right-70 md:right-60 -top-10 md:-top-32 pointer-events-none drop-shadow-md"
          />

          {/* Right middle — money growth (home3) */}
          <img
            src="/home3.webp"
            alt="money growth"
            className="float-icon-3 absolute w-28 right-68 top-68 -translate-y-1/2 pointer-events-none drop-shadow-md"
          />

          {/* Bottom left — budget wallet (home1) */}
          <img
            src="/home1.webp"
            alt="budget"
            className="float-icon-4 absolute w-28 left-72 md:left-68 bottom-2 md:-bottom-32 pointer-events-none drop-shadow-md"
          />

          {/* Content sits above everything */}
          <article className="relative z-20 w-full md:max-w-145.5 space-y-5 text-center px-8">
            <h1 className="font-bold text-2xl md:text-4xl text-dark-black">
              Build toward GHS 1 million, with structure and accountability
            </h1>

            <p className="text-tertiary text-sm md:text-lg font-medium">
              1 Million Club is a financial accountability community designed to
              help you stay consistent with your investment goals through
              structure, reminders, and peer support.
            </p>

            <div className="flex gap-4 justify-center">
              <Button onClick={() => setShowModal(true)}>Sign up</Button>
              <Link
                to={'/login'}
                className="bg-[#F7F7F7] px-4 flex items-center text-dark-black rounded-md"
              >
                Sign in
              </Link>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
