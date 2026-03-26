import { useEffect, useState } from "react";
import { sendMessage, subscribeToMessages } from "../services/chat";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const unsubscribe = subscribeToMessages(setMessages);
    return () => unsubscribe();
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;
    await sendMessage(input);
    setInput("");
  };

  return (
    <div className="p-4">
      <div className="h-80 overflow-y-auto border mb-4 p-2">
        {messages.map((msg) => (
          <div key={msg.id}>{msg.text}</div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border p-2 flex-1"
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}