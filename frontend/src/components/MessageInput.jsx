import React, { useState } from "react";

const MessageInput = ({ onSend }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSend(message);
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center w-full px-2">
      <div className="bg-[#2b2b2b] rounded-xl flex items-center px-4 py-3 w-full max-w-2xl">
        <input
          type="text"
          placeholder="Ask anything"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 bg-transparent text-white outline-none placeholder-gray-400 text-base sm:text-lg"
        />
        <button
          type="submit"
          className="ml-3 px-4 py-2 bg-white text-black rounded-lg hover:scale-105 transition text-sm sm:text-base cursor-pointer"
        >
          Send
        </button>
      </div>
    </form>
  );
};

export default MessageInput;
