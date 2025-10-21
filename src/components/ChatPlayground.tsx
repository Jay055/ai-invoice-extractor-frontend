import React, { useState } from "react";

type ChatMessage = {
  user: string;
  bot: string;
};

const API_URL = import.meta.env.VITE_API_URL
if (!API_URL) {
  throw new Error('VITE_API_URL is not set')
}
export default function ChatPlayground() {
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const handleSend = async () => {
    const body = {
      model: "moonshotai/kimi-k2:free",
      messages: [{ role: "user", content: input }],
    };
    const res = await fetch(`${API_URL}/v1/chat/completions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    const reply = data?.choices?.[0]?.message?.content ?? "No response";
    setMessages([...messages, { user: input, bot: reply }]);
    setInput("");
  };

  return (
    <div>
      <h2>Chat Playground</h2>
      <textarea
        rows={3}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
        style={{ width: "100%" }}
      />
      <button onClick={handleSend}>Send</button>

      {messages.map((m, i) => (
        <div key={i} style={{ marginTop: 10 }}>
          <b>You:</b> {m.user}
          <br />
          <b>AI:</b> {m.bot}
        </div>
      ))}
    </div>
  );
}


