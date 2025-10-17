import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { supabase } from './lib/supabaseClient';

// Import semua komponen halaman
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import AdminLoginPage from './admin/AdminLoginPage';
import AdminDashboard from './admin/AdminDashboard';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  // State untuk user biasa (yang login via Supabase)
  const [user, setUser] = useState(null);
  // State BARU untuk admin (login lokal, bukan Supabase)
  const [isAdmin, setIsAdmin] = useState(false);
  // State untuk loading awal
  const [loading, setLoading] = useState(true);

  // useEffect ini HANYA untuk mengecek sesi user biasa dari Supabase
  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };
    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Fungsi untuk login user biasa
  const handleLogin = async (email) => {
    if (!email) return toast.error("Masukkan email kamu");
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
      },
    });
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Link login telah dikirim ke email kamu!");
    }
  };

  // --- FUNGSI BARU UNTUK ADMIN ---
  const handleAdminLogin = () => {
    // Fungsi ini dipanggil dari AdminLoginPage setelah username & password benar
    setIsAdmin(true);
  };

  const handleAdminLogout = () => {
    // Fungsi ini dipanggil dari AdminDashboard
    setIsAdmin(false);
  };
  
  // Menampilkan loading screen saat pertama kali cek sesi
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  // --- STRUKTUR ROUTING YANG BARU DAN BERSIH ---
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        {/* Rute Halaman Utama (Login User) */}
        <Route 
          path="/" 
          element={!user ? <LandingPage onLogin={handleLogin} /> : <Navigate to="/dashboard" />} 
        />

        {/* Rute Dashboard User (Terlindungi) */}
        <Route 
          path="/dashboard" 
          element={user ? <Dashboard user={user} /> : <Navigate to="/" />}
        />

        {/* Rute Halaman Login Admin */}
        <Route 
          path="/admin-login" 
          element={!isAdmin ? <AdminLoginPage onAdminLogin={handleAdminLogin} /> : <Navigate to="/admin/dashboard" />}
        />

        {/* Rute Dashboard Admin (Terlindungi) */}
        <Route 
          path="/admin/dashboard" 
          element={isAdmin ? <AdminDashboard onAdminLogout={handleAdminLogout} /> : <Navigate to="/admin-login" />}
        />
      </Routes>
    </>
  );
}

export default App;
