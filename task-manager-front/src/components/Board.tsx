'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import Column from './Column';
import { type Task, type Column as ColumnType, getTasks, getColumns } from '@/services/taskService';
import { Plus } from 'lucide-react';

export default function Board() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [columns, setColumns] = useState<ColumnType[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingColumnId, setEditingColumnId] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [tasksData, columnsData] = await Promise.all([
          getTasks(),
          getColumns()
        ]);
        setTasks(tasksData);
        setColumns(columnsData.sort((a, b) => a.position - b.position));
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Memoize sorted columns
  const sortedColumns = useMemo(() => 
    [...columns].sort((a, b) => a.position - b.position),
    [columns]
  );

  // Memoize tasks by column
  const tasksByColumn = useMemo(() => {
    const taskMap = new Map<string, Task[]>();
    sortedColumns.forEach(column => {
      taskMap.set(
        column.id,
        tasks
          .filter(task => task.status === column.id)
          .sort((a, b) => a.position - b.position)
      );
    });
    return taskMap;
  }, [tasks, sortedColumns]);

  const handleDropTask = useCallback((taskId: string, newStatus: string, position: number) => {
    setTasks(prevTasks => {
      const updatedTasks = prevTasks.map(task => {
        if (task.id === taskId) {
          return { ...task, status: newStatus, position };
        }
        if (task.status === newStatus && task.position >= position) {
          return { ...task, position: task.position + 1 };
        }
        return task;
      });
      return updatedTasks;
    });
  }, []);

  const handleColumnDrop = useCallback((fromPosition: number, toPosition: number) => {
    setColumns(prevColumns => {
      const updatedColumns = prevColumns.map(col => {
        if (col.position === fromPosition) return { ...col, position: toPosition };
        if (fromPosition < toPosition && col.position <= toPosition && col.position > fromPosition) {
          return { ...col, position: col.position - 1 };
        }
        if (fromPosition > toPosition && col.position >= toPosition && col.position < fromPosition) {
          return { ...col, position: col.position + 1 };
        }
        return col;
      });
      return updatedColumns;
    });
  }, []);

  const handleColumnTitleEdit = useCallback((columnId: string, newTitle: string) => {
    setColumns(prevColumns =>
      prevColumns.map(col =>
        col.id === columnId ? { ...col, title: newTitle } : col
      )
    );
    setEditingColumnId(null);
  }, []);

  const handleCreateTask = useCallback((columnId: string, taskData: Partial<Task>) => {
    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: taskData.title || '',
      description: taskData.description || '',
      status: columnId,
      position: tasks.filter(t => t.status === columnId).length,
      comments: []
    };

    setTasks(prev => [...prev, newTask]);
  }, [tasks]);

  const addNewColumn = useCallback(() => {
    const newColumn: ColumnType = {
      id: `column-${Date.now()}`,
      title: 'Nueva Columna',
      position: columns.length
    };
    setColumns(prev => [...prev, newColumn]);
    setEditingColumnId(newColumn.id);
  }, [columns.length]);

  if (loading) {
    return (
      <div className="grid grid-cols-3 gap-6 bg-gray-900 p-6 rounded-xl">
        {[1, 2, 3].map(i => (
          <div key={i} className="p-4 rounded-lg bg-gray-800 min-h-[300px] animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Tablero</h1>
        <button
          onClick={addNewColumn}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          Agregar Columna
        </button>
      </div>
      <div className="flex gap-6 overflow-x-auto pb-4">
        {sortedColumns.map((column) => (
          <Column
            key={column.id}
            column={column}
            tasks={tasksByColumn.get(column.id) || []}
            onDropTask={handleDropTask}
            onColumnDrop={handleColumnDrop}
            isEditing={editingColumnId === column.id}
            onEditTitle={(newTitle) => handleColumnTitleEdit(column.id, newTitle)}
            onStartEdit={() => setEditingColumnId(column.id)}
            onCreateTask={handleCreateTask}
          />
        ))}
      </div>
    </div>
  );
} 