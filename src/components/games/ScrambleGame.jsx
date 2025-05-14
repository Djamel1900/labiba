// src/components/games/ScrambleGame.jsx
import React, { useState, useEffect } from 'react';

const WORDS = [
  'طالب',
  'مدرسة',
  'كتاب',
  'قلم',
  'مكتبة',
  'مدرس',
  'معلّم',
  'سبورة',
  'دفتر',
  'مصحف'
];

// دالة لخلط حروف الكلمة
function scramble(word) {
  const arr = word.split('');
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join('');
}

export default function ScrambleGame() {
  const [original, setOriginal] = useState('');
  const [scrambled, setScrambled] = useState('');
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState(null);

  // اختر كلمة عشوائية عند التحميل أو عند الضغط على "التالي"
  const pickWord = () => {
    const word = WORDS[Math.floor(Math.random() * WORDS.length)];
    setOriginal(word);
    setScrambled(scramble(word));
    setGuess('');
    setFeedback(null);
  };

  useEffect(() => {
    pickWord();
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    if (guess.trim() === original) {
      setFeedback({ ok: true, msg: 'صحيح! 👍' });
    } else {
      setFeedback({ ok: false, msg: `خطأ… الإجابة الصحيحة: ${original}` });
    }
  };

  return (
    <div
      className="min-h-screen p-6 bg-cover bg-center flex flex-col items-center"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      <h2 className="text-3xl font-bold text-white mb-6 drop-shadow-lg">
        لعبة تركيب الكلمات
      </h2>

      <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 w-full max-w-md text-center mb-6">
        <p className="text-2xl font-semibold mb-4">كلمة مبعثرة:</p>
        <p className="text-4xl font-bold mb-4">{scrambled}</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={guess}
            onChange={e => setGuess(e.target.value)}
            placeholder="أعد تشكيل الكلمة هنا..."
            className="w-full px-3 py-2 border rounded focus:outline-none"
          />
          <div className="flex justify-between">
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              تحقق
            </button>
            <button
              type="button"
              onClick={pickWord}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              التالي
            </button>
          </div>
        </form>

        {feedback && (
          <p
            className={`mt-4 font-medium ${
              feedback.ok ? 'text-green-700' : 'text-red-700'
            }`}
          >
            {feedback.msg}
          </p>
        )}
      </div>
    </div>
  );
}
