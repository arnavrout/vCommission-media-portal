import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';             
import PortalLogo from '../assets/vCommission-logo.png'
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated, isLoading } = useAuth();
  const { theme, toggleTheme } = useTheme(); 
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, isLoading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const success = await login(email, password);

    if (success) {
      toast({
        title: "Login successful",
        description: "Welcome to vCommission Media Portal",
      });
      navigate('/dashboard');
    } else {
      toast({
        title: "Login failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-brand-light via-background to-brand-cream p-4">

      {/* ⭐ THEME TOGGLE BUTTON IN TOP RIGHT */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 rounded-lg"
            onClick={toggleTheme}
          >
            {theme === 'light' ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>
        </TooltipTrigger>

        <TooltipContent side="bottom">
          <p>Change Theme</p>
        </TooltipContent>
      </Tooltip>


      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="w-full max-w-2xl shadow-xl">
          <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-2">
            <img
              src={PortalLogo}
              alt="vCommission Logo"
              className="h-16 w-auto object-contain"
            />
          </div>
          <CardTitle className="text-3xl font-bold">Welcome</CardTitle>
          <CardDescription>
            vCommission Media Portal
          </CardDescription>
        </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="text"
                  placeholder="Enter Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-11"
                />
              </div>
              <Button
                type="submit"
                className="w-full h-11 text-base font-medium"
                disabled={loading}
              >
                {loading ? 'Loging in...' : 'Log In'}
              </Button>
            </form>
            
            <div className="mt-6 p-4 bg-muted rounded-lg w-[350px] mx-auto">
              <p className="text-xs text-muted-foreground text-center mb-2">Demo Credentials</p>
              <p className="text-sm text-center">
                <span className="font-medium">Email:</span> vcommission@gmail.com
              </p>
              <p className="text-sm text-center">
                <span className="font-medium">Password:</span> vCommission
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;
