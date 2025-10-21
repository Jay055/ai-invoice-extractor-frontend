import React, { useState } from "react";
import ChatPlayground from "./components/ChatPlayground";
import InvoiceExtractor from "./components/InvoiceExtractor";

type TabKey = "chat" | "invoice";

export default function App() {
  const [tab, setTab] = useState<TabKey>("chat");

  return (
    <div>
      <h1>AI Invoice Extractor</h1>

      <div style={{ marginBottom: 20 }}>
        <button onClick={() => setTab("chat")}>Chat Playground</button>
        <button onClick={() => setTab("invoice")}>Invoice Extractor</button>
      </div>

      {tab === "chat" ? <ChatPlayground /> : <InvoiceExtractor />}
    </div>
  );
}


