'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import toast from 'react-hot-toast';

interface UserProfile {
  name: string;
  email: string;
  phone?: string;
  address?: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState({ name: '', phone: '', address: '' });
  const [showInitials, setShowInitials] = useState(true);

  // ✅ 1. حمل من localStorage أولاً
  useEffect(() => {
    loadUserFromStorage();
    fetchProfile();
  }, []);

  // ✅ 2. حفظ في localStorage عند كل تغيير
  useEffect(() => {
    if (user) {
      localStorage.setItem('userProfile', JSON.stringify(user));
    }
  }, [user]);

  // ✅ 3. وظيفة تحميل من localStorage
  const loadUserFromStorage = () => {
    try {
      const saved = localStorage.getItem('userProfile');
      if (saved) {
        const parsed: UserProfile = JSON.parse(saved);
        setUser(parsed);
        setEditData({
          name: parsed.name || '',
          phone: parsed.phone || '',
          address: parsed.address || ''
        });
        setShowInitials(false);
        setLoading(false);
      }
    } catch (error) {
      console.error('localStorage load error:', error);
    }
  };

  const getGravatarUrl = (email: string): string => {
    if (!email) return '';
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(email.split('@')[0])}&size=128&background=10b981&color=fff`;
  };

  const getNameFromEmail = (email: string): string => {
    if (!email) return 'User';
    const namePart = email.split('@')[0];
    return namePart.charAt(0).toUpperCase() + namePart.slice(1);
  };

  const fetchProfile = async () => {
    try {
      const response = await fetch('https://ecommerce.routemisr.com/api/v1/auth/profile', {
        credentials: 'include',
        cache: 'no-store'
      });

      if (response.ok) {
        const data = await response.json();
        const profileData = data.data || data.profile || data;
        const fullName = profileData.name || getNameFromEmail(profileData.email || '');
        
        const newUserData: UserProfile = {
          name: fullName,
          email: profileData.email || '',
          phone: profileData.phone || '',
          address: profileData.address || ''
        };
        
        setUser(newUserData);
        setEditData({
          name: fullName,
          phone: profileData.phone || '',
          address: profileData.address || ''
        });
        localStorage.setItem('userProfile', JSON.stringify(newUserData));
      }
    } catch (error) {
      console.error('API error:', error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ 4. حفظ في localStorage + API
  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      // ✅ حفظ فوري في localStorage
      const newUserData: UserProfile = { 
        ...user!, 
        name: editData.name,
        phone: editData.phone || undefined,
        address: editData.address || undefined
      };
      setUser(newUserData);
      localStorage.setItem('userProfile', JSON.stringify(newUserData));
      toast.success('✅ Profile saved!');
      
      // جرب API (اختياري)
      try {
        const response = await fetch('https://ecommerce.routemisr.com/api/v1/users/updateMe', {
          method: 'PUT',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: editData.name,
            phone: editData.phone,
            address: editData.address
          })
        });
        if (response.ok) {
          console.log('✅ API saved too!');
        }
      } catch (apiError) {
        console.log('API failed, but localStorage saved');
      }
      
      setEditing(false);
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Save failed');
    } finally {
      setLoading(false);
    }
  };

  if (loading && !user) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-emerald-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-28 h-28 mx-auto mb-6 shadow-xl border-4 border-white rounded-full overflow-hidden relative group">
            <img
              src={getGravatarUrl(user?.email|| '')}
              className={`w-full h-full object-cover rounded-full absolute inset-0 transition-all duration-300 hover:scale-[1.05] ${showInitials ? 'opacity-0' : ''}`}
              onError={() => setShowInitials(true)}
              onLoad={() => setShowInitials(false)}
            />
            <div className={`absolute inset-0 bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-2xl font-bold text-white rounded-full transition-all duration-300 ${showInitials ? 'opacity-100 shadow-2xl' : 'opacity-20 group-hover:opacity-50'}`}>
              {user?.name.split(' ').map(n => n[0]).join('') || 'U'}
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{user?.name}</h1>
          <p className="text-gray-600 text-lg">{user?.email}</p>
        </div>

        {/* Profile Card */}
        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900 flex items-center justify-between">
              {editing ? 'Edit Profile' : 'Account Information'}
              {!editing && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setEditing(true)}
                  className="h-9 px-4 text-sm bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 rounded-xl shadow-sm"
                >
                  Edit Profile
                </Button>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-2">
            {editing ? (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  <Input
                    value={editData.name}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    className="h-12 rounded-xl border-2 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                  <Input
                    value={editData.phone}
                    onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                    className="h-12 rounded-xl border-2 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Address</label>
                  <Input
                    value={editData.address}
                    onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                    className="h-12 rounded-xl border-2 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200"
                    placeholder="Enter your address"
                  />
                </div>
                <div className="flex gap-3">
                  <Button 
                    onClick={handleUpdateProfile} 
                    disabled={loading}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white h-12 rounded-xl shadow-lg hover:shadow-xl transition-all"
                  >
                    {loading ? '💾 Saving...' : '💾 Save Changes'}
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setEditing(false)}
                    disabled={loading}
                    className="flex-1 h-12 rounded-xl border-gray-200"
                  >
                    Cancel
                  </Button>
                </div>
              </>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-between py-4 px-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-100">
                  <span className="text-sm font-semibold text-gray-700">Full Name</span>
                  <span className="font-bold text-gray-900 text-lg">{user?.name}</span>
                </div>
                <div className="flex justify-between py-4 px-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-100">
                  <span className="text-sm font-semibold text-gray-700">Email</span>
                  <span className="font-bold text-gray-900 text-lg">{user?.email}</span>
                </div>
                {user?.phone && (
                  <div className="flex justify-between py-4 px-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-100">
                    <span className="text-sm font-semibold text-gray-700">Phone</span>
                    <span className="font-bold text-gray-900">{user.phone}</span>
                  </div>
                )}
                {user?.address && (
                  <div className="flex justify-between py-4 px-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-100">
                    <span className="text-sm font-semibold text-gray-700">Address</span>
                    <span className="font-bold text-gray-900">{user.address}</span>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Links */}
        {!editing && (
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
              
            <Link href="/changePassword" className="block p-8 bg-emerald-50 shadow-lg hover:shadow-xl rounded-2xl text-center transition-all hover:-translate-y-1 border-2 border-emerald-100">
              <div className="w-16 h-16 bg-emerald-200 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"/>
                </svg>
              </div>
              <p className="font-bold text-xl text-emerald-900 mb-1">Change Password</p>
              <p className="text-sm text-emerald-700 font-medium">Update your password</p>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
