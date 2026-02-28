import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { OAuthButtons } from '../login/oauthbuttons';
import { Button } from '../ui/button';
import { FieldGroup } from '../ui/field';
import { FormField } from '../ui/form-field';

const formSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  name: z.string().min(5, 'Name must be at least 5 characters'),
});

type OnboardingCred = z.infer<typeof formSchema>;

function MembershipCard() {
  return (
    <div
      className="rounded-xl p-5 flex flex-col gap-3"
      style={{ backgroundColor: '#F8ECD780' }}
    >
      <p className="text-sm font-medium text-tertiary">Membership Fee</p>

      <div className="flex items-baseline gap-2">
        <span className="text-4xl font-bold text-[#0E021A]">GHS500</span>
        <span className="text-tertiary font-medium text-sm">/ per year</span>
      </div>

      <ul className="flex flex-col gap-1.5 text-sm text-tertiary font-medium list-disc list-inside">
        <li>You'll receive an activation link by email after payment.</li>
        <li>This fee covers platform access and accountability support.</li>
      </ul>
    </div>
  );
}

export default function JoinCohortForm({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const form = useForm<OnboardingCred>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      name: '',
    },
  });

  function onSubmit(data: OnboardingCred) {
    console.log(data);
    onSuccess();
  }

  return (
    <div className="px-10 flex pt-5 pb-5 flex-col gap-4">
      <div className="space-y-1.25">
        <h5 className="text-[#0E021A] text-xl font-bold">
          Secure your spot in cohort
        </h5>
        <p className="text-tertiary text-sm font-medium">
          Annual membership gives you access to the accountability platform and
          structured check-ins.
        </p>
      </div>
      <OAuthButtons />

      <p className="text-center text-tertiary font-medium">or</p>

      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <FieldGroup>
          <FormField
            name="name"
            control={form.control}
            label="Full name"
            type="text"
            placeholder="e.g. Kwame Cohort"
          />
          <FormField
            name="email"
            control={form.control}
            label="Email address"
            type="email"
            placeholder="onemillion@email.com"
            autoComplete="email"
          />

          <div className="border border-dashed border-[#F0F0F0] mt-3"></div>

          <MembershipCard />

          <div className="mt-2 flex gap-2 justify-center">
            <div className="bg-[#F7F7F7] text-sm hover:bg-[#F7F7F7] py-2 px-4 flex items-center text-dark-black rounded-md">
              Cancel
            </div>
            <Button
              type="submit"
              disabled={!form.formState.isValid || form.formState.isSubmitting}
            >
              Continue to secure payment
            </Button>
          </div>
          <p className="text-center text-quarternary">
            Secure payment via Mobile Money or Card. <br />
            Powered by Paystack.
          </p>
        </FieldGroup>
      </form>
    </div>
  );
}
