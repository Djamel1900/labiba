// src/components/NavBar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  ChatBubbleLeftIcon,
  MicrophoneIcon,
  UsersIcon,
  BookOpenIcon,
  PuzzlePieceIcon as PuzzleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';

export default function NavBar() {
  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded hover:bg-white/20 transition ${
      isActive ? 'bg-white/30' : ''
    }`;

  return (
    <nav className="flex items-center justify-center space-x-4 bg-transparent text-white p-4">
      <NavLink to="/"      className={linkClass}>الرئيسية</NavLink>
      <NavLink to="/chat"  className={linkClass}>
        <ChatBubbleLeftIcon className="w-5 h-5 inline mb-0.5 mr-1" />
        دردشة نصية
      </NavLink>
      <NavLink to="/voice" className={linkClass}>
        <MicrophoneIcon className="w-5 h-5 inline mb-0.5 mr-1" />
        دردشة صوتية
      </NavLink>
      <NavLink to="/forum" className={linkClass}>
        <UsersIcon className="w-5 h-5 inline mb-0.5 mr-1" />
        المنتدى
      </NavLink>
      <NavLink to="/about" className={linkClass}>
        <InformationCircleIcon className="w-5 h-5 inline mb-0.5 mr-1" />
        التعريف
      </NavLink>
      <NavLink to="/lessons" className={linkClass}>
        <BookOpenIcon className="w-5 h-5 inline mb-0.5 mr-1" />
        الدروس
      </NavLink>
      {/* هنا أضفنا قسم الألعاب اللغوية */}
      <NavLink to="/games" className={linkClass}>
        <PuzzleIcon className="w-5 h-5 inline mb-0.5 mr-1" />
        الألعاب اللغوية
      </NavLink>
    </nav>
  );
}
