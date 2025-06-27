import React, { useState } from 'react';
import { PaperAirplaneIcon, MicrophoneIcon } from '@heroicons/react/24/outline';

interface ChatInputProps {
  onSend: (message: string) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSend }) => {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text.trim());
    setText('');
  };

  return (
    <div className="flex items-center px-4 space-x-2">
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Saisissez votre question"
        className="flex-1 px-4 py-2 rounded-lg text-sm text-gray-600 bg-white focus:outline-none rounded-full focus:ring-2 focus:ring-purple-200"
      />
      <button onClick={handleSend} className="h-10 w-10 flex items-center justify-center bg-purple-300 text-white rounded-full hover:bg-purple-400 transition-colors">
        <PaperAirplaneIcon className="h-6 w-6 text-white" />
      </button>
    </div>
  );
};
