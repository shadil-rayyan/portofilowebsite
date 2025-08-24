"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export default function AdminDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        router.push('/admin/login');
      }
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [router]);


  const handleLogout = async () => {
    await auth.signOut();
    router.push('/admin/login');
  };

  if (loading) {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <Loader2 className="h-16 w-16 animate-spin" />
        </div>
    );
  }

  if (!user) {
    return null; // Or a redirect component
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto flex h-14 items-center px-4 justify-between">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <Button onClick={handleLogout} variant="outline">Logout</Button>
        </div>
      </header>
      <main className="flex-grow p-8">
        <div className="container mx-auto">
            <h2 className="text-3xl font-bold tracking-tight mb-8">Welcome, Admin!</h2>
            <p>This is where you'll manage your portfolio content.</p>
            {/* Management sections for Projects, Skills, etc. will go here */}
        </div>
      </main>
    </div>
  );
}
