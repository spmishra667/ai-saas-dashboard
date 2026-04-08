type MessageProps = {
  text: string;
  sender: "user" | "bot";
  time: String; // after adding time property
};

export default function MessageBubble({ text, sender, time }: MessageProps) {
  return (
    <div
      className={`flex ${
        sender === "user" ? "justify-end" : "justify-start"
      } mb-2`}
    >
      <div
        className={`px-4 py-2 rounded-lg max-w-xs ${
          sender === "user"
            ? "bg-blue-500 text-white"
            : "bg-gray-200"
        }`}
      >
        <p>{text}</p>
        <p className="text-xs text-gray-400 mt-1">{time}</p>
      </div>
    </div>
  );
}