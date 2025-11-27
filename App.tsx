
import React, { useState, useEffect } from 'react';
import { 
  User, 
  Link as LinkIcon, 
  Gamepad2, 
  Trash2, 
  Bot, 
  Monitor,
  FolderOpen,
  HardDrive
} from 'lucide-react';

import { AppId, WindowState } from './types';
import { DesktopIcon } from './components/DesktopIcon';
import { WindowFrame } from './components/WindowFrame';
import { Taskbar } from './components/Taskbar';
import { StartMenu } from './components/StartMenu';
import { playSound } from './utils/sounds';

// App Contents
import { About } from './components/apps/About';
import { Activities } from './components/apps/Activities';
import { Links } from './components/apps/Links';
import { AiChat } from './components/apps/AiChat';

// ==========================================
// 🔧 DESKTOP CONFIGURATION
// ==========================================
const INITIAL_WINDOWS: WindowState[] = [
  {
    id: AppId.ABOUT,
    title: 'My Info', 
    icon: <User />,
    content: <About />,
    isOpen: true, 
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    position: { x: 50, y: 50 },
    size: { width: 700, height: 500 },
  },
  {
    id: AppId.SKILLS,
    title: 'My Activities',
    icon: <FolderOpen />,
    content: <Activities />,
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 2,
    position: { x: 100, y: 80 },
    size: { width: 800, height: 600 },
  },
  {
    id: AppId.CONTACT,
    title: 'My Important Links',
    icon: <LinkIcon />,
    content: <Links />,
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 3,
    position: { x: 150, y: 150 },
    size: { width: 500, height: 450 },
  },
  {
    id: AppId.AI_ASSISTANT,
    title: 'XP Assistant',
    icon: <Bot />,
    content: <AiChat />,
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 4,
    position: { x: 400, y: 80 },
    size: { width: 350, height: 500 },
  },
  {
    id: AppId.TRASH,
    title: 'Recycle Bin',
    icon: <Trash2 />,
    content: <div className="p-4 text-center">The Recycle Bin is empty.</div>,
    isOpen: false,
    isMinimized: false,
    isMaximized: false,
    zIndex: 1,
    position: { x: 200, y: 200 },
    size: { width: 300, height: 200 },
  }
];

export default function App() {
  const [windows, setWindows] = useState<WindowState[]>(INITIAL_WINDOWS);
  const [activeId, setActiveId] = useState<AppId | null>(AppId.ABOUT);
  const [startOpen, setStartOpen] = useState(false);
  const [maxZ, setMaxZ] = useState(10);

  // Play startup sound on first interaction if needed, or mount
  useEffect(() => {
    // Note: Most browsers block autoplay. 
    // We could add a "Click to Start" overlay, but standard behavior 
    // is to just let sounds work after first click.
  }, []);

  const bringToFront = (id: AppId) => {
    setActiveId(id);
    setWindows(prev => 
      prev.map(w => 
        w.id === id ? { ...w, zIndex: maxZ + 1, isMinimized: false } : w
      )
    );
    setMaxZ(z => z + 1);
  };

  const handleOpen = (id: AppId) => {
    // Check if already open to avoid spamming sound
    const wasOpen = windows.find(w => w.id === id)?.isOpen;
    if (!wasOpen) playSound('navigation');

    setWindows(prev => 
      prev.map(w => w.id === id ? { ...w, isOpen: true, isMinimized: false } : w)
    );
    bringToFront(id);
  };

  const handleClose = (id: AppId) => {
    playSound('click');
    setWindows(prev => 
      prev.map(w => w.id === id ? { ...w, isOpen: false } : w)
    );
    if (activeId === id) setActiveId(null);
  };

  const handleMinimize = (id: AppId) => {
    playSound('click');
    setWindows(prev => 
      prev.map(w => w.id === id ? { ...w, isMinimized: true } : w)
    );
    setActiveId(null);
  };

  const handleMaximize = (id: AppId) => {
    playSound('click');
    setWindows(prev => 
      prev.map(w => w.id === id ? { ...w, isMaximized: !w.isMaximized } : w)
    );
    bringToFront(id);
  };

  const handleMove = (id: AppId, pos: { x: number; y: number }) => {
    setWindows(prev => 
      prev.map(w => w.id === id ? { ...w, position: pos } : w)
    );
  };

  const toggleStart = () => {
    playSound('click');
    setStartOpen(!startOpen);
  };

  const handleDesktopIconClick = (id: AppId) => {
     handleOpen(id);
  };

  return (
    <div 
      className="w-screen h-screen overflow-hidden relative font-tahoma select-none"
      style={{
        backgroundImage: `url('https://upload.wikimedia.org/wikipedia/en/2/27/Bliss_%28Windows_XP%29.png')`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#3B6EA5'
      }}
      onClick={() => {
        if (startOpen) {
             setStartOpen(false);
        }
      }}
    >
        {/* Desktop Icons Grid */}
        <div className="absolute top-0 left-0 p-2 flex flex-col flex-wrap h-[calc(100%-40px)] gap-2 content-start z-0 w-28">
          
          <DesktopIcon 
            id={AppId.ABOUT} 
            label="My Info" 
            icon={
              <div className="relative w-full h-full transform transition-transform hover:scale-105 duration-100">
                <div className="absolute inset-0 bg-[#FCD53F] border-t-4 border-[#F8E698] rounded-sm shadow-md flex items-center justify-center">
                  <User className="text-[#A88820] opacity-50 w-8 h-8" />
                </div>
                <div className="absolute top-1 left-0 right-0 h-1 bg-[#F8E698] w-1/2 rounded-t-sm transform -translate-y-full"></div>
              </div>
            } 
            onDoubleClick={handleDesktopIconClick} 
          />

          <DesktopIcon 
            id={AppId.CONTACT} 
            label="My Imp Links" 
            icon={
               <div className="relative w-full h-full transform transition-transform hover:scale-105 duration-100">
                <div className="absolute inset-0 bg-[#FCD53F] border-t-4 border-[#F8E698] rounded-sm shadow-md flex items-center justify-center">
                   <LinkIcon className="text-[#A88820] opacity-50 w-8 h-8" />
                </div>
                 <div className="absolute top-1 left-0 right-0 h-1 bg-[#F8E698] w-1/2 rounded-t-sm transform -translate-y-full"></div>
              </div>
            } 
            onDoubleClick={handleDesktopIconClick} 
          />

          <DesktopIcon 
            id={AppId.SKILLS} 
            label="My Activities" 
            icon={
              <div className="relative w-full h-full transform transition-transform hover:scale-105 duration-100">
                 <div className="absolute inset-0 bg-[#FCD53F] border-t-4 border-[#F8E698] rounded-sm shadow-md flex items-center justify-center">
                   <Gamepad2 className="text-[#A88820] opacity-50 w-8 h-8" />
                 </div>
                 <div className="absolute top-1 left-0 right-0 h-1 bg-[#F8E698] w-1/2 rounded-t-sm transform -translate-y-full"></div>
              </div>
            } 
            onDoubleClick={handleDesktopIconClick} 
          />

          <div className="h-4"></div>

           <DesktopIcon 
            id={AppId.AI_ASSISTANT} 
            label="Assistant" 
            icon={<div className="bg-white rounded-full p-1 border-2 border-purple-400 shadow-md w-full h-full flex items-center justify-center transform transition-transform hover:scale-105 duration-100"><Bot className="text-purple-600 w-8 h-8" /></div>} 
            onDoubleClick={handleDesktopIconClick} 
          />

           <DesktopIcon 
            id={AppId.TRASH} 
            label="Recycle Bin" 
            icon={<Trash2 className="text-white drop-shadow-md transform transition-transform hover:scale-105 duration-100" />} 
            onDoubleClick={handleDesktopIconClick} 
          />
        </div>

        {/* Windows */}
        {windows.map(window => (
          <WindowFrame
            key={window.id}
            window={window}
            isActive={activeId === window.id}
            onClose={handleClose}
            onMinimize={handleMinimize}
            onMaximize={handleMaximize}
            onFocus={bringToFront}
            onMove={handleMove}
          />
        ))}

        {/* Start Menu */}
        <StartMenu 
            visible={startOpen} 
            onOpenApp={handleOpen} 
            onClose={() => setStartOpen(false)} 
        />

        {/* Taskbar */}
        <Taskbar 
          windows={windows} 
          activeId={activeId} 
          onToggleStart={toggleStart} 
          onWindowClick={(id) => {
             if (activeId === id && !windows.find(w => w.id === id)?.isMinimized) {
               handleMinimize(id);
             } else {
               handleOpen(id);
             }
          }}
          startOpen={startOpen}
        />
    </div>
  );
}
