"use client";
import { useState, useEffect, useRef } from "react";
import MessageBubble from "@/components/MessageBubble";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";


export default function Chat() {
  const [messages, setMessages] = useState<
    { text: string; sender: "user" | "bot" }[]
  >([]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
  const saved = localStorage.getItem("chat");
  if (saved) {
    setMessages(JSON.parse(saved));
  }
}, []);

useEffect(() => {
  localStorage.setItem("chat", JSON.stringify(messages));
}, [messages]);

useEffect(() => {
  bottomRef.current?.scrollIntoView({ behavior: "smooth" });
}, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" as const };
    const botMessage = {
      text: "This is a demo AI response",
      sender: "bot" as const,
    };

    setMessages([...messages, userMessage, botMessage]);
    setInput("");
  };

  return (
    <div className="flex">

      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        {/* Chat Area */}
        <div className="flex-1 p-6 overflow-y-auto">
          {messages.map((msg, index) => (
            <MessageBubble
              key={index}
              text={msg.text}
              sender={msg.sender}
            />
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input Area */}
        <div className="flex-1 border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}

            onKeyDown={(e) => {
  if (e.key === "Enter") handleSend();
}}

            placeholder="Type a message..."
            className="flex-1 p-6 overflow-y-auto space-y-2"
          />
          <button
            onClick={handleSend}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Send
          </button>
        </div>

      </div>
    </div>
  );
}