import { LayoutDashboard, Package, User, Building2 } from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { motion } from 'framer-motion';
import PortalLogo from '../../assets/vCommission-logo.png';

const menuItems = [
  { title: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { title: 'Products', icon: Package, path: '/products' },
  { title: 'Our Brands', icon: Building2, path: '/brands' },  // ⭐ NEW PAGE
  { title: 'Profile', icon: User, path: '/profile' },
];

interface SidebarProps {
  isOpen: boolean;
}

export const Sidebar = ({ isOpen }: SidebarProps) => {
  return (
    <motion.aside
      initial={{ x: -250 }}
      animate={{ x: isOpen ? 0 : -250 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className={`
        bg-card border-r border-border shadow-md z-30 w-64

        max-[1000px]:fixed
        max-[1000px]:left-0
        max-[1000px]:top-0
        max-[1000px]:h-screen
        max-[1000px]:pt-[50px]

        min-[1000px]:sticky
        min-[1000px]:top-0
        min-[1000px]:h-auto
      `}
      style={{
        pointerEvents: isOpen ? 'auto' : 'none',
      }}
    >
      {/* Header */}
      <div className="p-6 w-full flex flex-col items-start space-y-2">
        <img
          src={PortalLogo}
          alt="vCommission Logo"
          className="h-12 w-auto object-contain"
        />
        <p className="text-base font-medium text-muted-foreground">Media Portal</p>
      </div>

      {/* Navigation */}
      <nav className="px-3 space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className="flex items-center gap-3 px-3 py-3 rounded-lg text-foreground hover:bg-sidebar-accent transition-colors"
            activeClassName="bg-primary text-primary-foreground hover:bg-primary"
          >
            <item.icon className="h-5 w-5" />
            <span className="font-medium">{item.title}</span>
          </NavLink>
        ))}
      </nav>
    </motion.aside>
  );
};
