import React, { useEffect, useState, useRef } from 'react';
import { Button } from '@mui/material';
import { Volume2, Mic, X } from 'lucide-react';
import { generateAIResponse } from '../service/api';

const classNames = (...classes) => classes.filter(Boolean).join(' ');

const TalkWithBuddyButton = ({ onClick }) => {
  const [isActive, setIsActive] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (!('speechSynthesis' in window) || !('webkitSpeechRecognition' in window)) {
      console.error('Web Speech API is not supported in this browser.');
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = async (event) => {
      const transcript = event.results[0][0].transcript;
      setChatHistory(prev => [...prev, { role: 'user', message: transcript }]);

      if (transcript.toLowerCase().includes('exit') || transcript.toLowerCase().includes('close')) {
        stopEverything();
        setIsActive(false);
        return;
      }

      let reply = "I'm here to help you.";
      try {
        const cleanedTranscript = transcript
            .toLowerCase()
           .trim()
           .replace(/[^\w\s.,?!]/g, ""); // Remove special characters except for punctuation
        reply = await generateAIResponse(cleanedTranscript);
        
      } catch (error) {
        console.error('AI error:', error);
        reply = "Sorry, I couldn't process that right now.";
      }

      setTimeout(() => {
        setChatHistory(prev => [...prev, { role: 'buddy', message: reply }]);
      }, 1000);

      const utterance = new SpeechSynthesisUtterance(reply);
      const voices = speechSynthesis.getVoices();
      const selectedVoice = voices.find(voice => voice.name.includes('Google UK English Female')) || voices[0];
      utterance.voice = selectedVoice;

      utterance.onend = () => setIsSpeaking(false);

      setIsSpeaking(true);
      speechSynthesis.speak(utterance);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
  }, []);

  const stopEverything = () => {
    speechSynthesis.cancel();
    recognitionRef.current?.abort();
    setIsSpeaking(false);
    setIsListening(false);
  };

  const handleClick = () => {
    const newActive = !isActive;
    setIsActive(newActive);
    onClick();

    if (newActive) {
      stopEverything();
      const text = 'How may I help you today?';
      setChatHistory([{ role: 'buddy', message: text }]);

      const utterance = new SpeechSynthesisUtterance(text);
      const voices = speechSynthesis.getVoices();
      const selectedVoice = voices.find(voice => voice.name.includes('Google UK English Female')) || voices[0];
      utterance.voice = selectedVoice;

      utterance.onend = () => {
        setIsSpeaking(false);
        recognitionRef.current?.start();
      };

      setIsSpeaking(true);
      speechSynthesis.speak(utterance);
    } else {
      stopEverything();
    }
  };

  const handleMicClick = () => {
    if (isSpeaking) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    } else if (!isListening) {
      recognitionRef.current?.start();
    }
  };

  return (
    <>
      <Button 
        variant="outlined" 
        size="sm" 
        className="text-xs h-8 bg-green-500 hover:bg-green-600 text-white"
        onClick={handleClick}
        title="Talk with your code buddy"
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <Volume2 className="w-4 h-4 mr-1" />
        Talk
      </Button>

      {isActive && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Talk with Code Buddy</h3>
              <button 
                onClick={() => {
                  setIsActive(false);
                  stopEverything();
                }}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-gray-100 rounded-lg p-4 mb-4 h-40 overflow-y-auto space-y-2">
              {chatHistory.length > 0 ? (
                chatHistory.map((msg, idx) => (
                  <p key={idx} className={classNames(
                    "text-sm",
                    msg.role === 'user' ? 'text-blue-700 font-medium' : 'text-gray-800'
                  )}>
                    <strong>{msg.role === 'user' ? 'You' : 'Buddy'}:</strong> {msg.message}
                  </p>
                ))
              ) : (
                <p className="text-sm text-gray-500">Ask a question or describe your coding problem...</p>
              )}
            </div>

            <div className="flex justify-center">
              <button
                className={classNames(
                  "w-16 h-16 rounded-full flex items-center justify-center transition-colors",
                  isListening ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"
                )}
                onClick={handleMicClick}
              >
                <Mic className="w-8 h-8 text-white" />
              </button>
            </div>

            {isListening && (
              <p className="text-center text-sm mt-3 text-gray-600">Listening...</p>
            )}

            <div className="mt-4 text-center text-xs text-gray-500">
              <p>Code Buddy uses AI to help with programming problems</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TalkWithBuddyButton;
