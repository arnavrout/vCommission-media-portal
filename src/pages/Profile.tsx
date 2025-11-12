import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Mail, User, Calendar, MapPin, Phone, Building, Camera } from 'lucide-react';
import { motion } from 'framer-motion';

const Profile = () => {
  const { user } = useAuth();

    // Load profile image from localStorage
  const [profileImage, setProfileImage] = useState<string | null>(() => {
    return localStorage.getItem('profileImage');
  });

  // Handle image upload and save to localStorage
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result as string;
        setProfileImage(base64Image);
        localStorage.setItem('profileImage', base64Image);
      };
      reader.readAsDataURL(file);
    }
  };


  const profileData = [
    { icon: User, label: 'Full Name', value: user?.name || 'N/A' },
    { icon: Mail, label: 'Email Address', value: user?.email || 'N/A' },
    { icon: Phone, label: 'Phone Number', value: '+91 98765 43210' },
    { icon: Building, label: 'Company', value: 'vCommission Media' },
    { icon: MapPin, label: 'Location', value: 'New Delhi, India' },
    { icon: Calendar, label: 'Member Since', value: 'November 2025' },
  ];

  return (
      <DashboardLayout>
      <div className="space-y-6 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="text-muted-foreground">Manage your account information</p>
        </motion.div>

        {/* Profile Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card>
            <CardHeader className="border-b">
              <div className="flex items-center gap-6">
                {/* ✅ Editable Profile Image */}
                <div className="relative">
                  <div className="h-24 w-24 rounded-full overflow-hidden bg-primary flex items-center justify-center">
                    {profileImage ? (
                      <img src={profileImage} alt="Profile" className="h-full w-full object-cover" />
                    ) : (
                      <span className="text-primary-foreground font-bold text-3xl">
                        {user?.name?.charAt(0) || 'A'}
                      </span>
                    )}
                  </div>

                  {/* Camera icon for upload */}
                  <label
                    htmlFor="profile-upload"
                    className="absolute bottom-1 right-1 bg-primary text-white p-1.5 rounded-full cursor-pointer hover:bg-primary/80 transition"
                  >
                    <Camera className="h-4 w-4" />
                  </label>
                  <input
                    id="profile-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>

                {/* Name & Email */}
                <div>
                  <CardTitle className="text-2xl">{user?.name}</CardTitle>
                  <p className="text-muted-foreground">{user?.email}</p>
                </div>
              </div>
            </CardHeader>

            {/* ✅ Profile Info Grid (3 per row) */}
            <CardContent className="pt-6">
              <div className="grid gap-6 md:grid-cols-3">
                {profileData.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4 p-4 rounded-lg bg-muted/50"
                  >
                    <div className="p-2 rounded-lg bg-primary/10">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground mb-1">{item.label}</p>
                      <p className="font-medium">{item.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Account Info Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b">
                <span className="text-muted-foreground">Account Status</span>
                <span className="font-medium text-green-600">Active</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b">
                <span className="text-muted-foreground">Account Type</span>
                <span className="font-medium">Premium</span>
              </div>
               <div className="flex items-center justify-between py-3">
                <span className="text-muted-foreground">Two-Factor Authentication</span>
                <span className="font-medium text-red-600">Disabled</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>

  );
};

export default Profile;
