import React from 'react';
import { X } from 'lucide-react';
import { useState } from 'react';
import { useEffect } from 'react';
import { generateAIResponse } from '../service/api';
// Helper function to replace cn from @/lib/utils
const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};





const AiChatSidebar = ({ messages, userMessage, onChangeUserMessage, onSendMessage, onClose }) => {
  return (
    <div className="w-80 border-l flex flex-col h-full">
      <div className="p-3 border-b flex items-center justify-between">
        <h3 className="font-medium">AI Assistant</h3>
        <button 
          onClick={onClose}
          className="p-1 rounded-md hover:bg-muted"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={classNames(
              "p-3 rounded-lg max-w-[85%]",
              message.role === 'assistant' 
                ? "bg-secondary/40 mr-auto" 
                : "bg-primary/10 ml-auto"
            )}
          >
            <p className="text-sm">{message.content}</p>
          </div>
        ))}
      </div>
      
      <div className="p-3 border-t">
        <div className="flex items-center">
          <input
            type="text"
            value={userMessage}
            onChange={onChangeUserMessage}
            onKeyDown={(e) => e.key === 'Enter' && onSendMessage()}
            placeholder="Ask for help..."
            className="flex-1 p-2 text-sm border rounded-l-md focus:outline-none focus:ring-1 focus:border-primary"
          />
          <button
            onClick={onSendMessage}
            className="px-3 py-2 bg-primary text-primary-foreground rounded-r-md"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AiChatSidebar;