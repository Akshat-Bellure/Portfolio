import React, { useRef } from 'react';
import { Minus, Square, X, Maximize2 } from 'lucide-react';
import { WindowState, AppId } from '../types';
import { useDraggable } from '../hooks/useDraggable';

interface WindowFrameProps {
  window: WindowState;
  isActive: boolean;
  onClose: (id: AppId) => void;
  onMinimize: (id: AppId) => void;
  onMaximize: (id: AppId) => void;
  onFocus: (id: AppId) => void;
  onMove: (id: AppId, pos: { x: number; y: number }) => void;
}

export const WindowFrame: React.FC<WindowFrameProps> = ({
  window,
  isActive,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onMove,
}) => {
  const windowRef = useRef<HTMLDivElement>(null);
  
  const { position, handleMouseDown, isDragging } = useDraggable(
    windowRef,
    window.position,
    (newPos) => onMove(window.id, newPos),
    !window.isMaximized
  );

  if (!window.isOpen || window.isMinimized) return null;

  const style: React.CSSProperties = {
    zIndex: window.zIndex,
    ...(window.isMaximized
      ? { top: 0, left: 0, width: '100%', height: 'calc(100% - 40px)', transform: 'none' }
      : { top: position.y, left: position.x, width: window.size.width, height: window.size.height }),
  };

  return (
    <div
      ref={windowRef}
      className={`absolute flex flex-col rounded-t-lg overflow-hidden shadow-2xl border-[3px] 
        ${isActive ? 'border-[#0054E3]' : 'border-[#7695C6]'} bg-[#ECE9D8]`}
      style={style}
      onMouseDown={() => onFocus(window.id)}
    >
      {/* Title Bar */}
      <div
        className={`h-8 flex items-center justify-between px-2 select-none 
          ${isActive 
            ? 'bg-gradient-to-r from-[#0054E3] via-[#2482E8] to-[#2585EA]' 
            : 'bg-gradient-to-r from-[#7695C6] to-[#99B6E1]'}`}
        onMouseDown={handleMouseDown}
        onDoubleClick={() => onMaximize(window.id)}
      >
        <div className="flex items-center gap-2 text-white font-bold text-shadow-sm truncate">
          <div className="w-4 h-4 [&>svg]:w-full [&>svg]:h-full">{window.icon}</div>
          <span className="text-sm tracking-wide drop-shadow-md" style={{ textShadow: '1px 1px 1px rgba(0,0,0,0.5)' }}>
            {window.title}
          </span>
        </div>

        <div className="flex gap-1">
          <button
            onClick={(e) => { e.stopPropagation(); onMinimize(window.id); }}
            className="w-5 h-5 flex items-center justify-center bg-[#245DDA] border border-white/60 rounded-[3px] hover:bg-[#4379EC] active:bg-[#1546B0] shadow-inner"
          >
            <Minus size={12} color="white" strokeWidth={4} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onMaximize(window.id); }}
            className="w-5 h-5 flex items-center justify-center bg-[#245DDA] border border-white/60 rounded-[3px] hover:bg-[#4379EC] active:bg-[#1546B0] shadow-inner"
          >
            {window.isMaximized ? <Maximize2 size={10} color="white" strokeWidth={4} /> : <Square size={10} color="white" strokeWidth={4} />}
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onClose(window.id); }}
            className="w-5 h-5 flex items-center justify-center bg-[#E0422E] border border-white/60 rounded-[3px] hover:bg-[#EB6655] active:bg-[#C23120] shadow-inner"
          >
            <X size={14} color="white" strokeWidth={4} />
          </button>
        </div>
      </div>

      {/* Menu Bar (Cosmetic) */}
      <div className="bg-[#ECE9D8] border-b border-gray-300 flex items-center px-2 py-1 gap-4 text-sm text-gray-700">
        <span className="hover:bg-[#316AC5] hover:text-white px-1 cursor-default">File</span>
        <span className="hover:bg-[#316AC5] hover:text-white px-1 cursor-default">Edit</span>
        <span className="hover:bg-[#316AC5] hover:text-white px-1 cursor-default">View</span>
        <span className="hover:bg-[#316AC5] hover:text-white px-1 cursor-default">Favorites</span>
        <span className="hover:bg-[#316AC5] hover:text-white px-1 cursor-default">Tools</span>
        <span className="hover:bg-[#316AC5] hover:text-white px-1 cursor-default">Help</span>
      </div>

      {/* Address Bar (Cosmetic) */}
      <div className="bg-[#ECE9D8] border-b border-gray-300 flex items-center px-2 py-1 gap-2 text-sm">
        <span className="text-gray-500">Address</span>
        <div className="flex-1 bg-white border border-gray-400 px-2 py-0.5 text-black">
          {`C:\\My Documents\\${window.title}`}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto bg-white p-4 relative">
        {window.content}
        
        {/* Resize Overlay (simplified) */}
        {!window.isMaximized && (
             <div className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize" />
        )}
      </div>
      
      {/* Status Bar */}
      <div className="h-6 bg-[#ECE9D8] border-t border-gray-300 flex items-center px-2 text-xs text-black">
         {isActive ? 'Active' : 'Ready'}
      </div>
    </div>
  );
};