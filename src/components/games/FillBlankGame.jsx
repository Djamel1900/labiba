// src/components/games/FillBlankGame.jsx
import React, { useState } from 'react';

const SENTENCES = [
  {
    id: 1,
    sentence: 'الطالبُ ___ الكتابَ.',
    blankAnswer: 'قرأَ'
  },
  {
    id: 2,
    sentence: 'تذهبُ فاطمةُ إلى ___.',
    blankAnswer: 'المدرسة'
  },
  {
    id: 3,
    sentence: 'الجوُّ اليوم ___.',
    blankAnswer: 'جميلٌ'
  },
  {
    id: 4,
    sentence: 'كتبَ المعلمُ ___ الدرسَ.',
    blankAnswer: 'على'
  },
  {
    id: 5,
    sentence: 'نشاهدُ ___ في التلفازِ.',
    blankAnswer: 'الخبرَ'
  }
];

export default function FillBlankGame() {
  const [current, setCurrent] = useState(SENTENCES[0]);
  const [input, setInput]     = useState('');
  const [feedback, setFeedback] = useState(null);

  const pickSentence = () => {
    const choice = SENTENCES[Math.floor(Math.random() * SENTENCES.length)];
    setCurrent(choice);
    setInput('');
    setFeedback(null);
  };

  const handleCheck = e => {
    e.preventDefault();
    if (input.trim() === current.blankAnswer) {
      setFeedback({ ok: true, msg: 'إجابة صحيحة! 👍' });
    } else {
      setFeedback({ ok: false, msg: `خطأ… الإجابة الصحيحة: ${current.blankAnswer}` });
    }
  };

  return (
    <div
      className="min-h-screen p-6 bg-cover bg-center flex flex-col items-center"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      <h2 className="text-3xl font-bold text-white mb-6 drop-shadow-lg">
        لعبة الجملة الناقصة
      </h2>

      <div className="bg-white/80 backdrop-blur-md rounded-xl p-6 w-full max-w-lg text-center mb-6">
        <p className="text-2xl mb-4 whitespace-pre-line">{current.sentence}</p>

        <form onSubmit={handleCheck} className="flex flex-col space-y-4">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="أكمل الفراغ هنا..."
            className="px-3 py-2 border rounded focus:outline-none"
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
              onClick={pickSentence}
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
