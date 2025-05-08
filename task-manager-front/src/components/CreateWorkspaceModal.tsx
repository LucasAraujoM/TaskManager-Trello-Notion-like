"use client";
import { useState } from 'react';
import { X } from 'lucide-react';

interface CreateWorkspaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; description: string; members: number }) => void;
  isLoading?: boolean;
}

export function CreateWorkspaceModal({ isOpen, onClose, onSubmit }: CreateWorkspaceModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    members: 1
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: '', description: '', members: 1 });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">Crear Workspace</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
              Nombre
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
              Descripción
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
              required
            />
          </div>
          <div>
            <label htmlFor="members" className="block text-sm font-medium text-gray-300 mb-1">
              Miembros Iniciales
            </label>
            <input
              type="number"
              id="members"
              min="1"
              value={formData.members}
              onChange={(e) => setFormData(prev => ({ ...prev, members: parseInt(e.target.value) }))}
              className="w-full bg-gray-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition-colors"
          >
            Crear Workspace
          </button>
        </form>
      </div>
    </div>
  );
} 