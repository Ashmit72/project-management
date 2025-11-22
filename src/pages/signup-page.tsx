import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input, InputWrapper } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Spinner } from '@/components/ui/spinner';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import Logo from '@/components/Logo';
import { Link } from 'react-router-dom';

const FormSchema = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
    password: z.string(),
  })
  .superRefine((data, ctx) => {
    // Validate first name first
    if (!data.firstName || data.firstName.trim().length === 0) {
      ctx.addIssue({
        code: 'custom',
        message: 'First name is required',
        path: ['firstName'],
      });
      return;
    }

    // Validate last name
    if (!data.lastName || data.lastName.trim().length === 0) {
      ctx.addIssue({
        code: 'custom',
        message: 'Last name is required',
        path: ['lastName'],
      });
      return;
    }

    // Validate email
    if (!data.email || data.email.trim().length === 0) {
      ctx.addIssue({
        code: 'custom',
        message: 'Email is required',
        path: ['email'],
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      ctx.addIssue({
        code: 'custom',
        message: 'Please enter a valid email address',
        path: ['email'],
      });
      return;
    }

    // Validate password (only if all above are valid)
    if (!data.password || data.password.trim().length === 0) {
      ctx.addIssue({
        code: 'custom',
        message: 'Password is required',
        path: ['password'],
      });
      return;
    }

    if (data.password.length < 8) {
      ctx.addIssue({
        code: 'custom',
        message: 'Password must be at least 8 characters long',
        path: ['password'],
      });
      return;
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(data.password)) {
      ctx.addIssue({
        code: 'custom',
        message:
          'Password must contain at least one uppercase letter, one lowercase letter, and one number',
        path: ['password'],
      });
    }
  });

export function SignupPage() {
  const [isLoading, setIsLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function togglePasswordVisibility(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setShowPassword(!showPassword);
  }

  const IconComponent = showPassword ? EyeOffIcon : EyeIcon;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log(data);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      form.reset();
    }, 2000);
  };

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
                  <Link to="/signin">Sign in</Link>
                </Button>
              </p>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex gap-5 flex-col">
                <div className="flex gap-4 flex-col">
                  <div className="flex gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input size="36" type="text" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input size="36" type="text" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input size="36" type="email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <InputWrapper>
                            <Input
                              {...field}
                              id="toggle-visible-password"
                              ref={inputRef}
                              className="peer"
                              type={showPassword ? 'text' : 'password'}
                            />
                            <IconComponent
                              className="hover:text-fg peer-disabled:text-fg-disabled cursor-pointer peer-disabled:pointer-events-none"
                              onMouseDown={togglePasswordVisibility}
                            />
                          </InputWrapper>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex gap-4 flex-col">
                  <Button className="w-full" type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <Spinner variant="default" />
                    ) : (
                      'Create account'
                    )}
                  </Button>
                  <p className="text-fg-secondary text-[13px]">
                    By signing up, you agree to Radian&apos;s{' '}
                    <Button
                      variant="link"
                      className=" text-[13px]"
                      color="primary"
                    >
                      Terms of Service
                    </Button>{' '}
                    and{' '}
                    <Button
                      variant="link"
                      className=" text-[13px]"
                      color="primary"
                    >
                      Privacy Policy
                    </Button>
                  </p>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
