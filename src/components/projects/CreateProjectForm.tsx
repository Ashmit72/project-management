import { Button } from '@/components/ui/button';
import { Divider } from '@/components/ui/divider';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { TextArea } from '@/components/ui/text-area';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from 'zod';

export const FormSchema = z.object({
  name: z.string().trim().nonempty('Project name is required'),
  description: z.string().optional(),
});

export type CreateProjectFormValues = z.infer<typeof FormSchema>;

const CreateProjectForm = ({
  isLoading,
  onSubmit,
}: {
  isLoading?: boolean;
  onSubmit: (values: CreateProjectFormValues) => Promise<any>;
}) => {
  const form = useForm<CreateProjectFormValues>({
    resolver: zodResolver(FormSchema),
    disabled: isLoading,
    mode: 'onChange',
    defaultValues: {
      name: '',
      description: '',
    },
  });
  return (
    <div className="w-full mt-[15%]">
      <div className="max-w-md gap-6 p-4 mx-auto border rounded-md">
        <h2 className="text-2xl font-bold text-fg">Create New Project</h2>
        <Divider className="my-4" />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          size="36"
                          type="text"
                          {...field}
                          placeholder="e.g. Slack Redesign"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <TextArea
                          placeholder="UI overhaul and performance tuning for Slack’s workspace client."
                          rows={4}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  className="w-full"
                  type="button"
                  color="neutral"
                  variant={'soft'}
                  asChild
                >
                  <Link to={'/'}>Cancel</Link>
                </Button>
                <Button
                  className="w-full"
                  type="submit"
                  loading={isLoading}
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating...' : 'Create Project'}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateProjectForm;
