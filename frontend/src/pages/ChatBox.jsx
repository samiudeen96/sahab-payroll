// import React from "react";
// import MessageInput from "../components/MessageInput";

// const ChatBox = ({ messages, onSend }) => {
//   return (
//     <div className="flex flex-col h-[calc(100vh-64px)] w-full">
//       {/* Messages */}
//       <div className="flex-1 overflow-y-auto px-2 sm:px-5 pt-4 sm:pt-5 h-[calc(100vh-168px)]">
//         <div className="max-w-2xl mx-auto h-full">
//           {messages && messages.length > 0 ? (
//             messages.map((msg, index) => (
//               <div
//                 key={index}
//                 className={`flex mb-2 ${
//                   msg.sender === "user" ? "justify-end" : "justify-start"
//                 }`}
//               >
//                 <div
//                   className={`px-4 py-2 rounded-lg max-w-[80%] sm:max-w-xs break-words ${
//                     msg.sender === "user"
//                       ? "bg-blue-500 text-white"
//                       : "bg-gray-300 text-gray-900"
//                   }`}
//                 >
//                   {msg.text}
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="h-full flex justify-center items-end pb-20">
//               <h1 className="text-xl sm:text-2xl font-semibold text-center">
//                 Hi, I'm Najm Co-Pilot
//               </h1>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Input */}
//       <div className="px-2 sm:px-5 py-4 border-t border-slate-300">
//         <div className="max-w-2xl mx-auto w-full">
//           <MessageInput onSend={onSend} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatBox;

import React from "react";
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
  return (
    <div className="chatbox w-full h-screen">
      <div className="chatbox-header">
        <Header
          messages={messages}
          handleNewChat={handleNewChat}
          chatSessions={chatSessions}
          handleSelectSession={handleSelectSession}
        />
      </div>

      <div className="flex-1 overflow-y-auto px-2 sm:px-5 pt-5  h-[calc(100vh-158px)]">
        {/* Messages */}
        <div className="max-w-2xl mx-auto h-full text-sm">
          {messages && messages.length > 0 ? (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`flex mb-5 ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div className="flex gap-1 items-end">
                  <div
                    className={`rounded-full bg-[#5257c8] p-2 ${
                      msg.sender === "user"
                        ? "hidden"
                        : ""
                    }`}
                  >
                    <img className="w-4 h-4 " src={bot} alt="" />
                  </div>
                  <div
                    className={`px-4 py-2 rounded-lg  break-words ${
                      msg.sender === "user"
                        ? "bg-[#5257c8] text-white"
                        : "bg-violet-200 text-gray-900"
                    }`}
                  >
                    {msg.text}
                  </div>
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
