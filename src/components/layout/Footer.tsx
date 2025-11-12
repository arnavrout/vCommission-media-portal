import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="border-t border-border bg-card mt-auto w-full"
    >
      <div className="max-w-7xl mx-auto px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-12 w-full">
          
          {/* Contact Section */}
          <div>
            <p className="text-sm text-muted-foreground">Contact: arnav10rout@gmail.com</p>
          </div>

          {/* Company Section */}
          <div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} All rights reserved
            </p>
          </div>

          {/* Credits Section */}
          <div className="flex items-center justify-start md:justify-end gap-2 text-sm">
            <span className="text-muted-foreground">Made with</span>
            <Heart className="h-4 w-4 text-red-500 fill-red-500" />
            <span className="text-muted-foreground">by</span>
            <span className="font-semibold text-foreground">Arnav</span>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};
