
import React from 'react';
import { User, Monitor, Link as LinkIcon, Bot, LogOut, Power, ChevronRight, Settings, HelpCircle, Search, Play } from 'lucide-react';
import { AppId } from '../types';

interface StartMenuProps {
  onOpenApp: (id: AppId) => void;
  onClose: () => void;
  visible: boolean;
}

export const StartMenu: React.FC<StartMenuProps> = ({ onOpenApp, onClose, visible }) => {
  if (!visible) return null;

  return (
    <div
      className="absolute bottom-10 left-0 w-80 bg-white border-2 border-[#245DDA] rounded-t-lg shadow-[4px_4px_10px_rgba(0,0,0,0.5)] z-[60] flex flex-col overflow-hidden font-tahoma animate-in slide-in-from-bottom-2 fade-in duration-150 origin-bottom-left"
      onClick={e => e.stopPropagation()}
      style={{ borderTopRightRadius: '8px', borderTopLeftRadius: '8px' }}
    >
        {/* Header */}
        <div className="h-16 bg-gradient-to-b from-[#1571E3] via-[#2482E8] to-[#2585EA] flex items-center px-3 gap-3 border-b border-[#003C74] shadow-[inset_0px_2px_5px_rgba(255,255,255,0.2)]">
            <div className="w-12 h-12 rounded border-[2px] border-white/60 overflow-hidden bg-orange-100 flex items-center justify-center shadow-md relative group cursor-pointer hover:border-white transition-colors">
                 <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" className="w-full h-full object-cover" />
            </div>
            <span className="text-white font-bold text-lg drop-shadow-[1px_1px_1px_rgba(0,0,0,0.5)] cursor-pointer hover:underline">Portfolio Admin</span>
        </div>

        {/* Content */}
        <div className="flex-1 bg-white flex relative min-h-[350px]">
            {/* Orange Bar (Top Line cosmetic) */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#E57E31] z-10 opacity-60"></div>

            {/* Left Column (Pinned/Recent) */}
            <div className="w-1/2 p-2 space-y-1 bg-white flex flex-col">
                <MenuButton
                    icon={<User className="text-gray-600" size={20} />}
                    title="My Info"
                    subtitle="About Me"
                    onClick={() => { onOpenApp(AppId.ABOUT); onClose(); }}
                    bold
                />
                 <MenuButton
                    icon={<LinkIcon className="text-blue-500" size={20} />}
                    title="My Links"
                    subtitle="Social & Contact"
                    onClick={() => { onOpenApp(AppId.CONTACT); onClose(); }}
                    bold
                />
                <MenuButton
                    icon={<Monitor className="text-green-600" size={20} />}
                    title="My Activities"
                    subtitle="Projects & Work"
                    onClick={() => { onOpenApp(AppId.SKILLS); onClose(); }}
                    bold
                />
                
                <div className="my-2 border-t border-gray-200 w-11/12 mx-auto"></div>

                <MenuButton
                    icon={<Bot className="text-purple-600" size={18} />}
                    title="AI Assistant"
                    onClick={() => { onOpenApp(AppId.AI_ASSISTANT); onClose(); }}
                />
                
                <div className="flex-1"></div>
                
                <div className="mt-2 border-t border-gray-200 w-11/12 mx-auto pt-2 text-center pb-2">
                   <div className="flex items-center justify-center gap-1 font-bold text-[#001353] text-sm py-1 px-2 hover:bg-[#2F71CD] hover:text-white transition-colors cursor-pointer rounded-sm">
                      All Programs <Play size={10} fill="currentColor" />
                   </div>
                </div>
            </div>

            {/* Right Column (System) */}
            <div className="w-1/2 bg-[#D3E5FA] border-l border-[#95BDEE] p-2 flex flex-col text-[#001353]">
                <SystemLink text="My Documents" bold icon={<Monitor size={14}/>} onClick={() => { onOpenApp(AppId.SKILLS); onClose(); }} />
                <SystemLink text="My Recent Documents" icon={<div className="w-3 h-3 bg-gray-400/50 rounded-sm" />} />
                <SystemLink text="My Pictures" />
                <SystemLink text="My Music" />
                <SystemLink text="My Computer" />
                <div className="my-2 border-t border-[#95BDEE] opacity-50"></div>
                <SystemLink text="Control Panel" icon={<Settings size={14} />} />
                <SystemLink text="Connect To" />
                <SystemLink text="Printers and Faxes" />
                <div className="my-2 border-t border-[#95BDEE] opacity-50"></div>
                <SystemLink text="Help and Support" icon={<HelpCircle size={14} />} />
                <SystemLink text="Search" icon={<Search size={14} />} />
                <SystemLink text="Run..." />
            </div>
        </div>

        {/* Footer */}
        <div className="h-10 bg-gradient-to-r from-[#245DDA] to-[#3F8CF3] flex justify-end items-center px-3 gap-2 border-t border-[#003C74]">
             <button 
                className="flex items-center gap-1 text-white hover:text-gray-100 transition-colors px-2 py-1 rounded hover:bg-[#1C45A6]/40 active:bg-[#1C45A6]/60 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]"
                onClick={onClose}
             >
                  <div className="bg-[#DE4816] p-0.5 rounded-sm shadow-sm border border-white/30"><LogOut size={12} /></div>
                  <span className="text-xs">Log Off</span>
             </button>
             <button 
                className="flex items-center gap-1 text-white hover:text-gray-100 transition-colors px-2 py-1 rounded hover:bg-[#1C45A6]/40 active:bg-[#1C45A6]/60 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]"
                onClick={() => window.location.reload()}
             >
                  <div className="bg-[#1B7732] p-0.5 rounded-sm shadow-sm border border-white/30"><Power size={12} /></div>
                  <span className="text-xs">Turn Off Computer</span>
             </button>
        </div>
    </div>
  );
};

const MenuButton = ({ icon, title, subtitle, onClick, bold }: any) => (
    <button
        onClick={onClick}
        className="w-full flex items-center gap-2 p-1.5 hover:bg-[#316AC5] hover:text-white group rounded-sm transition-colors text-left"
    >
        <div className="shrink-0 w-8 h-8 flex items-center justify-center">{icon}</div>
        <div className="flex flex-col overflow-hidden leading-tight">
            <span className={`text-sm ${bold ? 'font-bold' : ''} text-gray-800 group-hover:text-white truncate`}>{title}</span>
            {subtitle && <span className="text-[10px] text-gray-500 group-hover:text-blue-100 truncate">{subtitle}</span>}
        </div>
    </button>
);

const SystemLink = ({ text, bold, icon, onClick }: any) => (
    <div
        onClick={onClick}
        className={`px-1 py-1 hover:bg-[#316AC5] hover:text-white cursor-pointer rounded-sm flex items-center gap-2 text-xs mb-0.5 leading-none group text-[#001353] ${bold ? 'font-bold' : ''}`}
    >
        {icon && <span className="text-[#001353]/70 group-hover:text-white">{icon}</span>}
        <span className="truncate flex-1">{text}</span>
    </div>
);
