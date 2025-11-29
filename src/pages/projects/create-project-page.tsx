import CreateProjectForm, {
  type CreateProjectFormValues,
} from '@/components/projects/CreateProjectForm';
import { apiBase } from '@/lib/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const CreateProjectPage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useMutation<
    AxiosResponse,
    unknown,
    CreateProjectFormValues
  >({
    mutationFn: body => apiBase.post('/projects', body),
    onSuccess: async ({ data }) => {
      toast.success('Project created successfully.');

      await queryClient.invalidateQueries({
        queryKey: ['projects', 'list'],
      });

      if (data?.id) navigate(`/projects/${data.id}`);
    },
  });

  return <CreateProjectForm onSubmit={mutateAsync} isLoading={isPending} />;
};

export default CreateProjectPage;
