import React, { useState, useEffect } from 'react';
import { WindowState, AppId } from '../types';
import { ChevronUp } from 'lucide-react';

interface TaskbarProps {
  windows: WindowState[];
  activeId: AppId | null;
  onToggleStart: () => void;
  onWindowClick: (id: AppId) => void;
  startOpen: boolean;
}

export const Taskbar: React.FC<TaskbarProps> = ({ windows, activeId, onToggleStart, onWindowClick, startOpen }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="h-10 w-full fixed bottom-0 left-0 bg-gradient-to-b from-[#245DDA] via-[#245DDA] to-[#1F52C8] flex items-center justify-between px-0 z-50 border-t border-[#3E80ED]">
      
      {/* Start Button */}
      <button
        className={`
          h-full px-2 ml-0 flex items-center gap-1 rounded-r-xl
          ${startOpen 
            ? 'bg-[#2b6531] shadow-[inset_2px_2px_4px_rgba(0,0,0,0.5)]' 
            : 'bg-gradient-to-b from-[#3C8F31] via-[#3C8F31] to-[#337b2a] hover:brightness-110 shadow-[2px_2px_4px_rgba(0,0,0,0.4)]'}
        `}
        style={{
          borderTopRightRadius: '10px',
          borderBottomRightRadius: '10px',
          boxShadow: startOpen ? 'inset 2px 2px 5px rgba(0,0,0,0.6)' : '2px 2px 3px rgba(0,0,0,0.3)'
        }}
        onClick={onToggleStart}
      >
        <div className="italic font-bold text-white text-lg flex items-center gap-1 px-2" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
           <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Windows_logo_and_wordmark_-_2001-2006.svg/100px-Windows_logo_and_wordmark_-_2001-2006.svg.png" alt="logo" className="w-5 h-5 object-contain" style={{ filter: 'drop-shadow(1px 1px 1px rgba(0,0,0,0.5))' }} />
           start
        </div>
      </button>

      {/* Taskbar Items */}
      <div className="flex-1 flex items-center px-2 gap-1 overflow-x-auto">
        <div className="h-6 w-[2px] bg-black/20 mx-1 border-l border-white/20"></div>
        {windows.filter(w => w.isOpen).map((win) => (
          <button
            key={win.id}
            onClick={() => onWindowClick(win.id)}
            className={`
              w-40 h-8 flex items-center gap-2 px-2 text-white text-xs rounded-[2px] truncate
              ${activeId === win.id && !win.isMinimized
                ? 'bg-[#1C45A6] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.5)] bg-opacity-80'
                : 'bg-[#3C81F3] hover:bg-[#5390F5] shadow-[1px_1px_1px_rgba(0,0,0,0.3)]'}
            `}
          >
            <div className="w-4 h-4 min-w-[16px]">{win.icon}</div>
            <span className="truncate">{win.title}</span>
          </button>
        ))}
      </div>

      {/* System Tray */}
      <div className="h-full bg-[#0B75E8] flex items-center px-3 gap-3 border-l border-[#104394] shadow-[inset_2px_2px_4px_rgba(0,0,0,0.3)]">
        <ChevronUp size={14} className="text-white cursor-pointer" />
        <div className="text-white text-xs font-normal">
          {formatTime(time)}
        </div>
      </div>
    </div>
  );
};