import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useState } from 'react';

// ── Types ────────────────────────────────────────────────────────────────────

type Step = 'investment-plan' | 'knowledge-standards';

interface StepMeta {
  id: Step;
  number: number;
  label: string;
  sublabel: string;
}

const STEPS: StepMeta[] = [
  {
    id: 'investment-plan',
    number: 1,
    label: 'Step 1',
    sublabel: 'Investment plan',
  },
  {
    id: 'knowledge-standards',
    number: 2,
    label: 'Step 2',
    sublabel: 'Knowledge and shared standards',
  },
];

// ── Radio / Checkbox primitives ───────────────────────────────────────────────

function RadioOption({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer group">
      <span
        className={cn(
          'size-4 rounded-full border flex items-center justify-center shrink-0 transition-colors',
          checked
            ? 'border-[#297AFF] bg-[#297AFF]'
            : 'border-[#D4D4D4] bg-white group-hover:border-[#297AFF]',
        )}
        onClick={onChange}
      >
        {checked && <span className="size-1.5 rounded-full bg-white" />}
      </span>
      <span className="text-sm text-[#0E021A] font-medium">{label}</span>
    </label>
  );
}

function CheckboxOption({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer group">
      <span
        className={cn(
          'size-4 rounded border flex items-center justify-center shrink-0 transition-colors',
          checked
            ? 'border-[#297AFF] bg-[#297AFF]'
            : 'border-[#D4D4D4] bg-white group-hover:border-[#297AFF]',
        )}
        onClick={onChange}
      >
        {checked && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path
              d="M1 4L3.5 6.5L9 1"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      <span className="text-sm text-[#0E021A] font-medium">{label}</span>
    </label>
  );
}

// ── Question block ────────────────────────────────────────────────────────────

function QuestionBlock({
  question,
  children,
}: {
  question: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm font-medium text-[#0E021A]">{question}</p>
      <div className="flex flex-col gap-2.5 pl-1">{children}</div>
    </div>
  );
}

// ── Step 1: Investment Plan ───────────────────────────────────────────────────

function InvestmentPlanStep() {
  const [monthlyRange, setMonthlyRange] = useState('');
  const [investmentPlan, setInvestmentPlan] = useState('');
  const [frequency, setFrequency] = useState('');
  const [wealthTarget, setWealthTarget] = useState<string[]>([]);
  const [otherTarget, setOtherTarget] = useState('');
  const [achieveYear, setAchieveYear] = useState('');

  const toggleWealth = (val: string) => {
    setWealthTarget((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val],
    );
  };

  const monthlyRanges = [
    'Below GHS500',
    'GHS500 - 999',
    'GHS1,000 - 2,499',
    'GHS2,500 - 4,999',
    'GHS5,000 - 9,999',
    'Above GHS10,000',
  ];

  const investmentOptions = ['Yes', 'No', 'Still exploring'];
  const frequencyOptions = [
    'Weekly',
    'Monthly',
    'Flexible (Multiple times a month)',
  ];
  const wealthOptions = ['GHS 1,000,000', 'USD 1,000,000', 'Other'];
  const yearOptions = ['2030', '2035', '2040', '2045', '2050+'];

  return (
    <div className="flex flex-col gap-6">
      <QuestionBlock question="Which range best reflects your intended average monthly contribution?">
        {monthlyRanges.map((r) => (
          <RadioOption
            key={r}
            label={r}
            checked={monthlyRange === r}
            onChange={() => setMonthlyRange(r)}
          />
        ))}
      </QuestionBlock>

      <QuestionBlock question="Do you have an investment plan or preferred investment option?">
        {investmentOptions.map((o) => (
          <RadioOption
            key={o}
            label={o}
            checked={investmentPlan === o}
            onChange={() => setInvestmentPlan(o)}
          />
        ))}
      </QuestionBlock>

      <QuestionBlock question="What is your intended contribution frequency?">
        {frequencyOptions.map((f) => (
          <RadioOption
            key={f}
            label={f}
            checked={frequency === f}
            onChange={() => setFrequency(f)}
          />
        ))}
      </QuestionBlock>

      <QuestionBlock question="Select wealth target">
        {wealthOptions.map((w) => (
          <CheckboxOption
            key={w}
            label={w}
            checked={wealthTarget.includes(w)}
            onChange={() => toggleWealth(w)}
          />
        ))}
        {wealthTarget.includes('Other') && (
          <input
            type="text"
            value={otherTarget}
            onChange={(e) => setOtherTarget(e.target.value)}
            placeholder="Enter here"
            className="mt-1 w-full rounded-md border border-[#E5E5E5] bg-white px-3 py-2 text-sm text-[#0E021A] placeholder:text-[#A3A3A3] focus:outline-none focus:ring-1 focus:ring-[#297AFF]"
          />
        )}
      </QuestionBlock>

      <QuestionBlock question="When do you realistically see yourself achieving this?">
        {yearOptions.map((y) => (
          <RadioOption
            key={y}
            label={y}
            checked={achieveYear === y}
            onChange={() => setAchieveYear(y)}
          />
        ))}
      </QuestionBlock>
    </div>
  );
}

// ── Step 2: Knowledge & Shared Standards ─────────────────────────────────────

function KnowledgeStep() {
  const [experience, setExperience] = useState('');
  const [instruments, setInstruments] = useState<string[]>([]);
  const [commitment, setCommitment] = useState('');

  const toggleInstrument = (val: string) => {
    setInstruments((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val],
    );
  };

  const experienceLevels = [
    "Beginner – I'm just starting out",
    'Intermediate – I have some experience',
    'Advanced – I actively manage investments',
  ];

  const instrumentOptions = [
    'Stocks / Equities',
    'Bonds / Fixed Income',
    'Real Estate',
    'Mutual Funds',
    'Crypto',
    'Forex',
    'Other',
  ];

  const commitmentOptions = [
    'Yes, fully committed',
    'Working towards it',
    'Not yet, but willing to learn',
  ];

  return (
    <div className="flex flex-col gap-6">
      <QuestionBlock question="How would you describe your current investment knowledge?">
        {experienceLevels.map((e) => (
          <RadioOption
            key={e}
            label={e}
            checked={experience === e}
            onChange={() => setExperience(e)}
          />
        ))}
      </QuestionBlock>

      <QuestionBlock question="Which investment instruments are you familiar with or interested in?">
        {instrumentOptions.map((i) => (
          <CheckboxOption
            key={i}
            label={i}
            checked={instruments.includes(i)}
            onChange={() => toggleInstrument(i)}
          />
        ))}
      </QuestionBlock>

      <QuestionBlock question="Are you committed to making at least one contribution per month?">
        {commitmentOptions.map((c) => (
          <RadioOption
            key={c}
            label={c}
            checked={commitment === c}
            onChange={() => setCommitment(c)}
          />
        ))}
      </QuestionBlock>
    </div>
  );
}

// ── Stepper sidebar ───────────────────────────────────────────────────────────

function Stepper({
  steps,
  currentStep,
}: {
  steps: StepMeta[];
  currentStep: Step;
}) {
  const currentIndex = steps.findIndex((s) => s.id === currentStep);

  return (
    <div className="flex flex-col gap-0">
      {steps.map((step, i) => {
        const isActive = step.id === currentStep;
        const isCompleted = i < currentIndex;
        const isLast = i === steps.length - 1;

        return (
          <div key={step.id} className="flex gap-3">
            {/* line + circle column */}
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  'size-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 z-10',
                  isActive || isCompleted
                    ? 'bg-[#0E021A] text-white'
                    : 'bg-[#E5E5E5] text-[#A3A3A3]',
                )}
              >
                {step.number}
              </div>
              {!isLast && (
                <div
                  className={cn(
                    'w-0.5 flex-1 my-1 min-h-8',
                    isCompleted ? 'bg-[#0E021A]' : 'bg-[#E5E5E5]',
                  )}
                />
              )}
            </div>

            {/* text */}
            <div className="pb-6">
              <p
                className={cn(
                  'text-xs font-medium',
                  isActive || isCompleted
                    ? 'text-quarternary'
                    : 'text-[#A3A3A3]',
                )}
              >
                {step.label}
              </p>
              <p
                className={cn(
                  'text-sm font-semibold max-w-35',
                  isActive || isCompleted ? 'text-[#0E021A]' : 'text-[#A3A3A3]',
                )}
              >
                {step.sublabel}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Main Quiz Page ────────────────────────────────────────────────────────────

export default function Quiz() {
  const [currentStep, setCurrentStep] = useState<Step>('investment-plan');

  const stepMeta = STEPS.find((s) => s.id === currentStep)!;

  const handleContinue = () => {
    if (currentStep === 'investment-plan') {
      setCurrentStep('knowledge-standards');
    } else {
      // final submission
      console.log('Quiz complete');
    }
  };

  return (
    <div className="min-h-screen  max-w-227.5 mx-auto space-y-8 bg-white px-8 pb-16">
      <h1 className="text-2xl font-bold text-[#0E021A]">
        Welcome, John. Let's get you set up.
      </h1>

      <div className="flex gap-6 items-start">
        {/* Stepper */}
        <aside className="shrink-0 p-6 rounded-3xl border border-[#F0F0F0]">
          <Stepper steps={STEPS} currentStep={currentStep} />
        </aside>

        {/* Form card */}
        <div className="flex-1 max-w-2xl border border-[#E5E5E5] rounded-xl p-8 flex flex-col gap-6">
          {/* Card header */}
          <div className="flex flex-col gap-1">
            <p className="text-base font-bold text-[#0E021A]">
              {stepMeta.sublabel === 'Investment plan'
                ? 'Set up your investment plan'
                : 'Knowledge and shared standards'}
            </p>
            <p className="text-sm text-tertiary">
              {currentStep === 'investment-plan'
                ? 'This helps us schedule your check-ins and match you with the right accountability subgroup.'
                : 'Help us understand your investment background and commitment level.'}
            </p>
          </div>

          <div className="border-t border-[#F0F0F0]" />

          {/* Step content */}
          {currentStep === 'investment-plan' ? (
            <InvestmentPlanStep />
          ) : (
            <KnowledgeStep />
          )}

          <Button className="w-full mt-2" onClick={handleContinue}>
            {currentStep === 'knowledge-standards' ? 'Finish' : 'Continue'}
          </Button>
        </div>
      </div>
    </div>
  );
}
