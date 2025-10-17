import React, { useState, useEffect } from "react";

const CATEGORIES = [
  "Web Development",
  "Mobile Development",
  "Data Science",
  "UI/UX Design",
  "Digital Marketing",
  "Programming",
  "Database",
  "DevOps",
  "Cybersecurity",
  "Lainnya"
];

export default function CourseModal({ isOpen, onClose, onSave, course, submitting }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [category, setCategory] = useState("Web Development");

  useEffect(() => {
    if (course) {
      setTitle(course.title);
      setDescription(course.description);
      setVideoUrl(course.video_url);
      setCategory(course.category || "Web Development");
    } else {
      setTitle("");
      setDescription("");
      setVideoUrl("");
      setCategory("Web Development");
    }
  }, [course, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ 
      id: course?.id, 
      title, 
      description, 
      video_url: videoUrl,
      category 
    });
    
    setTitle("");
    setDescription("");
    setVideoUrl("");
    setCategory("Web Development");
    onClose();
  };

  const handleClose = () => {
    setTitle("");
    setDescription("");
    setVideoUrl("");
    setCategory("Web Development");
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn"
      onClick={handleClose}
    >
      <div 
        className="bg-gray-800 text-white rounded-lg p-6 w-full max-w-md shadow-2xl transform transition-all max-h-screen overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-semibold mb-4">
          {course ? "✏️ Edit Kursus" : "➕ Tambah Kursus"}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Judul Kursus</label>
            <input
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none transition"
              placeholder="Contoh: Belajar React dari Nol"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              disabled={submitting}
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Kategori</label>
            <select
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none transition"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              disabled={submitting}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Deskripsi</label>
            <textarea
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none transition h-24 resize-none"
              placeholder="Jelaskan tentang kursus ini..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              disabled={submitting}
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Link Video</label>
            <input
              type="url"
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:border-blue-500 focus:outline-none transition"
              placeholder="https://youtube.com/watch?v=..."
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              required
              disabled={submitting}
            />
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button 
              type="button" 
              className="bg-gray-600 hover:bg-gray-700 py-2 px-4 rounded transition disabled:opacity-50" 
              onClick={handleClose}
              disabled={submitting}
            >
              Batal
            </button>
            <button 
              type="submit" 
              className="bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded transition disabled:opacity-50 flex items-center gap-2"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                  <span>Menyimpan...</span>
                </>
              ) : (
                <span>{course ? "💾 Simpan" : "➕ Tambah"}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}