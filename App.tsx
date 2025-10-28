import React, { useState, useRef, useEffect, useCallback } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";
import { Message, Role } from './types';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';

const SYSTEM_INSTRUCTION = `You are a helpful E-commerce Product Assistant.
Your job is to help users discover and compare products based on their preferences, budget, and purpose.
Always respond with clear comparisons, include pros and cons, and use a friendly, helpful tone.
If product data is not available, suggest what criteria the user should consider instead.`;

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: Role.MODEL,
      content: "Hello! I'm your E-commerce Product Assistant. How can I help you find the perfect product today?",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const chatSession = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const initializeChat = useCallback(() => {
    try {
      if (!process.env.API_KEY) {
        console.error("API_KEY environment variable not set.");
        setMessages(prev => [...prev, { role: Role.MODEL, content: "Error: API key is not configured. Please contact support."}]);
        return;
      }
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      chatSession.current = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        },
      });
    } catch (error) {
      console.error("Error initializing chat session:", error);
      setMessages(prev => [...prev, { role: Role.MODEL, content: "Sorry, I couldn't connect to my brain right now. Please try again later."}]);
    }
  }, []);

  useEffect(() => {
    initializeChat();
  }, [initializeChat]);


  const handleSendMessage = async (userInput: string) => {
    if (isLoading || !userInput.trim()) return;

    setIsLoading(true);
    const newUserMessage: Message = { role: Role.USER, content: userInput };
    setMessages((prevMessages) => [...prevMessages, newUserMessage]);

    // Add a loading indicator message
    setMessages((prevMessages) => [...prevMessages, { role: Role.LOADING, content: '...' }]);

    try {
      if (!chatSession.current) {
        throw new Error("Chat session not initialized.");
      }
      
      const response = await chatSession.current.sendMessage({ message: userInput });
      const botResponse: Message = { role: Role.MODEL, content: response.text };

      // Replace loading indicator with bot response
      setMessages((prevMessages) => {
        const newMessages = prevMessages.slice(0, -1); // Remove loading message
        return [...newMessages, botResponse];
      });

    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = { role: Role.MODEL, content: "Oops! Something went wrong. Please try again." };
      
      // Replace loading indicator with error message
      setMessages((prevMessages) => {
          const newMessages = prevMessages.slice(0, -1);
          return [...newMessages, errorMessage];
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 shadow-md p-4">
        <h1 className="text-xl md:text-2xl font-bold text-center text-cyan-400">E-commerce Product Assistant</h1>
      </header>
      
      <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg} />
        ))}
        <div ref={messagesEndRef} />
      </main>
      
      <footer className="p-4 bg-gray-900/80 backdrop-blur-sm sticky bottom-0">
        <div className="max-w-3xl mx-auto">
          <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        </div>
      </footer>
    </div>
  );
};

export default App;