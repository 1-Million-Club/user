import { Button } from '@/components/ui/button';
import { FieldGroup } from '@/components/ui/field';
import { FormField } from '@/components/ui/form-field';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import z from 'zod';

const formSchema = z
  .object({
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(100, 'Password must be at most 100 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number')
      .regex(
        /[^A-Za-z0-9]/,
        'Password must contain at least one special character',
      ),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type AccountSetupCred = z.infer<typeof formSchema>;

interface AccountSetupFormProps {
  email: string;
}

function AccountSetupForm({ email }: AccountSetupFormProps) {
  const navigate = useNavigate();

  const form = useForm<AccountSetupCred>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  function onSubmit(data: AccountSetupCred) {
    console.log(data);
    navigate('/dashboard/quiz');
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
      <FieldGroup>
        <div>
          <Input
            value={email}
            className="bg-[#F7F7F7] border text-sm border-[#F0F0F0] text-[#A3A3A3] pointer-events-none"
          />

          <p className="text-quarternary mt-1 text-xs">
            This account was created after your successful payment.
          </p>
        </div>

        <FormField
          name="password"
          control={form.control}
          label="Password"
          type="password"
          placeholder="Enter password"
          hint="Minimum 8 characters"
        />
        <FormField
          name="confirmPassword"
          control={form.control}
          label="Confirm password"
          type="password"
          placeholder="Confirm password"
        />
        <Button
          type="submit"
          className="w-full"
          disabled={!form.formState.isValid || form.formState.isSubmitting}
        >
          Activate Account
        </Button>
      </FieldGroup>
    </form>
  );
}

export default function AccountSetup() {
  return (
    <section className="flex min-h-screen w-full flex-col items-center justify-between py-10">
      <div />

      <article className="w-full max-w-87.5 flex flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-3">
          <img src="/logo.webp" alt="logo" className="size-12" />
          <div className="text-center space-y-1">
            <h1 className="text-xl font-bold text-[#0E021A]">
              Set Up Your Account
            </h1>
            <p className="text-sm font-medium text-tertiary">
              Create a password to activate your membership.
            </p>
          </div>
        </div>

        <AccountSetupForm email="KwameCohort@mail.com" />
      </article>

      <p className="text-center text-sm text-quarternary">
        By continuing, you agree to our{' '}
        <a href="/terms" className="underline text-[#0E021A]">
          Terms of Use
        </a>{' '}
        and{' '}
        <a href="/privacy" className="underline text-[#0E021A]">
          Privacy policy
        </a>
      </p>
    </section>
  );
}
