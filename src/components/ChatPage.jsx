// src/components/ChatPage.jsx
import React, { useState } from 'react';

export default function ChatPage() {
  const [msg, setMsg] = useState("");
  const [conv, setConv] = useState([]);
  const [err, setErr] = useState(null);

  const send = async () => {
    if (!msg.trim()) return;
    setConv((c) => [...c, { role: "user", content: msg }]);
    setErr(null);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg })
      });
      if (!res.ok) throw new Error(res.status);
      const { reply } = await res.json();
      setConv((c) => [...c, { role: "assistant", content: reply }]);
    } catch {
      setErr("حدث خطأ في الاتصال، حاول مرة أخرى.");
    }
    setMsg("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-white">
      <h2 className="text-3xl font-bold mb-6 text-blue-800">الدردشة النصّية</h2>

      <div className="w-full max-w-xl flex-1 overflow-auto space-y-4 mb-6">
        {conv.map((m, i) => (
          <div
            key={i}
            className={`p-3 rounded-lg max-w-[80%] ${
              m.role === "user"
                ? "bg-blue-100 self-end text-right"
                : "bg-gray-200 self-start text-left"
            }`}
          >
            {m.content}
          </div>
        ))}
      </div>

      {err && <p className="text-red-600 mb-4">⚠️ {err}</p>}

      <div className="w-full max-w-xl flex">
        <input
          type="text"
          className="flex-1 p-2 border border-gray-300 rounded-l-lg"
          placeholder="اكتب رسالتك..."
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
        />
        <button
          onClick={send}
          className="px-4 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition"
        >
          إرسال
        </button>
      </div>
    </div>
  );
}
