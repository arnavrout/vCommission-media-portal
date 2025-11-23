import { useEffect, useState } from "react";
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Users, Package, IndianRupee } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const stats = [
  {
    title: 'Total Revenue',
    value: '₹2,45,890',
    icon: IndianRupee,
    trend: '+12.5%',
    color: 'text-primary',
  },
  {
    title: 'Active Users',
    value: '1,234',
    icon: Users,
    trend: '+8.2%',
    color: 'text-accent-foreground',
  },
  {
    title: 'Products Sold',
    value: '567',
    icon: Package,
    trend: '+15.3%',
    color: 'text-brand-teal',
  },
  {
    title: 'Growth Rate',
    value: '23.4%',
    icon: TrendingUp,
    trend: '+4.1%',
    color: 'text-brand-dark',
  },
];

const initialData = [
  { name: 'Fashion', sales: 4000, revenue: 2400 },
  { name: 'Books', sales: 3000, revenue: 1398 },
  { name: 'Kids', sales: 2000, revenue: 9800 },
  { name: 'Groceries', sales: 2780, revenue: 3908 },
  { name: 'Beauty', sales: 1890, revenue: 4800 },
  { name: 'Sports', sales: 2390, revenue: 3800 },
];

const pieData = [
  { name: 'October', value: 400, color: 'hsl(var(--primary))' },
  { name: 'September', value: 300, color: 'hsl(var(--brand-teal))' },
  { name: 'August', value: 200, color: 'hsl(var(--brand-cream))' },
  { name: 'July', value: 100, color: 'hsl(var(--brand-dark))' },
];

const Dashboard = () => {

  const [data, setData] = useState(initialData);

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) =>
        prev.map((item) => ({
          ...item,
          sales: Math.max(500, item.sales + (Math.random() * 2000 - 1000)),
          revenue: Math.max(500, item.revenue + (Math.random() * 2000 - 1000)),
        }))
      );
    }, 1500); // updates every 1.5 sec

    return () => clearInterval(interval);
  }, []);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % pieData.length);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to vCommission Media Portal</p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card className="transition-shadow duration-300 hover:shadow-lg">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>

                  {/* 🚀 3D Rotating Icon */}
                  <motion.div
                    animate={{ rotateY: 360 }}
                    transition={{
                      repeat: Infinity,
                      duration: 4,
                      ease: "linear",
                    }}
                  >
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </motion.div>
                </CardHeader>

                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    <span className="text-green-600 font-medium">{stat.trend}</span> from last month
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Live Sales & Revenue</CardTitle>
            </CardHeader>

            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />

                  {/* Apply brand-teal and brand-dark colors */}
                  <Bar dataKey="sales" fill="hsl(var(--brand-teal))" />
                  <Bar dataKey="revenue" fill="hsl(var(--brand-dark))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>




        <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Product Category Distribution</CardTitle>
          </CardHeader>

          <CardContent className="flex justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  dataKey="value"
                  activeIndex={activeIndex}
                  activeShape={(props) => (
                    <motion.g
                      animate={{
                        filter:
                          "drop-shadow(0 0 20px rgba(255,255,255,0.9))",
                        scale: 1.08,
                      }}
                      transition={{ duration: 1, ease: "easeInOut" }}
                    >
                      <Cell {...props} fill={props.fill} />
                    </motion.g>
                  )}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
