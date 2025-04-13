import React from "react";
import MessageInput from "../components/MessageInput";

const ChatBox = ({ messages, onSend }) => {
  return (
    <div className="flex flex-col h-[calc(100vh-64px)] w-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-2 sm:px-5 pt-4 sm:pt-5 h-[calc(100vh-168px)]">
        <div className="max-w-2xl mx-auto h-full">
          {messages && messages.length > 0 ? (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`flex mb-2 ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-lg max-w-[80%] sm:max-w-xs break-words ${
                    msg.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 text-gray-900"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))
          ) : (
            <div className="h-full flex justify-center items-end pb-20">
              <h1 className="text-xl sm:text-2xl font-semibold text-center">
                Hi, I'm Najm Co-Pilot
              </h1>
            </div>
          )}
        </div>
      </div>

      {/* Input */}
      <div className="px-2 sm:px-5 py-4 border-t border-slate-300">
        <div className="max-w-2xl mx-auto w-full">
          <MessageInput onSend={onSend} />
        </div>
      </div>
    </div>
  );
};

export default ChatBox;

