// src/components/games/MatchSynonymGame.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function MatchSynonymGame() {
  // أمثلة بسيطة للمطابقة
  const pairs = [
    { id: 1, word: 'سعيد', synonym: 'فرحان' },
    { id: 2, word: 'كبير', synonym: 'ضخم' },
    { id: 3, word: 'صغير', synonym: 'صغير' },
    { id: 4, word: 'ذكي', synonym: 'فطن' },
  ];

  const [selected, setSelected] = useState({});
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleSelect = (id, value) => {
    setSelected(prev => ({ ...prev, [id]: value }));
  };

  const handleCheck = () => {
    let count = 0;
    pairs.forEach(p => {
      if (selected[p.id] === p.synonym) count++;
    });
    setCorrectCount(count);
    setFinished(true);
  };

  return (
    <div className="min-h-screen p-8 bg-cover bg-center" style={{ backgroundImage: "url('/bg.jpg')" }}>
      <div className="relative z-10 bg-white/70 backdrop-blur-md p-6 max-w-xl mx-auto rounded-lg">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">مطابقة المترادفات</h2>
        {!finished ? (
          <div className="space-y-4">
            {pairs.map(p => (
              <div key={p.id} className="flex justify-between items-center">
                <span className="text-lg text-gray-800">{p.word}</span>
                <select
                  value={selected[p.id] || ''}
                  onChange={e => handleSelect(p.id, e.target.value)}
                  className="border rounded p-1"
                >
                  <option value="">اختر مرادفًا</option>
                  {pairs.map(opt => (
                    <option key={opt.id} value={opt.synonym}>{opt.synonym}</option>
                  ))}
                </select>
              </div>
            ))}
            <button
              onClick={handleCheck}
              className="mt-4 px-4 py-2 bg-blue-800 text-white rounded"
            >تحقق</button>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-lg mb-2">لقد أجبت بصورة صحيحة على {correctCount} من {pairs.length}.</p>
            <Link to="/games" className="text-blue-800 underline">العودة إلى قائمة الألعاب</Link>
          </div>
        )}
      </div>
    </div>
  );
}
