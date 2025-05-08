import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export interface Workspace {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  members: number;
}

export const getWorkspaces = async (): Promise<Workspace[]> => {
  // Aquí normalmente harías una llamada a tu API
  return [
    {
      id: "1",
      name: "Proyecto Personal",
      description: "Gestión de tareas personales y objetivos",
      createdAt: "2024-03-15",
      members: 1
    },
    {
      id: "2",
      name: "Desarrollo Web",
      description: "Proyectos de desarrollo web y aplicaciones",
      createdAt: "2024-03-14",
      members: 3
    },
    {
      id: "3",
      name: "Marketing Digital",
      description: "Campañas y estrategias de marketing",
      createdAt: "2024-03-13",
      members: 5
    }
  ];
};

export const createWorkspace = async (workspace: Omit<Workspace, 'id' | 'createdAt'>): Promise<Workspace> => {
  // Aquí normalmente harías una llamada POST a tu API
  const newWorkspace: Workspace = {
    id: `workspace-${Date.now()}`,
    createdAt: new Date().toISOString().split('T')[0],
    ...workspace
  };
  return newWorkspace;
}; 