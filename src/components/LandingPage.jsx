import React, { useState } from "react";
import { Link } from "react-router-dom";

// Komponen kecil untuk menampilkan kartu fitur
const FeatureCard = ({ icon, title, description }) => (
    <div className="flex items-start gap-4">
        <div className="text-3xl mt-1">{icon}</div>
        <div>
            <h3 className="font-semibold text-white">{title}</h3>
            <p className="text-gray-400 text-sm">{description}</p>
        </div>
    </div>
);

export default function LandingPage({ onLogin }) {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await onLogin(email);
        setLoading(false);
    };

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 to-slate-900 text-white flex items-center justify-center p-4 lg:p-8">
            <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                
                {/* === KOLOM KIRI: BRANDING & FITUR === */}
                <div className="hidden lg:flex flex-col gap-10 animate-fade-in">
                    <div className="flex items-center gap-4">
                        <div className="text-6xl">🎓</div>
                        <div>
                            <h1 className="text-5xl font-bold">KelasKu</h1>
                            <p className="text-xl text-gray-300">Platform Kursus Online Terbaik</p>
                        </div>
                    </div>
                    <p className="text-gray-300 text-lg">
                        Satu tempat untuk semua kursus online-mu. Atur, akses, dan lanjutkan proses belajarmu dari mana saja, kapan saja.
                    </p>
                    <div className="space-y-6 border-t border-gray-700 pt-8">
                        <FeatureCard 
                            icon="📚" 
                            title="Pusat Pembelajaran" 
                            description="Simpan dan kelola kursus dari berbagai platform seperti Coursera, Udemy, dan YouTube dalam satu dashboard."
                        />
                        <FeatureCard 
                            icon="💡" 
                            title="Akses Instan" 
                            description="Tidak perlu lagi mencari link yang hilang. Semua kursus favoritmu hanya berjarak satu klik saja."
                        />
                        <FeatureCard 
                            icon="🎯" 
                            title="Fokus & Fleksibel" 
                            description="Lanjutkan progres belajarmu tanpa gangguan, baik di desktop maupun di perangkat mobile."
                        />
                    </div>
                </div>

                {/* === KOLOM KANAN: FORM LOGIN === */}
                <div className="w-full max-w-md mx-auto animate-fade-in-delay">
                    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-gray-700">
                        <div className="text-center mb-6">
                            <h2 className="text-3xl font-bold text-white">Selamat Datang!</h2>
                            <p className="text-gray-400 mt-2">Masuk untuk mengakses semua kursusmu.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="nama@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                    required
                                    disabled={loading}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                                        <span>Mengirim...</span>
                                    </>
                                ) : (
                                    <span>✉️ Masuk dengan Email</span>
                                )}
                            </button>
                        </form>

                        <div className="mt-6 text-center text-sm text-gray-400">
                            Link login akan dikirim ke email kamu.
                        </div>
                    </div>
                    
                    <div className="text-center mt-6">
                        <Link to="/admin-login" className="text-sm text-gray-400 hover:text-white hover:underline transition">
                            Login sebagai Admin
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

