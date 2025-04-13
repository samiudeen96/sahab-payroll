import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import ChatBox from "./pages/ChatBox";

const App = () => {
  const [messages, setMessages] = useState([]);
  const [chatSessions, setChatSessions] = useState(() => {
    const saved = localStorage.getItem("chatSessions");
    return saved ? JSON.parse(saved) : [];
  });
  const [currentSessionIndex, setCurrentSessionIndex] = useState(null);

  // Function to handle sending a message
  const handleSendMessage = async (message) => {
    const userMessage = { sender: "user", text: message };
  
    try {
      const response = await fetch("https://sahab-payroll-samiudeen.vercel.app/api/db");
      // const response = await fetch('/api/db');
      // const response = await fetch(import.meta.env.VITE_API_URL + '/api/db');

      const data = await response.json();
      console.log(data.questions);
      
  
      const foundAnswer = data.questions.find(
        (item) => item.question.toLowerCase() === message.toLowerCase()
      );
  
      const botResponse = {
        sender: "bot",
        text: foundAnswer
          ? foundAnswer.answer
          : "Sorry, I don't know the answer to that.",
      };
  
      const newMessages = [...messages, userMessage, botResponse];
      setMessages(newMessages);
  
      // Save to current session
      if (currentSessionIndex !== null) {
        const updatedSessions = [...chatSessions];
        updatedSessions[currentSessionIndex] = {
          ...updatedSessions[currentSessionIndex],
          title:
            updatedSessions[currentSessionIndex].messages.length === 0
              ? message
              : updatedSessions[currentSessionIndex].title,
          messages: newMessages,
        };
        setChatSessions(updatedSessions);
        localStorage.setItem("chatSessions", JSON.stringify(updatedSessions));
      }
    } catch (error) {
      console.error("Error fetching answer:", error);
      const errorMessage = {
        sender: "bot",
        text: "Sorry, something went wrong.",
      };
      const newMessages = [...messages, userMessage, errorMessage];
      setMessages(newMessages);
    }
  };
  

  // Handle new chat session
  const handleNewChat = () => {
    const newSession = {
      id: Date.now(),
      title: "New Chat",
      messages: [],
    };
    const updatedSessions = [newSession, ...chatSessions];
    setChatSessions(updatedSessions);
    localStorage.setItem("chatSessions", JSON.stringify(updatedSessions));
    setCurrentSessionIndex(0);
    setMessages([]);
  };

  // Load selected session messages
  const handleSelectSession = (session, index) => {
    setMessages(session.messages);
    setCurrentSessionIndex(index);
  };

  useEffect(() => {
    // Auto-select the first session on load
    if (chatSessions.length > 0 && currentSessionIndex === null) {
      setCurrentSessionIndex(0);
      setMessages(chatSessions[0].messages);
    }
  }, [chatSessions]);

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="sm:flex hidden">
        <Sidebar
          onNewChat={handleNewChat}
          sessions={chatSessions}
          onSelectSession={handleSelectSession}
          chatHistory={messages}
        />
      </div>
      <div className="flex flex-col flex-1">
        <Header
          handleNewChat={handleNewChat}
          chatSessions={chatSessions}
          handleSelectSession={handleSelectSession}
          messages={messages}
        />
        <div className="flex flex-col h-screen bg-amber-500">
          <ChatBox messages={messages} onSend={handleSendMessage} />
        </div>
      </div>
    </div>
  );
};

export default App;
