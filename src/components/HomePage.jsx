// src/components/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import {
  ChatBubbleOvalLeftIcon,
  MicrophoneIcon,
  UserGroupIcon,
  BookOpenIcon,
  PuzzlePieceIcon,
} from '@heroicons/react/24/outline';

export default function HomePage() {
  const pages = [
    { title: 'الدردشة النصية',    path: '/text-chat',  Icon: ChatBubbleOvalLeftIcon },
    { title: 'الدردشة الصوتية',    path: '/voice-chat', Icon: MicrophoneIcon     },
    { title: 'المنتدى',            path: '/forum',      Icon: UserGroupIcon     },
    { title: 'الدروس التفاعلية',    path: '/lessons',    Icon: BookOpenIcon      },
    { title: 'الألعاب اللغوية',     path: '/games',      Icon: PuzzlePieceIcon   },
  ];

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      <div className="relative z-10 flex flex-col items-center p-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-red-800 mb-8 drop-shadow bg-white/50 p-4 rounded">
          مرحباً بكم في منصة لبيبة
        </h1>

        {/* أيقونات في صف واحد */}
        <div className="flex justify-center gap-8 w-full max-w-5xl">
          {pages.map(({ title, path, Icon }) => (
            <Link
              key={path}
              to={path}
              className="group bg-white/20 backdrop-blur-lg rounded-xl p-6 flex flex-col items-center hover:bg-white/30 transition"
            >
              {/* نلفّ الأيقونة داخل هذه الحاوية ثلاثية الأبعاد */}
<div className="icon-3d mb-4 inline-flex items-center justify-center">
  <Icon className="w-8 h-8 text-white" />
</div>

              <span className="text-xl sm:text-2xl font-semibold text-blue-800 drop-shadow">
                {title}
              </span>
            </Link>
          ))}
        </div>

        {/* جملة تعريفية أسفل الأيقونات */}
        <p className="mt-8 text-center text-blue-800 text-2xl max-w-2xl leading-relaxed bg-white/50 backdrop-blur-md p-6 rounded-lg drop-shadow-md">
          منصة لبيبة: هي بيئة تعليمية تفاعلية تعزز مهارات اللغة العربية عبر دروس قصيرة، دردشة نصية وصوتية مدعومة بالذكاء الاصطناعي، منتدى للتعاون، وألعاب لغوية ترفيهية متوافقة مع منهج الصف الخامس.
        </p>
      </div>
    </div>
  );
}
