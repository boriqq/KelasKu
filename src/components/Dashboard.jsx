import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import CourseModal from './CourseModal';
import VideoPlayer from './VideoPlayer';
import toast, { Toaster } from 'react-hot-toast';

// Daftar kategori dan warnanya
const categories = [
  'Web Development', 'Mobile Development', 'Data Science', 'UI/UX Design',
  'Marketing', 'Business', 'Cybersecurity', 'Game Development',
  'AI & ML', 'Lainnya'
];

const categoryColors = {
  'Web Development': 'bg-blue-500', 'Mobile Development': 'bg-green-500',
  'Data Science': 'bg-purple-500', 'UI/UX Design': 'bg-pink-500',
  'Marketing': 'bg-orange-500', 'Business': 'bg-indigo-500',
  'Cybersecurity': 'bg-red-600', 'Game Development': 'bg-gray-600',
  'AI & ML': 'bg-teal-500', 'Lainnya': 'bg-gray-400'
};

export default function Dashboard({ user }) {
  const [courses, setCourses] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [submitting, setSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const fetchCourses = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      toast.error("Gagal memuat kursus");
    } else {
      setCourses(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Berhasil logout");
  };

  const handleAddClick = () => {
    setEditingCourse(null);
    setModalOpen(true);
  };

  const handleEditClick = (course) => {
    setEditingCourse(course);
    setModalOpen(true);
  };

  const handleSaveCourse = async (courseData) => {
    // Implementasi fungsi save (sama seperti sebelumnya)
    setSubmitting(true);
    if (courseData.id) {
      const { error } = await supabase.from("courses").update(courseData).eq("id", courseData.id);
      if (error) toast.error("Gagal mengupdate kursus");
      else {
        toast.success("Kursus berhasil diupdate!");
        fetchCourses();
      }
    } else {
      const { error } = await supabase.from("courses").insert([{ ...courseData, user_id: user.id }]);
      if (error) toast.error("Gagal menambah kursus");
      else {
        toast.success("Kursus berhasil ditambahkan!");
        fetchCourses();
      }
    }
    setSubmitting(false);
    setModalOpen(false);
  };

  const handleDeleteCourse = async (courseId) => {
    // Implementasi fungsi delete (sama seperti sebelumnya)
    if (!window.confirm("Yakin mau hapus kursus ini?")) return;
    const { error } = await supabase.from("courses").delete().eq("id", courseId);
    if (error) toast.error("Gagal menghapus kursus");
    else {
      toast.success("Kursus berhasil dihapus");
      fetchCourses();
    }
  };

  const filteredCourses = courses.filter(course =>
    (course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     course.description.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (selectedCategory === 'All' || course.category === selectedCategory)
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Toaster position="top-right" />
      
      {/* Header */}
      <header className="sticky top-0 bg-gray-900/80 backdrop-blur-sm p-4 z-10 border-b border-gray-700">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">🎓 KelasKu Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-300 hidden sm:block">Hai, <strong>{user.email}</strong></span>
            <button
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md transition"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="p-8 max-w-7xl mx-auto">
        {/* Kontrol: Search dan Tambah */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="🔍 Cari kursus..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 pl-10 rounded-md bg-gray-800 border border-gray-700"
            />
          </div>
          {/* <button
            className="bg-green-500 hover:bg-green-600 text-white py-3 px-5 rounded-md transition flex-shrink-0"
            onClick={handleAddClick}
          >
            + Tambah Kursus
          </button> */}
        </div>

        {/* Filter Kategori */}
        <div className="mb-8 overflow-x-auto pb-2">
          <div className="flex space-x-2">
            <button onClick={() => setSelectedCategory('All')} className={`px-4 py-1 rounded-full text-sm ${selectedCategory === 'All' ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}>All</button>
            {categories.map(cat => (
              <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-4 py-1 rounded-full text-sm whitespace-nowrap ${selectedCategory === cat ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Daftar Kursus */}
        {loading ? (
          <div className="text-center p-10"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div></div>
        ) : filteredCourses.length === 0 ? (
          <div className="text-center text-gray-400 mt-12"><p>Tidak ada kursus yang ditemukan.</p></div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <div key={course.id} className="bg-gray-800 rounded-xl shadow-lg flex flex-col">
                <div className="p-6 flex-grow">
                    <VideoPlayer videoUrl={course.video_url} />
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-bold">{course.title}</h2>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full text-white ${categoryColors[course.category] || 'bg-gray-400'}`}>
                      {course.category}
                    </span>
                  </div>
                  <p className="text-gray-300 mb-4 text-sm">{course.description}</p>
                </div>
                <div className="p-6 pt-0">
                  
                  {course.user_id === user?.id && (
                    <div className="flex gap-2 mt-4">
                      <button onClick={() => handleEditClick(course)} className="bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-3 rounded text-sm">Edit</button>
                      <button onClick={() => handleDeleteCourse(course.id)} className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded text-sm">Hapus</button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <CourseModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveCourse}
        course={editingCourse}
        submitting={submitting}
        categories={categories}
      />
    </div>
  );
}