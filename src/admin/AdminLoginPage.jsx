import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function AdminLoginPage({ onAdminLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); // Reset pesan error setiap kali login dicoba

    // Simulasi proses login dengan jeda singkat
    setTimeout(() => {
      if (username === 'admin@gmail.com' && password === 'admin123') {
        onAdminLogin(); // Mengatur status login admin di App.jsx
        navigate('/admin/dashboard');
      } else {
        setError('Username atau password yang Anda masukkan salah.');
        setLoading(false); // Hentikan loading jika login gagal
      }
    }, 500); // jeda 0.5 detik untuk simulasi
  };

  return (
    <div className="min-h-screen w-full bg-slate-900 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-sm mx-auto animate-fade-in">
        <div className="text-center mb-8">
            <h1 className="text-4xl font-bold flex items-center justify-center gap-3">
                <span className="text-5xl">👑</span>
                <span>Admin Panel</span>
            </h1>
            <p className="text-gray-400 mt-2">Silakan login untuk mengelola KelasKu.</p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-gray-700">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                    Username
                </label>
                <input
                    id="username"
                    type="text"
                    placeholder="admin@gmail.com"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    required
                    disabled={loading}
                />
            </div>
            <div>
                <label htmlFor="password"  className="block text-sm font-medium text-gray-300 mb-2">
                    Password
                </label>
                <input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    required
                    disabled={loading}
                />
            </div>
            
            {error && (
              <p className="text-sm text-red-400 text-center">{error}</p>
            )}

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
                {loading ? (
                    <>
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                        <span>Logging in...</span>
                    </>
                ) : (
                    <span>Login</span>
                )}
            </button>
          </form>
        </div>
        
        <div className="text-center mt-6">
            <Link to="/" className="text-sm text-gray-400 hover:text-white hover:underline transition">
                Kembali ke Halaman Utama
            </Link>
        </div>
      </div>
    </div>
  );
}
