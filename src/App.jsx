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

  // ✅ Perbaikan Supabase Magic Link Handling
  useEffect(() => {
    // Tangani hash token dari Supabase setelah klik magic link
    const hash = window.location.hash;
    if (hash && hash.includes("access_token")) {
      const params = new URLSearchParams(hash.substring(1));
      const accessToken = params.get("access_token");
      const refreshToken = params.get("refresh_token");

      if (accessToken) {
        supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });

        // Hapus hash dan arahkan ke dashboard
        window.history.replaceState({}, document.title, "/dashboard");
      }
    }

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

  // Fungsi login user biasa
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

  // Fungsi login admin lokal
  const handleAdminLogin = () => {
    setIsAdmin(true);
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
  };

  // Loading screen saat cek sesi
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  // Routing utama
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        {/* Halaman Utama (Login User) */}
        <Route
          path="/"
          element={!user ? <LandingPage onLogin={handleLogin} /> : <Navigate to="/dashboard" />}
        />

        {/* Dashboard User */}
        <Route
          path="/dashboard"
          element={user ? <Dashboard user={user} /> : <Navigate to="/" />}
        />

        {/* Login Admin */}
        <Route
          path="/admin-login"
          element={!isAdmin ? <AdminLoginPage onAdminLogin={handleAdminLogin} /> : <Navigate to="/admin/dashboard" />}
        />

        {/* Dashboard Admin */}
        <Route
          path="/admin/dashboard"
          element={isAdmin ? <AdminDashboard onAdminLogout={handleAdminLogout} /> : <Navigate to="/admin-login" />}
        />
      </Routes>
    </>
  );
}

export default App;
