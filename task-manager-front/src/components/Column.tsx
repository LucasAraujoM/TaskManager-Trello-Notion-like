'use client';

// components/Column.tsx
import { useDrop, useDrag } from 'react-dnd';
import TaskCard from './TaskCard';
import { useRef, useState, KeyboardEvent, memo } from 'react';
import { GripHorizontal, Pencil, Plus } from 'lucide-react';
import { type Column as ColumnType, type Task } from '@/services/taskService';

interface ColumnProps {
  column: ColumnType;
  tasks: Task[];
  onDropTask: (taskId: string, columnId: string, position: number) => void;
  onColumnDrop: (fromPosition: number, toPosition: number) => void;
  isEditing: boolean;
  onEditTitle: (newTitle: string) => void;
  onStartEdit: () => void;
  onCreateTask?: (columnId: string, task: Partial<Task>) => void;
}

const Column = memo(function Column({ 
  column,
  tasks, 
  onDropTask,
  onColumnDrop,
  isEditing,
  onEditTitle,
  onStartEdit,
  onCreateTask
}: ColumnProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [editedTitle, setEditedTitle] = useState(column.title);
  const [isCreating, setIsCreating] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');

  // Drop para tareas
  const [{ isOver }, drop] = useDrop({
    accept: 'TASK',
    drop: (item: { id: string }) => {
      const position = tasks.length;
      onDropTask(item.id, column.id, position);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  // Drag and drop para columnas
  const [{ isDragging }, drag] = useDrag({
    type: 'COLUMN',
    item: { position: column.position },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropColumn] = useDrop({
    accept: 'COLUMN',
    hover: (item: { position: number }, monitor) => {
      if (!ref.current) return;
      
      const dragPosition = item.position;
      const hoverPosition = column.position;
      
      if (dragPosition === hoverPosition) return;

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
      const clientOffset = monitor.getClientOffset();
      
      if (!clientOffset) return;

      const hoverClientX = clientOffset.x - hoverBoundingRect.left;

      if (dragPosition < hoverPosition && hoverClientX < hoverMiddleX) return;
      if (dragPosition > hoverPosition && hoverClientX > hoverMiddleX) return;

      onColumnDrop(dragPosition, hoverPosition);
      item.position = hoverPosition;
    },
  });

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onEditTitle(editedTitle);
    }
  };

  const handleCreateClick = () => {
    setIsCreating(true);
  };

  const handleSubmitNewTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask: Partial<Task> = {
      title: newTaskTitle,
      description: newTaskDescription,
      status: column.id,
      position: tasks.length,
      comments: []
    };

    onCreateTask?.(column.id, newTask);
    setNewTaskTitle('');
    setNewTaskDescription('');
    setIsCreating(false);
  };

  // Combinar las refs de drag y drop
  drag(dropColumn(ref));
  drop(ref);

  const sortedTasks = tasks.sort((a, b) => a.position - b.position);

  return (
    <div
      ref={ref}
      className={`w-80 shrink-0 p-4 rounded-lg bg-gray-800 transition-colors ${
        isOver ? 'bg-gray-700' : ''
      } ${isDragging ? 'opacity-50' : ''}`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="cursor-move text-gray-400 hover:text-gray-300">
            <GripHorizontal size={20} />
          </div>
          {isEditing ? (
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={() => onEditTitle(editedTitle)}
              className="bg-gray-700 text-white px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
          ) : (
            <>
              <h2 className="font-bold text-gray-200">{column.title}</h2>
              <button
                onClick={onStartEdit}
                className="p-1 text-gray-400 hover:text-white transition-colors"
              >
                <Pencil size={16} />
              </button>
            </>
          )}
        </div>
        <span className="text-sm text-gray-400">{tasks.length}</span>
      </div>

      <div className="space-y-3">
        {sortedTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}

        {isCreating ? (
          <form onSubmit={handleSubmitNewTask} className="space-y-2">
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Título de la tarea"
              className="w-full bg-gray-700 text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            <textarea
              value={newTaskDescription}
              onChange={(e) => setNewTaskDescription(e.target.value)}
              placeholder="Descripción (opcional)"
              className="w-full bg-gray-700 text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={3}
            />
            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors"
                disabled={!newTaskTitle.trim()}
              >
                Guardar
              </button>
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="flex-1 bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-600 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        ) : (
          <button
            onClick={handleCreateClick}
            className="w-full p-3 bg-gray-700 rounded-lg border-2 border-dashed border-gray-600 text-gray-400 hover:bg-gray-600 hover:text-white transition-all flex items-center justify-center gap-2"
          >
            <Plus size={20} />
            Crear
          </button>
        )}
      </div>
    </div>
  );
});

export default Column;