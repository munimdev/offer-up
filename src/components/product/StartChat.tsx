// @ts-nocheck
import React, { useState, useRef, useEffect } from 'react';
import { Send, X } from 'lucide-react'; // Import the Send and X icons from lucide-react

const StartChat = ({ onClose, onSubmit }) => {
  const [message, setMessage] = useState('');
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && message.trim() !== '') {
      handleStartChat();
    }
  };
  const handleStartChat = () => {
    onSubmit(message);
    setMessage('');
  };
  const disabledButtonStyle = message.trim() === '' ? { backgroundColor: 'lightgray', color: 'white', cursor: 'not-allowed' } : {};
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50 ">
      <div className="bg-white p-12 rounded-lg shadow-lg relative w-180"> {/* Adjust width here */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-semibold mb-4 text-center">Start a Chat</h2>
        <div className="flex"> {/* Use flex for input and button */}
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            ref={inputRef}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="flex-grow border border-gray-300 rounded-lg px-32 py-3 mr-2" // Use flex-grow and adjust margin
          />
          <button
          style={disabledButtonStyle}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark flex items-center justify-center"
            onClick={handleStartChat}
          >
             <Send size={20} className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartChat;
