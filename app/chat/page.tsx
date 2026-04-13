"use client";
import { useState, useEffect, useRef } from "react";
import MessageBubble from "@/components/MessageBubble";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

export default function Chat() {
  const [messages, setMessages] = useState<
    { text: string; sender: "user" | "bot"; time: string }[]
  >([]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem("chat");
    if (saved) {
      setMessages(JSON.parse(saved));
    }
  }, []);

  // Save to local storage
  useEffect(() => {
    localStorage.setItem("chat", JSON.stringify(messages));
  }, [messages]);

  // Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getTime = () => {
    return new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userInput = input;
    const time = getTime();

    const userMessage = {
      text: userInput,
      sender: "user" as const,
      time,
    };

    const typingMessage = {
      text: "AI is typing...",
      sender: "bot" as const,
      time,
    };

    // Show user + typing
    setMessages((prev) => [...prev, userMessage, typingMessage]);
    setInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userInput }),
      });

      const data = await res.json();

      const botMessage = {
        text: data.reply || "No response",
        sender: "bot" as const,
        time: getTime(),
      };

      // Replace typing with actual response
      setMessages((prev) => {
        const updated = prev.slice(0, -1);
        return [...updated, botMessage];
      });

    } catch (error) {
      const errorMessage = {
        text: "Something went wrong",
        sender: "bot" as const,
        time: getTime(),
      };

      setMessages((prev) => {
        const updated = prev.slice(0, -1);
        return [...updated, errorMessage];
      });
    }
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

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
            className="flex-1 border rounded px-3 py-2"
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