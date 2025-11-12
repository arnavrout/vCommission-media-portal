import { ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { motion } from 'framer-motion';

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth > 500);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, isLoading, navigate]);

  // Automatically hide sidebar on small screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 500) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isLoading || !isAuthenticated) return null;

  return (
    <div className="flex min-h-screen w-full bg-background relative overflow-hidden">
      <Sidebar isOpen={sidebarOpen} />
      <div className="flex-1 flex flex-col">
        <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex-1 p-6"
        >
          {children}
        </motion.main>
        <Footer />
      </div>
    </div>
  );
};
