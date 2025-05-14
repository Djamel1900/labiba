// src/components/VoiceChatPage.jsx
import React, { useState, useEffect, useRef } from 'react';

export default function VoiceChatPage() {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [conversation, setConversation] = useState([]);
  const [error, setError] = useState(null);
  const [micAvailable, setMicAvailable] = useState(true);
  const recognitionRef = useRef(null);

  // 1) نتحقق من وجود مدخل صوتي (ميكروفون)
  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
      navigator.mediaDevices.enumerateDevices()
        .then(devices => {
          const hasMic = devices.some(d => d.kind === 'audioinput');
          setMicAvailable(hasMic);
          if (!hasMic) {
            setError('لا يوجد ميكروفون متصل بهذا الجهاز.');
          }
        })
        .catch(() => {
          // إن تعذّر الفحص، نفترض أن الميكروفون غير متاح
          setMicAvailable(false);
          setError('تعذّر التحقق من وجود ميكروفون.');
        });
    }
  }, []);

  useEffect(() => {
    if (!micAvailable) return; // لا نُنشئ SpeechRecognition إذا لم يكن هناك ميكروفون

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError('متصفحك لا يدعم تحويل الصوت إلى نص');
      return;
    }

    const recog = new SpeechRecognition();
    recog.continuous = false;
    recog.interimResults = false;
    recog.maxAlternatives = 1;
    recog.lang = 'ar-SA';
    recognitionRef.current = recog;

    recog.onresult = event => {
      const text = event.results[0][0].transcript.trim();
      setTranscript(text);
      handleSend(text);
    };

    recog.onerror = event => {
      console.error('SpeechRecognition error:', event.error);
      switch (event.error) {
        case 'not-allowed':
          setError('لم تسمح باستخدام الميكروفون. تأكد من الأذونات.');
          break;
        case 'no-speech':
          setError('لم يُلتقط أي كلام. حاول التحدّث بوضوح.');
          break;
        default:
          setError('خطأ في التعرف على الصوت: ' + event.error);
      }
      setListening(false);
    };

    recog.onend = () => {
      setListening(false);
    };
  }, [micAvailable]);

  const handleListenToggle = () => {
    if (!recognitionRef.current) return;
    if (!listening) {
      setTranscript('');
      setError(null);
      try {
        recognitionRef.current.start();
        setListening(true);
      } catch {
        setError('تعذّر بدء التعرف على الصوت.');
      }
    } else {
      recognitionRef.current.stop();
      setListening(false);
    }
  };

  const handleSend = async text => {
    setConversation(c => [...c, { role: 'user', content: text }]);
    try {
      const res = await fetch('/api/voice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });
      if (!res.ok) throw new Error(res.status);
      const { reply } = await res.json();
      setConversation(c => [...c, { role: 'assistant', content: reply }]);
      const u = new SpeechSynthesisUtterance(reply);
      u.lang = 'ar-SA';
      window.speechSynthesis.speak(u);
    } catch {
      setError('حدث خطأ في الاتصال. حاول مرة أخرى.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-100 p-4 space-y-4">
      <h2 className="text-3xl font-bold">الدردشة الصوتية</h2>

      {/* 2) زر التحدث مع تعطيله وإخفائه عند عدم وجود ميكروفون */}
      <button
        onClick={handleListenToggle}
        disabled={!micAvailable}
        className={`p-4 rounded-full shadow-lg 
          ${!micAvailable ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : listening ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}
      >
        { !micAvailable
          ? 'ميكروفون غير متاح'
          : listening
            ? '🛑 إيقاف الاستماع'
            : '🎤 اضغط للتحدث'
        }
      </button>

      {transcript && (
        <div className="w-full max-w-xl bg-blue-100 p-3 rounded">
          <strong>سمعتك:</strong> {transcript}
        </div>
      )}

      {error && (
        <div className="w-full max-w-xl text-red-600">
          ⚠️ {error}
        </div>
      )}

      <div
        className="w-full max-w-xl bg-white p-4 rounded shadow space-y-2 overflow-auto"
        style={{ maxHeight: '300px' }}
      >
        {conversation.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded ${msg.role === 'user' ? 'bg-blue-100 text-right' : 'bg-gray-200 text-left'}`}
          >
            {msg.content}
          </div>
        ))}
      </div>
    </div>
  );
}
