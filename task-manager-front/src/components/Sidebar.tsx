'use client';

import { 
  ChevronLeft, 
  ChevronRight, 
  LayoutDashboard, 
  Users, 
  Briefcase,
  Plus,
  Settings
} from 'lucide-react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useState, useEffect, useCallback } from 'react';
import { type Workspace, getWorkspaces, createWorkspace } from '@/services/workspaceService';
import { CreateWorkspaceModal } from './CreateWorkspaceModal';
import { toast } from 'react-hot-toast';

interface SidebarProps {
  className?: string;
}

export const Sidebar = ({ className = '' }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useLocalStorage('sidebarCollapsed', false);
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [selectedWorkspace, setSelectedWorkspace] = useLocalStorage('selectedWorkspace', '');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadWorkspaces = useCallback(async () => {
    try {
      const data = await getWorkspaces();
      setWorkspaces(data);
      if (!selectedWorkspace && data.length > 0) {
        setSelectedWorkspace(data[0].id);
      }
    } catch (error) {
      console.error('Error loading workspaces:', error);
      toast.error('Error loading workspaces');
    } finally {
      setLoading(false);
    }
  }, [selectedWorkspace, setSelectedWorkspace]);

  useEffect(() => {
    loadWorkspaces();
  }, []); // Remove dependency on selectedWorkspace

  const handleCreateWorkspace = async (data: { name: string; description: string; members: number }) => {
    try {
      const newWorkspace = await createWorkspace(data);
      setWorkspaces(prev => [...prev, newWorkspace]);
      setSelectedWorkspace(newWorkspace.id);
      toast.success('Workspace created successfully!');
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error creating workspace:', error);
      toast.error('Failed to create workspace');
    }
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Boards', href: '/boards' },
    { icon: <Users size={20} />, label: 'Members', href: '/members' },
    { icon: <Settings size={20} />, label: 'Settings', href: '/settings' },
  ];

  return (
    <>
      <div
        className={`bg-gray-900 border-r border-gray-800 h-screen transition-all duration-300 ${
          isCollapsed ? 'w-16' : 'w-64'
        } ${className}`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-gray-800">
            {!isCollapsed && <h2 className="text-xl font-semibold text-white">Task Manager</h2>}
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
            >
              {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {!isCollapsed && (
              <div className="p-4 border-b border-gray-800">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-400">WORKSPACES</h3>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="p-1 text-gray-400 hover:text-white transition-colors"
                    title="Create Workspace"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <div className="space-y-1">
                  {workspaces.map((workspace) => (
                    <button
                      key={workspace.id}
                      onClick={() => setSelectedWorkspace(workspace.id)}
                      className={`w-full text-left px-2 py-1.5 rounded-lg transition-colors ${
                        selectedWorkspace === workspace.id
                          ? 'bg-gray-800 text-white'
                          : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Briefcase size={16} />
                        <span className="truncate">{workspace.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <nav className="p-4">
              <ul className="space-y-2">
                {menuItems.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="flex items-center gap-3 p-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
                    >
                      {item.icon}
                      {!isCollapsed && <span>{item.label}</span>}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>

      <CreateWorkspaceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateWorkspace}
      />
    </>
  );
};
