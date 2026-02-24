import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router';
import * as z from 'zod';
import { Button } from '../ui/button';
import { FieldGroup } from '../ui/field';
import { FormField } from '../ui/form-field';

const formSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
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
});

type LoginCred = z.infer<typeof formSchema>;

export default function LoginForm() {
  const form = useForm<LoginCred>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(data: LoginCred) {
    // Do something with the form values.
    console.log(data);
  }

  return (
    <section className="w-full space-y-3">
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <FieldGroup>
          <FormField
            name="email"
            control={form.control}
            label="Email address"
            type="email"
            placeholder="onemillion@email.com"
            autoComplete="email"
          />
          <FormField
            name="password"
            control={form.control}
            label="Password"
            type="password"
            placeholder="Enter password"
            autoComplete="off"
          />
          <Link to={'#'} className="font-semibold text-sm text-dark-black">
            Forgot password?
          </Link>

          <Button disabled={!form.formState.isValid}>Sign in</Button>
        </FieldGroup>
      </form>
      <article className="flex items-center justify-center gap-2">
        <p className="text-tertiary">Don’t have an account?</p>
        <Link to={'#'} className="font-bold text-[#A855F7]">
          Join a cohort
        </Link>
      </article>
    </section>
  );
}
