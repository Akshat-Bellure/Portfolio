import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { sendMessageToGemini } from '../../services/geminiService';

export const AiChat: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: "Hi! I'm your portfolio assistant. How can I help you navigate this desktop?" }
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const historyStrings = messages.map(m => `${m.role}: ${m.text}`);
      const response = await sendMessageToGemini(userMsg, historyStrings);
      
      setMessages(prev => [...prev, { role: 'bot', text: response || "I couldn't generate a response." }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'bot', text: "Connection error. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#F0F0F0]">
      <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
             <div className={`flex max-w-[80%] gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border border-gray-400 ${msg.role === 'user' ? 'bg-blue-100' : 'bg-yellow-100'}`}>
                    {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div className={`p-3 text-sm rounded-lg shadow-sm border ${msg.role === 'user' ? 'bg-white border-blue-200' : 'bg-[#FFFFE1] border-yellow-200'}`}>
                    {msg.text}
                </div>
             </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
             <div className="bg-gray-200 text-gray-500 text-xs px-3 py-1 rounded-full animate-pulse">
                Thinking...
             </div>
          </div>
        )}
      </div>
      <div className="p-2 bg-[#ECE9D8] border-t border-gray-300 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask me about this portfolio..."
          className="flex-1 border border-gray-400 px-2 py-1 text-sm focus:outline-none focus:border-blue-500"
        />
        <button
            onClick={handleSend}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-sm text-sm disabled:opacity-50"
        >
            <Send size={14} />
        </button>
      </div>
    </div>
  );
};