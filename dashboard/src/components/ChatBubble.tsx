// components/
import React from 'react';
import { SparklesIcon } from '@heroicons/react/24/solid'

interface ChatBubbleProps {
  text: string;
  /** “in” for incoming/gray bubble, “out” for outgoing/purple bubble */
  variant: 'in' | 'out';
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ text, variant }) => {
  const base = 'max-w-[75%] text-base p-4 rounded-lg mb-2 inline-flex items-center'
  const style =
    variant === 'out'
      ? 'bg-accent-30 text-white'
      : 'bg-white text-gray-800 shadow ml-auto'

  return (
    <div className={`${base} ${style}`}>
      {variant === 'out' && (
        <SparklesIcon className="h-5 w-5 text-white mr-2 flex-shrink-0" />
      )}
      <span>{text}</span>
    </div>
  );
};
