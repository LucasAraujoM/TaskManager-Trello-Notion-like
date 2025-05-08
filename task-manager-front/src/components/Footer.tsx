'use client';

import { Github, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Task Manager
          </p>
          <div className="flex items-center space-x-4">
            <a
              href="https://www.github.com/LucasAraujoM"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/lucas-araujo-martinez-25b131241"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
