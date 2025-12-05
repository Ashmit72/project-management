import { Column } from '@/components/projects/board/Column';
import BoardColumnsSkeleton from '@/components/skeletons/BoardColumnsSkeleton';
import { apiBase } from '@/lib/api';
import type { BoardColumn } from '@/lib/types/projectTypes';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { BoardTaskBase } from './BoardTask';

export default function ProjectBoard() {
  const { projectId } = useParams();

  const queryClient = useQueryClient();
  const [activeId, setActiveId] = useState<string | null>(null);

  const { data: board, isPending: isLoadingBoard } = useQuery({
    enabled: !!projectId,
    select: res => res.data,
    queryKey: ['projects', projectId, 'board'],
    queryFn: async () => {
      const data = await apiBase.get<BoardColumn[]>(
        `/projects/${projectId}/board`
      );
      return data;
    },
  });

  // Mutation to update task status
  const updateTaskMutation = useMutation({
    mutationFn: async ({
      taskId,
      newColumnId,
    }: {
      taskId: string;
      newColumnId: string;
    }) => {
      return await apiBase.patch(`/projects/${projectId}/tasks/${taskId}`, {
        columnId: newColumnId,
      });
    },
    onSuccess: () => {
      // Refetch board data after successful update
      queryClient.invalidateQueries({
        queryKey: ['projects', projectId, 'board'],
      });
    },
    onError: error => {
      console.error('Failed to update task:', error);
      // Rollback optimistic update on error
      queryClient.invalidateQueries({
        queryKey: ['projects', projectId, 'board'],
      });
    },
  });

  // Sensors for better drag experience
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Require 8px movement before drag starts
      },
    })
  );

  const handleDragStart = event => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = event => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const taskId = active.id;
    const newColumnId = over.id;

    // Find the task's current column
    const currentColumn = board?.find(col =>
      col.tasks.some(task => task.id === taskId)
    );

    // If dropped in the same column, do nothing
    if (currentColumn?.id === newColumnId) return;

    // Optimistic update
    queryClient.setQueryData(['projects', projectId, 'board'], (old: any) => {
      if (!old?.data) return old;

      const newBoard = old.data.map(col => ({ ...col }));
      let movedTask = null;

      // Remove task from old column
      newBoard.forEach(col => {
        const taskIndex = col.tasks.findIndex(task => task.id === taskId);
        if (taskIndex > -1) {
          movedTask = col.tasks[taskIndex];
          col.tasks = col.tasks.filter((_, idx) => idx !== taskIndex);
        }
      });

      // Add task to new column
      if (movedTask) {
        const targetColumn = newBoard.find(col => col.id === newColumnId);
        if (targetColumn) {
          targetColumn.tasks.push(movedTask);
        }
      }

      return { ...old, data: newBoard };
    });

    // Perform actual update
    updateTaskMutation.mutate({ taskId, newColumnId });
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  // Find active task for drag overlay
  const activeTask = board
    ?.flatMap(col => col.tasks)
    .find(task => task.id === activeId);

  const activeColumn = board?.find(col =>
    col.tasks.some(task => task.id === activeId)
  );

  if (isLoadingBoard) return <BoardColumnsSkeleton />;

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <div
        className="flex gap-3 w-full min-h-screen overflow-x-auto p-0.5"
        style={{ alignItems: 'flex-start' }}
      >
        {board?.map(column => (
          <Column key={column.id} column={column} />
        ))}
      </div>
      {/* Drag overlay for better UX */}
      <DragOverlay>
        {activeTask && activeColumn ? (
          <BoardTaskBase
            task={activeTask}
            isDragging={false}
            columnName={activeColumn.name}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
