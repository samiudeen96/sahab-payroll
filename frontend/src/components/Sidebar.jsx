import React, { useState } from "react";
import { Link } from "react-router-dom";
import assets from "../assets/index.js";

const Sidebar = ({ onNewChat, chatHistory, setVisible }) => {
  const [open, setOpen] = useState(null);

  const handleToggle = (index) => {
    setOpen(open === index ? null : index); 
  };

  return (
    <aside className="sm:w-80 bg-white sm:shadow-md p-4 flex flex-col text-sm">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2 items-center">
          <img src={assets.logo} alt="logo" className="w-9 h-9 object-contain" />
          <div className="text-lg font-semibold">
            Sahab <span className="text-[#666666]">Payroll</span>
          </div>
        </div>
        <div className="sm:flex gap-3 items-center hidden">
          <img className="cursor-pointer" src={assets.search} alt="search" />
          <img className="cursor-pointer" src={assets.openMenu} alt="openMenu" />
        </div>
      </div>

      {/* Toggle Section */}
      <div className="border-1 border-slate-300 border-b-0 p-2 rounded-md rounded-b-none text-sm">
        <div>
          <button
            onClick={() => handleToggle(1)}
            className="w-full focus:outline-none flex justify-between items-center text-slate-500 cursor-pointer pb-2"
          >
            <div className="flex gap-[3px] items-center">
              <img src={assets.logo1} className="h-4 w-4" alt="" />
              <div>Comm - IT India Pvt Ltd</div>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className={`transform ${open === 1 ? "rotate-180" : ""}`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {open === 1 && (
            <div className="py-2 border-t border-slate-300">
              Content 1
            </div>
          )}
        </div>
      </div>

      {/* Switch Portal */}
      <div className="border-1 border-slate-300 p-2 rounded-md rounded-t-none text-sm">
        <button className="text-slate-500 flex gap-[3px] items-center">
          <img src={assets.arrow} className="w-4 h-4" alt="arrow" />
          <div>Switch to Portal</div>
        </button>
      </div>

      {/* New Chat */}
      <div className="text-sm mt-5 min-h-2/6">
        <button onClick={()=>{
          onNewChat()
          setVisible(false)
        } } className="py-2 flex gap-[3px] cursor-pointer">
          <img src={assets.message} alt="" />
          <div>New Chat</div>
        </button>

        {/* Chat History */}
        {chatHistory?.length > 0 && (
          <div className="mt-3">
            <div className="font-semibold text-slate-600 mb-1">Previous Chats</div>
            <ul className="space-y-1 max-h-40 overflow-y-auto pr-1">
              {chatHistory
                .filter((msg) => msg.sender === "user")
                .map((msg, index) => (
                  <li key={index} className="p-2 bg-slate-100 rounded hover:bg-slate-200 text-ellipsis overflow-hidden whitespace-nowrap cursor-default">
                    {msg.text}
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>

      {/* Footer Links */}
      <div className="border-t border-slate-300 pt-4 space-y-2">
        <Link to="#" className="py-1 gap-[3px] flex items-center"><img className="h-5 w-5" src={assets.user} alt="" /> My Info</Link>
        <Link to="#" className="py-1 gap-[3px] flex items-center"><img className="h-5 w-5" src={assets.inbox} alt="" /> Inbox</Link>
        <Link to="#" className="py-1 gap-[3px] flex items-center"><img className="h-5 w-5" src={assets.notify} alt="" /> My Approval</Link>
      </div>
    </aside>
  );
};

export default Sidebar;
