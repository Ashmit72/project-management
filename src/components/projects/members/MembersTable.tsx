import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getInitials } from '@/components/ui/avatar-group';
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from '@/components/ui/dropdown';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { usePermission } from '@/hooks/use-permission';
import { apiBase } from '@/lib/api';
import type { Member } from '@/lib/types/memberTypes';
import type { Role } from '@/lib/types/roleTypes';
import { cn } from '@/lib/utils';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';
import { ChevronDownIcon, ChevronUpIcon, Ellipsis, Trash2 } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

export default function MembersTable({
  members = [],
  isLoading,
  loggedInUserId,
}: {
  members?: Member[];
  loggedInUserId?: string;
  isLoading?: boolean;
}) {
  const { projectId } = useParams();
  const queryClient = useQueryClient();
  const { can } = usePermission();
  const canAssignRole = can('role:assign');

  const { data: roles = [] } = useQuery({
    queryKey: ['project', projectId, 'roles'],
    queryFn: async () => {
      const { data } = await apiBase.get<Role[]>(`/rbac/${projectId}/roles`);
      return data;
    },
    enabled: !!projectId,
  });

  const updateRoleMutation = useMutation({
    mutationFn: async ({
      memberId,
      roleId,
    }: {
      memberId: string;
      roleId: string;
    }) => {
      await apiBase.put(`/rbac/${projectId}/members/${memberId}/role`, {
        roleId,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['projects', projectId, 'members'],
      });
      toast.success('Role updated successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to update role');
    },
  });

  const handleRoleChange = (memberId: string, roleId: string) => {
    updateRoleMutation.mutate({ memberId, roleId });
  };

  return (
    <div className="flex flex-col w-full gap-4 overflow-auto">
      <div className="overflow-y-scroll border rounded-md bg-background no-scrollbar">
        {isLoading ? (
          <div className="flex items-center justify-center w-full h-60">
            <Spinner />
          </div>
        ) : (
          <Table className="table-fixed">
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead style={{ width: '40px' }} className="h-11">
                  #
                </TableHead>
                <TableHead style={{ width: '250px' }} className="h-11">
                  User
                </TableHead>
                <TableHead style={{ width: '180px' }} className="h-11">
                  Role
                </TableHead>
                <TableHead style={{ width: '140px' }} className="h-11">
                  Joined
                </TableHead>
                <TableHead style={{ width: '140px' }} className="h-11">
                  Invited by
                </TableHead>
                <TableHead style={{ width: '60px' }} className="h-11">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members?.length ? (
                members.map((member, index) => {
                  const isOwner = member.role?.name === 'Owner';
                  const isSelf = member.user.id === loggedInUserId;

                  return (
                    <TableRow key={member.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar rounded="square" size="36">
                            <AvatarImage src={member.user.image} />
                            <AvatarFallback>
                              {getInitials(member.user.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <p className="text-sm font-medium text-fg">
                              {member.user.name}
                            </p>
                            <p className="text-xs font-normal text-fg-secondary">
                              {member.user.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {canAssignRole && !isOwner && !isSelf ? (
                          <Select
                            value={member.role?.id}
                            onValueChange={roleId =>
                              handleRoleChange(member.id, roleId)
                            }
                          >
                            <SelectTrigger className="w-[150px]">
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                              {roles
                                .filter(r => r.name !== 'Owner')
                                .map(role => (
                                  <SelectItem key={role.id} value={role.id}>
                                    {role.name}
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <p className="text-sm font-normal text-fg-secondary">
                            {member.role?.name}
                          </p>
                        )}
                      </TableCell>
                      <TableCell>
                        <p className="text-sm font-normal text-fg-secondary">
                          {formatDistanceToNow(member.createdAt, {
                            addSuffix: true,
                          })}
                        </p>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Avatar size="32" className="border-2 border-bg">
                            <AvatarImage src={member.inviteByUser.image} />
                            <AvatarFallback className="text-xs">
                              {getInitials(member.inviteByUser.name)}
                            </AvatarFallback>
                          </Avatar>
                          <p className="text-sm text-fg-secondary">
                            {member.inviteByUser.name}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Dropdown>
                          <DropdownTrigger className="flex items-center justify-center w-full">
                            <Ellipsis size={20} />
                          </DropdownTrigger>
                          <DropdownContent className="w-fit">
                            <DropdownItem
                              className="text-destructive"
                              disabled={isOwner || isSelf}
                            >
                              <Trash2 className="h-4 w-4" />
                              Remove
                            </DropdownItem>
                          </DropdownContent>
                        </Dropdown>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
