// src/components/LessonsPage.jsx
import React, { useState } from 'react';

const lessonsData = [
  {
    id: 1,
    title: 'الدرس 1: الجملة الاسمية',
    text: `
      الجملة الاسمية تبدأ باسم وهي تتكون من ركنين أساسيين: مبتدأ وخبر.
      مثال: الطالبُ مجتهدٌ.
    `,
    question: 'ما هو المبتدأ في الجملة السابقة؟',
    answer: 'الطالبُ'
  },
  {
    id: 2,
    title: 'الدرس 2: الجملة الفعلية',
    text: `
      الجملة الفعلية تبدأ بفعل، ولها أركان: فعل وفاعل.
      مثال: قرأَ المعلمُ الدرسَ.
    `,
    question: 'ما هو الفعل في الجملة السابقة؟',
    answer: 'قرأَ'
  },
  {
    id: 3,
    title: 'الدرس 3: المفعول به',
    text: `
      المفعول به هو الاسم الذي يقع عليه فعل الفاعل.
      مثال: كتبَ الطالبُ الدرسَ.
    `,
    question: 'ما هو المفعول به في الجملة السابقة؟',
    answer: 'الدرسَ'
  },
];

export default function LessonsPage() {
  const [current, setCurrent] = useState(lessonsData[0]);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);

  const handleSubmit = e => {
    e.preventDefault();
    setFeedback(
      userAnswer.trim() === current.answer
        ? { correct: true, msg: 'إجابة صحيحة! 👍' }
        : { correct: false, msg: `خطأ، الإجابة الصحيحة: ${current.answer}` }
    );
  };

  return (
    <div
      className="min-h-screen p-6 bg-cover bg-center"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      <h2 className="text-3xl font-bold text-white text-center mb-6">
        الدروس التفاعلية
      </h2>

      {/* قوائم الدروس */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {lessonsData.map(lesson => (
          <button
            key={lesson.id}
            onClick={() => {
              setCurrent(lesson);
              setUserAnswer('');
              setFeedback(null);
            }}
            className={`px-4 py-2 rounded ${
              lesson.id === current.id
                ? 'bg-green-500 text-white'
                : 'bg-white text-gray-800'
            }`}
          >
            {lesson.title}
          </button>
        ))}
      </div>

      {/* عرض الدرس */}
      <div className="max-w-2xl mx-auto bg-white bg-opacity-90 p-6 rounded shadow">
        <h3 className="text-xl font-semibold mb-4">{current.title}</h3>
        <p className="mb-6 whitespace-pre-line">{current.text}</p>

        {/* السؤال والإجابة */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="font-medium">{current.question}</span>
            <input
              type="text"
              value={userAnswer}
              onChange={e => setUserAnswer(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border rounded"
              placeholder="اكتب إجابتك هنا..."
            />
          </label>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            تحقق من الإجابة
          </button>
        </form>

        {/* ملاحظات صح/خطأ */}
        {feedback && (
          <p
            className={`mt-4 font-medium ${
              feedback.correct ? 'text-green-700' : 'text-red-700'
            }`}
          >
            {feedback.msg}
          </p>
        )}
      </div>
    </div>
  );
}
