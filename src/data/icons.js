// src/data/icons.js
import {
    PuzzlePieceIcon,
    BookOpenIcon,
    UserGroupIcon,
    MicrophoneIcon,
    ChatBubbleLeftEllipsisIcon
  } from "@heroicons/react/24/outline";
  
  export default [
    {
      label: "الألعاب اللغوية",
      path: "/games",
      Icon: PuzzlePieceIcon,
      color: "text-pink-500"
    },
    {
      label: "الدروس التفاعلية",
      path: "/lessons",
      Icon: BookOpenIcon,
      color: "text-purple-500"
    },
    {
      label: "المنتدى",
      path: "/forum",
      Icon: UserGroupIcon,
      color: "text-yellow-500"
    },
    {
      label: "الدردشة الصوتية",
      path: "/voice",
      Icon: MicrophoneIcon,
      color: "text-green-500"
    },
    {
      label: "الدردشة النصية",
      path: "/chat",
      Icon: ChatBubbleLeftEllipsisIcon,
      color: "text-blue-500"
    },
  ];
  