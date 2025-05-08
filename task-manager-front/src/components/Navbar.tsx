'use client';
import Link from 'next/link';

export const Navbar = () => {
  return (
    <nav className="bg-gray-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-white">Task Manager</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/tasks" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
              Tasks
            </Link>
            <Link href="/projects" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
              Projects
            </Link>
            <Link href="/profile" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
              Profile
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
