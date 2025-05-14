// src/components/ForumPage.jsx
import React, { useState } from 'react';

export default function ForumPage() {
  const [posts, setPosts] = useState([
    { id: 1, author: 'أحمد', text: 'مرحبا، كيف أستخدم قسم الألعاب؟' },
    { id: 2, author: 'سارة', text: 'هل توجد دروس تفاعلية عن الإملاء؟' },
  ]);
  const [newPost, setNewPost] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!newPost.trim()) return;
    setPosts(p => [
      ...p,
      { id: Date.now(), author: 'أنت', text: newPost.trim() }
    ]);
    setNewPost('');
  };

  return (
    <div className="min-h-screen p-8 bg-white">
      <h2 className="text-3xl font-bold mb-6 text-blue-800">منتدى لبيّة</h2>

      {/* قائمة المشاركات */}
      <div className="space-y-4 mb-8">
        {posts.map(post => (
          <div key={post.id} className="p-4 border rounded-lg">
            <p className="text-gray-800 mb-2">{post.text}</p>
            <span className="text-sm text-gray-500">— {post.author}</span>
          </div>
        ))}
      </div>

      {/* إضافة مشاركة جديدة */}
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
        <textarea
          value={newPost}
          onChange={e => setNewPost(e.target.value)}
          rows={3}
          className="w-full p-2 border rounded mb-4"
          placeholder="اكتب سؤالك أو تعليقك هنا..."
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          نشر في المنتدى
        </button>
      </form>
    </div>
  );
}
