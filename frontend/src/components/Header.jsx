import React, { useState } from "react";
import assets from "../assets";
import Sidebar from "../components/Sidebar";

const Header = ({ messages, handleNewChat, chatSessions, handleSelectSession }) => {
  const [visible, setVisible] = useState(false);

  return (
    <header className="bg-white p-4 flex justify-between items-center sticky top-0">
      <h1 className="text-xl font-semibold">Najm Co-Pilot</h1>
      <div className="flex items-center gap-5">
        <button>
          <img className="h-5 w-5" src={assets.bell} alt="" />
        </button>
        <button>
          <img className="h-5 w-5" src={assets.globe} alt="" />
        </button>
        <img src={assets.avatar} alt="" />
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt=""
        />
      </div>
      {/* mobile menu */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            className="flex items-center gap-3 p-3"
            onClick={() => setVisible(false)}
          >
            <img src={assets.dropdown_icon} className="rotate-180 h-4" alt="" />
            <p>Back</p>
          </div>
          <Sidebar
            onNewChat={handleNewChat}
            sessions={chatSessions}
            onSelectSession={handleSelectSession}
            chatHistory={messages}
            setVisible ={setVisible}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
