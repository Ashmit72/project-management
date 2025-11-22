import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

export function OnboardingPage() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const FormSchema = z
    .object({
      firstName: z
        .string()
        .min(3, { message: 'First name must be at least 3 characters long' }),
      lastName: z
        .string()
        .min(3, { message: 'Last name must be at least 3 characters long' }),
      teamSize: z.string().min(1, { message: 'Team size is required' }),
      department: z.string().optional(),
      projectMode: z.string().min(1, { message: 'Project mode is required' }),
      projectName: z.string().optional(),
      projectCode: z.string().optional(),
    })
    .superRefine((data, ctx) => {
      if (data.projectMode === 'create' && !data.projectName) {
        ctx.addIssue({
          path: ['projectName'],
          message: 'Project Name is required when creating a project',
          code: 'custom',
        });
      }

      if (data.projectMode === 'join' && !data.projectCode) {
        ctx.addIssue({
          path: ['projectCode'],
          message: 'Project Code is required to join a project',
          code: 'custom',
        });
      }
    });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: 'onSubmit',
    defaultValues: {
      firstName: '',
      lastName: '',
      teamSize: '',
      department: '',
      projectMode: '',
      projectName: '',
      projectCode: '',
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    if (step === 2) {
      console.log('🎉 Final Submission:', data);
      return navigate('/');
    }
  };

  // Step-wise validation handler
  const handleNextStep = async () => {
    if (step === 1) {
      const valid = await form.trigger([
        'firstName',
        'lastName',
        'teamSize',
        'department',
      ]);
      if (valid) setStep(2);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="px-6 flex flex-col gap-6 w-[420px]">
            {/* STEP 1 */}
            {step === 1 && (
              <>
                <h1 className="heading-5 font-semibold">
                  Welcome to Application
                </h1>
                <p className="text-fg-secondary text-sm">
                  Help us tailor the trial experience to your needs
                </p>

                <div className="flex flex-col gap-4">
                  <div className="flex gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Sam" {...field} />
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
                            <Input placeholder="Lee" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="teamSize"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Team Size</FormLabel>
                        <FormControl>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="--Select Team Size--" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="solo">Just me</SelectItem>
                              <SelectItem value="small">2-10 people</SelectItem>
                              <SelectItem value="medium">
                                11-50 people
                              </SelectItem>
                              <SelectItem value="large">
                                51-200 people
                              </SelectItem>
                              <SelectItem value="enterprise">
                                200+ people
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="department"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Department</FormLabel>
                        <FormControl>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="--Select Department--" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="engineering">
                                Engineering
                              </SelectItem>
                              <SelectItem value="product">Product</SelectItem>
                              <SelectItem value="design">Design</SelectItem>
                              <SelectItem value="marketing">
                                Marketing
                              </SelectItem>
                              <SelectItem value="sales">Sales</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  type="button"
                  className="w-full"
                  onClick={handleNextStep}
                >
                  Next
                </Button>
              </>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <>
                <h1 className="heading-5 font-semibold">Project Onboarding</h1>
                <p className="text-fg-secondary text-sm">
                  Join or set up your workspace
                </p>

                <FormField
                  control={form.control}
                  name="projectMode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Mode</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="--Choose an Option--" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="create">
                              Create a New Project
                            </SelectItem>
                            <SelectItem value="join">
                              Join Existing Project
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {form.watch('projectMode') === 'create' && (
                  <FormField
                    control={form.control}
                    name="projectName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Name</FormLabel>
                        <FormControl>
                          <Input placeholder="My Awesome Project" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {form.watch('projectMode') === 'join' && (
                  <FormField
                    control={form.control}
                    name="projectCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Invite Code</FormLabel>
                        <FormControl>
                          <Input placeholder="ABC123" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <Button type="submit" className="w-full">
                  Next
                </Button>
              </>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
