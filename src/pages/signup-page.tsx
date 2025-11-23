import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { SignupForm } from '@/components/SignupForm';
import { useSignup } from '@/hooks/useSignup';

export function SignupPage() {
  const {
    form,
    isLoading,
    showPassword,
    togglePasswordVisibility,
    IconComponent,
    isUsernameAvailable,
    inputRef,
    onSubmit,
  } = useSignup();

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-bg px-5">
      <div className="w-100 flex bg-bg">
        <div className="flex-1 flex flex-col gap-8">
          <div className="flex-1 flex flex-col gap-6">
            <div>
              <Logo />
            </div>
            <div className="flex gap-2 flex-col">
              <h1 className=" heading-5">Sign Up</h1>
              <p className="text-fg-secondary text-sm">
                Already have an account?{' '}
                <Button asChild variant="link" color="primary">
                  <Link to="/auth/signin">Sign in</Link>
                </Button>
              </p>
            </div>
          </div>

          <SignupForm
            form={form}
            isLoading={isLoading}
            showPassword={showPassword}
            togglePasswordVisibility={togglePasswordVisibility}
            IconComponent={IconComponent}
            isUsernameAvailable={isUsernameAvailable}
            inputRef={inputRef}
            onSubmit={onSubmit}
          />
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
