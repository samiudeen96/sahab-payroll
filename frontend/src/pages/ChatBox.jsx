import React, { useEffect, useState, useRef } from "react";
import Header from "../components/Header";
import MessageInput from "../components/MessageInput";
import bot from "../assets/bot.svg";

const ChatBox = ({
  messages,
  onSend,
  handleNewChat,
  chatSessions,
  handleSelectSession,
}) => {
  const [loadedMessages, setLoadedMessages] = useState([]);

  useEffect(() => {
    const savedLoaded = JSON.parse(localStorage.getItem("loadedMessages")) || [];
    setLoadedMessages(savedLoaded);
  }, []);

  const bottomRef = useRef(null);

useEffect(() => {
  if (bottomRef.current) {
    bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }
}, [messages]);

  
  useEffect(() => {
    messages.forEach((msg, index) => {
      if (!loadedMessages.includes(index) && msg.sender !== "user") {
        setTimeout(() => {
          setLoadedMessages((prev) => {
            const updated = [...prev, index];
            localStorage.setItem("loadedMessages", JSON.stringify(updated));
            return updated;
          });
        }, 800);
      }
    });
  }, [messages, loadedMessages]);
  

  return (
    <div className="chatbox w-full h-screen">
      <div className="chatbox-header ">
        <Header
          messages={messages}
          handleNewChat={handleNewChat}
          chatSessions={chatSessions}
          handleSelectSession={handleSelectSession}
        />
      </div>

      <div className="overflow-y-auto px-4 sm:px-5 pt-5 h-[calc(100vh-158px)] ">
        {/* Messages */}
        <div>
        <div className="max-w-2xl mx-auto h-full text-sm ">
          {messages && messages.length > 0 ? (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`flex mb-5 ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div className="flex gap-1 items-end">
                  {/* Bot icon */}
                  <div
                    className={`rounded-full bg-[#5257c8] p-2 max-w-8 max-h-8 ${
                      msg.sender === "user" ? "hidden" : ""
                    }`}
                  >
                    <img className="object-cover" src={bot} alt="Bot" />
                  </div>

                  {/* Message bubble */}
                  <div
                    className={`chat px-3 py-2 rounded-lg break-words ${
                      msg.sender === "user"
                        ? "bg-[#5257c8] text-white rounded-br-none"
                        : "bg-violet-200 text-gray-900 rounded-bl-none"
                    }`}
                  >
                    {msg.sender === "user" ? (
                      msg.text
                    ) : loadedMessages.includes(index) ? (
                      <span>{msg.text}</span>
                    ) : (
                      <div className="flex gap-[3px] items-center">
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                      </div>
                    )}
                  </div>
                  
                </div>
                <div ref={bottomRef} />
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
