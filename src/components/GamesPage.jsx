// src/components/GamesPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import {
  PuzzlePieceIcon,
  PencilSquareIcon,
  LinkIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';

export default function GamesPage() {
  const games = [
    {
      title: 'تركيب الكلمات',
      description: 'رتّب الأحرف لتكوين الكلمة المطلوبة.',
      path: '/games/scramble',
      Icon: PuzzlePieceIcon,
    },
    {
      title: 'الجملة الناقصة',
      description: 'اختر الكلمة المناسبة لإكمال الفراغ في الجملة.',
      path: '/games/fill-blank',
      Icon: PencilSquareIcon,
    },
    {
      title: 'مطابقة المترادفات',
      description: 'اصِل بين كل كلمة وكلمتها ذات المعنى نفسه.',
      path: '/games/match-synonym',
      Icon: LinkIcon,
    },
    {
      title: 'البحث عن الكلمات',
      description: 'ابحث وعلّم الكلمات المطلوبة داخل شبكة الأحرف.',
      path: '/games/word-search',
      Icon: MagnifyingGlassIcon,
    },
  ];

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      <div className="relative z-10 p-8">
        <h2 className="text-4xl font-bold text-white text-center mb-8 drop-shadow-lg">
          الألعاب اللغوية
        </h2>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto p-4">
          {games.map(({ title, description, path, Icon }) => (
            <Link
              key={path}
              to={path}
              className="relative flex flex-col items-center justify-center text-center overflow-hidden rounded-2xl bg-white/70 backdrop-blur-md hover:bg-white/80 hover:backdrop-blur-sm transition-all duration-200 p-6"
            >
              {/* غطاء تدرّج خفيف لرفع التباين */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/5 pointer-events-none"></div>

              <div className="relative z-10 flex flex-col items-center">
                <Icon className="w-16 h-16 mb-4 text-blue-800" />
                <h3 className="text-xl font-bold text-blue-800 mb-2">
                  {title}
                </h3>
                <p className="text-sm text-blue-800/90">
                  {description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
