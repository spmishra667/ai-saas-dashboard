"use client";
import { useState, useEffect, useRef } from "react";
import MessageBubble from "@/components/MessageBubble";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";


export default function Chat() {
  const [messages, setMessages] = useState<
    { text: string; sender: "user" | "bot"; time: String}[] // after adding time property
  >([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false); // after adding this features
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

const getTime = () => {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const handleSend = () => {
  if (!input.trim()) return;

  const time = getTime();

  const userMessage = {
    text: input,
    sender: "user" as const,
    time,
  };

  const typingMessage = {
    text: "AI is typing...",
    sender: "bot" as const,
    time,
  };

  setMessages((prev) => [...prev, userMessage, typingMessage]);
  setInput("");

  setTimeout(() => {
    const botMessage = {
      text: "This is a demo AI response",
      sender: "bot" as const,
      time: getTime(),
    };

    setMessages((prev) => {
      const updated = prev.slice(0, -1);
      return [...updated, botMessage];
    });
  }, 1000);
};

  return (
    <div className="flex">

      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        {isTyping && (
  <p className="text-gray-500 text-sm">AI is typing...</p>
)}

        {/* Chat Area */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.map((msg, index) => (
            <MessageBubble
              key={index}
              text={msg.text}
              sender={msg.sender}
              time={msg.time}
            />
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t flex gap-2">
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