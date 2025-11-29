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
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const CreateProjectPage = () => {
  const form = useForm();
  return (
    <div className="w-full">
      <div className="max-w-md gap-6 p-4 mx-auto border rounded-md">
        <h2 className="text-2xl font-bold text-fg">Create New Project</h2>
        <Divider className="my-4" />
        <Form {...form}>
          <form>
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
                <Button className="w-full" type="submit">
                  Create Project
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateProjectPage;
