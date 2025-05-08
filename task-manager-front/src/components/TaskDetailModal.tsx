'use client';

import { useState } from 'react';
import { X, MessageSquare, Clock } from 'lucide-react';
import { Task } from '@/services/taskService';

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  author: string;
}

interface TaskDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task;
  onUpdate?: (taskId: string, updates: Partial<Task>) => void;
}

export function TaskDetailModal({ isOpen, onClose, task, onUpdate }: TaskDetailModalProps) {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);

  if (!isOpen) return null;

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      content: newComment,
      createdAt: new Date().toISOString(),
      author: 'Current User' // Esto debería venir de tu sistema de autenticación
    };

    setComments(prev => [...prev, comment]);
    setNewComment('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg w-full max-w-3xl max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white">{task.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="space-y-6">
            {/* Descripción */}
            <div>
              <h3 className="text-lg font-medium text-white mb-2">Descripción</h3>
              <p className="text-gray-300">{task.description}</p>
            </div>

            {/* Comentarios */}
            <div>
              <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
                <MessageSquare size={20} />
                Comentarios
              </h3>
              
              <div className="space-y-4 mb-6">
                {comments.map(comment => (
                  <div key={comment.id} className="bg-gray-700 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium text-white">{comment.author}</span>
                      <span className="text-sm text-gray-400 flex items-center gap-1">
                        <Clock size={14} />
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-300">{comment.content}</p>
                  </div>
                ))}
              </div>

              {/* Formulario para nuevo comentario */}
              <form onSubmit={handleAddComment} className="space-y-3">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Añade un comentario..."
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows={3}
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  disabled={!newComment.trim()}
                >
                  Añadir comentario
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 