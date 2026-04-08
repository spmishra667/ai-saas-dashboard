type MessageProps = {
  text: string;
  sender: "user" | "bot";
};

export default function MessageBubble({ text, sender }: MessageProps) {
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
            : "bg-gray-200 dark:bg-gray-700 dark:text-white"
        }`}
      >
        {text}
      </div>
    </div>
  );
}