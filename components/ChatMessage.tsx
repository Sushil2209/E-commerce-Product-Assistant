import React from 'react';
import { Message, Role } from '../types';
import { marked } from 'marked';

const UserIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" />
    </svg>
);

const BotIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM10 17C10 17.55 9.55 18 9 18S8 17.55 8 17V15C8 14.45 8.45 14 9 14S10 14.45 10 15V17ZM12 7C10.9 7 10 6.1 10 5S10.9 3 12 3S14 3.9 14 5S13.1 7 12 7ZM16 17C16 17.55 15.55 18 15 18S14 17.55 14 17V15C14 14.45 14.45 14 15 14S16 14.45 16 15V17Z" />
    </svg>
);

const LoadingDots: React.FC = () => (
    <div className="flex space-x-1">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
    </div>
);

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === Role.USER;
  const isModel = message.role === Role.MODEL;
  const isLoading = message.role === Role.LOADING;

  const containerClasses = `flex items-start gap-3 ${isUser ? 'justify-end' : 'justify-start'}`;
  
  const bubbleClasses = `max-w-xl lg:max-w-2xl px-5 py-3 rounded-2xl ${
    isUser
      ? 'bg-cyan-600 text-white rounded-br-lg'
      : 'bg-gray-700 text-gray-200 rounded-bl-lg'
  }`;
  
  const iconClasses = "w-8 h-8 p-1 rounded-full text-white";

  const renderContent = () => {
    if (isLoading) {
      return <LoadingDots />;
    }
    if (isModel) {
        // Use a basic regex to avoid parsing code blocks as markdown
        const sanitizedContent = message.content.replace(/```[\s\S]*?```/g, match => `<pre><code>${match.slice(3, -3)}</code></pre>`);
        const htmlContent = marked.parse(sanitizedContent, { gfm: true, breaks: true });
        return <div className="prose prose-invert prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: htmlContent as string }} />;
    }
    return <p className="whitespace-pre-wrap">{message.content}</p>;
  };

  return (
    <div className={containerClasses}>
      {!isUser && (
        <div className={`bg-gray-600 ${iconClasses}`}>
            <BotIcon />
        </div>
      )}
      <div className={bubbleClasses}>
        {renderContent()}
      </div>
       {isUser && (
        <div className={`bg-cyan-700 ${iconClasses}`}>
            <UserIcon/>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;