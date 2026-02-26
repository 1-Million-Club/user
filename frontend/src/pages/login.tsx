import LoginForm from '@/components/login/form';
import { OAuthButtons } from '@/components/login/oauthbuttons';

export default function Login() {
  return (
    <section className="flex items-center gap-20 h-screen w-screen p-2">
      <div className="md:w-114.5 hidden md:block h-full overflow-hidden">
        <img
          src="/login-image.webp"
          alt="login image"
          className="w-full h-full"
        />
      </div>

      <div className="w-full md:w-1/2">
        <section className="md:w-87.5">
          <section className="flex flex-col items-center justify-center gap-4 px-8">
            <div className="space-y-2">
              <img
                src="/logo.webp"
                alt="One million club"
                className="mx-auto size-14"
              />
              <h1 className="text-center text-2xl font-bold">
                Sign in to One Million Club
              </h1>
            </div>

            <OAuthButtons />

            <div className="text-tertiary font-medium">or</div>

            <LoginForm />
          </section>

          <p className="text-tertiary mt-4 text-center text-sm font-medium">
            By continuing, you agree to our{' '}
            <span className="text-dark-black font-bold underline">
              Terms of Use
            </span>{' '}
            and{' '}
            <span className="text-dark-black font-bold underline">
              Privacy policy
            </span>
          </p>
        </section>
      </div>
    </section>
  );
}
