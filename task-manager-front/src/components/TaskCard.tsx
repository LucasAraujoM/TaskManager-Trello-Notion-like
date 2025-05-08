'use client';

import { useRef, memo, useState } from 'react';
import { useDrag } from 'react-dnd';
import type { Task } from '@/services/taskService';
import { TaskDetailModal } from './TaskDetailModal';

interface TaskCardProps {
  task: Task;
}

const TaskCard = memo(function TaskCard({ task }: TaskCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [{ isDragging }, drag] = useDrag({
    type: 'TASK',
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(ref);

  const handleClick = (e: React.MouseEvent) => {
    // Evitar que el clic interfiera con el drag and drop
    if (!isDragging) {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <div
        ref={ref}
        onClick={handleClick}
        className={`p-4 bg-gray-700 rounded-lg shadow-sm cursor-pointer transition-all hover:bg-gray-600 ${
          isDragging ? 'opacity-50' : ''
        }`}
      >
        <h3 className="text-gray-200 font-medium mb-2">{task.title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
          {task.description}
        </p>
      </div>

      <TaskDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        task={task}
      />
    </>
  );
});

export default TaskCard;
