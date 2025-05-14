// src/components/games/WordSearchGame.jsx
import React, { useState } from 'react';

const WORDS = ['طالب', 'مدرسة', 'كتاب', 'قلم', 'مكتبة'];

// شبكة الحروف (8×10) وضعنا الكلمات بشكل أفقي أو عمودي
const GRID = [
  ['ط','ا','ل','ب','X','X','X','X','X','X'],
  ['X','X','X','ا','X','X','X','X','X','X'],
  ['م','د','ر','س','ة','X','X','X','X','X'],
  ['X','X','X','ا','X','X','X','X','X','X'],
  ['ك','ت','ا','ب','X','X','م','ك','ت','ب'],
  ['X','X','X','X','X','X','X','ت','ة','X'],
  ['ق','ل','م','X','X','X','X','X','X','X'],
  ['X','X','X','X','X','X','X','X','X','X']
];

export default function WordSearchGame() {
  const [guess, setGuess] = useState('');
  const [found, setFound] = useState([]);
  const [feedback, setFeedback] = useState(null);

  const handleSubmit = e => {
    e.preventDefault();
    const trimmed = guess.trim();
    if (!trimmed) return;
    if (WORDS.includes(trimmed) && !found.includes(trimmed)) {
      setFound(f => [...f, trimmed]);
      setFeedback({ ok: true, msg: `✔️ وجدتَ كلمة “${trimmed}”!` });
    } else if (found.includes(trimmed)) {
      setFeedback({ ok: false, msg: `لقد وجدتَ كلمة “${trimmed}” مسبقاً.` });
    } else {
      setFeedback({ ok: false, msg: `❌ “${trimmed}” ليست من الكلمات.` });
    }
    setGuess('');
  };

  return (
    <div
      className="min-h-screen p-6 bg-cover bg-center flex flex-col items-center"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      <h2 className="text-3xl font-bold text-white mb-6 drop-shadow-lg">
        لعبة البحث عن الكلمات
      </h2>

      {/* جدول الحروف */}
      <div className="grid grid-cols-10 gap-1 mb-6">
        {GRID.flat().map((char, idx) => (
          <div
            key={idx}
            className="w-8 h-8 flex items-center justify-center bg-white/70 text-lg font-medium"
          >
            {char}
          </div>
        ))}
      </div>

      {/* قائمة الكلمات */}
      <div className="flex flex-wrap justify-center gap-4 mb-6 max-w-xl">
        {WORDS.map(w => (
          <span
            key={w}
            className={`px-3 py-1 rounded-full text-white font-semibold ${
              found.includes(w) ? 'bg-green-600' : 'bg-blue-600'
            }`}
          >
            {w}
          </span>
        ))}
      </div>

      {/* إدخال التخمين */}
      <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
        <input
          type="text"
          value={guess}
          onChange={e => setGuess(e.target.value)}
          placeholder="اكتب كلمة وجدتها..."
          className="px-3 py-2 border rounded focus:outline-none"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          تحقق
        </button>
      </form>

      {feedback && (
        <p className={`mt-4 font-medium ${feedback.ok ? 'text-green-300' : 'text-red-300'}`}>
          {feedback.msg}
        </p>
      )}
    </div>
  );
}
