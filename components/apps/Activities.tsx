
import React, { useState } from 'react';
import { Folder, Code, Music, Camera, FileText, Image, Layout, Video, ExternalLink, Tag } from 'lucide-react';
import { playSound } from '../../utils/sounds';

// ==========================================
// 🔧 CONFIGURATION SECTION - EDIT ACTIVITIES HERE
// ==========================================
// Instructions:
// 1. Add new items to the MY_ACTIVITIES array.
// 2. Use 'techStack' to list technologies used.
// 3. Provide a 'link' to the live project or repo (use '#' if none).
const MY_ACTIVITIES = [
  { 
    id: 1, 
    name: "E-Commerce Dashboard", 
    type: "React Application", 
    description: "A comprehensive admin dashboard designed for high-scale e-commerce stores. Features include real-time sales tracking, inventory management, and customer analytics visualization.",
    techStack: ["React 18", "TailwindCSS", "Recharts", "Node.js"],
    link: "https://github.com",
    icon: <Layout className="text-blue-500" />,
    date: "Modified: Today"
  },
  { 
    id: 2, 
    name: "Travel Photography", 
    type: "Photo Gallery", 
    description: "An immersive gallery showcasing street photography from Tokyo and Kyoto. Focuses on responsive grid layouts and lazy-loading optimization.",
    techStack: ["Next.js", "Framer Motion", "Cloudinary"],
    link: "#",
    icon: <Camera className="text-purple-500" />,
    date: "Modified: Yesterday"
  },
  { 
    id: 3, 
    name: "Audio Visualizer", 
    type: "Open Source Lib", 
    description: "A lightweight JavaScript library that renders real-time audio frequency data onto HTML5 Canvas. Used by over 500 developers.",
    techStack: ["Web Audio API", "Canvas API", "TypeScript"],
    link: "https://npmjs.com",
    icon: <Music className="text-green-500" />,
    date: "Modified: Last Week"
  },
  { 
    id: 4, 
    name: "Financial Tracker", 
    type: "Vue.js App", 
    description: "Personal finance management tool allowing users to set budgets, track expenses, and view monthly saving trends.",
    techStack: ["Vue 3", "Pinia", "Firebase"],
    link: "#",
    icon: <Code className="text-blue-600" />,
    date: "Modified: Last Month"
  },
  { 
    id: 5, 
    name: "Legacy Portfolio", 
    type: "Archive", 
    description: "My original portfolio website from 2018. Kept as a museum piece to show my progress as a developer.",
    techStack: ["HTML5", "jQuery", "CSS3"],
    link: "#",
    icon: <Folder className="text-yellow-500" />,
    date: "Modified: 2018"
  },
  { 
    id: 6, 
    name: "Resume.pdf", 
    type: "PDF Document", 
    description: "My up-to-date professional resume available for download.",
    techStack: ["PDF"],
    link: "/resume.pdf",
    icon: <FileText className="text-red-500" />,
    date: "Modified: Just now"
  },
];

// ==========================================
// 🛑 COMPONENT CODE (No need to edit below)
// ==========================================

export const Activities: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const selectedItem = MY_ACTIVITIES.find(p => p.id === selectedId);

  const handleItemClick = (id: number) => {
    setSelectedId(id);
    playSound('click');
  };

  return (
    <div className="h-full bg-white flex flex-col font-tahoma">
       {/* XP Toolbar (Cosmetic) */}
       <div className="bg-[#ECE9D8] border-b border-[#D8D2BD] p-1 flex items-center gap-1 select-none">
            <span className="text-gray-400 mx-1">Address</span>
            <div className="flex-1 bg-white border border-[#7F9DB9] px-2 py-0.5 text-sm flex items-center gap-2 shadow-inner">
                <Folder size={14} className="text-yellow-500" />
                <span>C:\My Documents\My Activities</span>
            </div>
            <button className="px-2 py-0.5 bg-[#59A642] text-white border border-[#3C7FB1] rounded shadow-sm hover:bg-[#68C550] text-xs font-bold">
                Go
            </button>
       </div>

       <div className="flex flex-1 overflow-hidden">
            {/* Left Sidebar (XP Task Pane style) */}
            <div className="w-56 bg-gradient-to-b from-[#7CA0DA] to-[#6083BE] p-3 hidden md:flex flex-col gap-4 text-white overflow-y-auto">
                {/* Tasks Block */}
                <div className="bg-white/0 border-t-0 border-x-0 border-b-0 rounded p-0 overflow-hidden">
                     <div className="bg-gradient-to-r from-white/20 to-transparent p-1 font-bold flex items-center gap-2 cursor-pointer text-sm mb-1">
                        <Folder size={16} /> File and Folder Tasks
                     </div>
                     <div className="pl-3 pr-2 py-1 text-[#001D53] text-xs space-y-1.5">
                        <div className="hover:underline cursor-pointer flex gap-2 items-center text-white hover:text-[#001D53] transition-colors"><div className="w-1 h-1 bg-white rounded-full"></div>Make a new folder</div>
                        <div className="hover:underline cursor-pointer flex gap-2 items-center text-white hover:text-[#001D53] transition-colors"><div className="w-1 h-1 bg-white rounded-full"></div>Share this folder</div>
                        <div className="hover:underline cursor-pointer flex gap-2 items-center text-white hover:text-[#001D53] transition-colors"><div className="w-1 h-1 bg-white rounded-full"></div>Web Publishing</div>
                     </div>
                </div>

                {/* Details Block - Dynamic */}
                <div className="bg-white/0 rounded p-0 overflow-hidden flex-1">
                     <div className="bg-gradient-to-r from-white/20 to-transparent p-1 font-bold flex items-center gap-2 cursor-pointer text-sm mb-1">
                        <Layout size={16} /> Details
                     </div>
                     <div className="p-3 bg-white/10 rounded-lg border border-white/20 text-white text-xs min-h-[200px] shadow-sm backdrop-blur-sm">
                        {selectedItem ? (
                            <div className="flex flex-col h-full animate-in fade-in duration-300">
                                <p className="font-bold text-sm mb-1">{selectedItem.name}</p>
                                <p className="mb-3 opacity-90 italic">{selectedItem.type}</p>
                                
                                <div className="mb-3 p-1.5 bg-black/10 rounded border border-black/5">
                                    <p className="opacity-90 leading-relaxed">{selectedItem.description}</p>
                                </div>
                                
                                <p className="font-bold mb-1 flex items-center gap-1"><Tag size={10} /> Tech Stack:</p>
                                <div className="flex flex-wrap gap-1 mb-4">
                                    {selectedItem.techStack.map(tech => (
                                        <span key={tech} className="bg-white/20 px-1.5 py-0.5 rounded text-[10px] border border-white/10">
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                {selectedItem.link !== '#' && (
                                    <a 
                                        href={selectedItem.link}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="mt-auto bg-[#59A642] hover:bg-[#6BC950] text-white text-center py-1.5 rounded border border-[#3C7FB1] shadow-sm flex items-center justify-center gap-2 font-bold transition-colors"
                                    >
                                        Visit Project <ExternalLink size={10} />
                                    </a>
                                )}
                                <p className="text-[10px] opacity-60 mt-2 text-right">{selectedItem.date}</p>
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-center opacity-70">
                                <Folder size={32} className="mb-2 opacity-50" />
                                <p>Select an item to view its description.</p>
                            </div>
                        )}
                     </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 p-4 overflow-y-auto bg-white">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {MY_ACTIVITIES.map((p) => (
                            <div 
                                key={p.id} 
                                onClick={() => handleItemClick(p.id)}
                                className={`group flex flex-col items-center gap-1 p-2 border border-transparent cursor-pointer rounded-sm
                                    ${selectedId === p.id 
                                        ? 'bg-[#316AC5] border-[#316AC5] opacity-100 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)]' 
                                        : 'hover:bg-[#E8F1FC] hover:border-[#B2CEFD]'
                                    }
                                `}
                            >
                                <div className="w-12 h-12 flex items-center justify-center drop-shadow-md transition-transform group-hover:scale-105 duration-200">
                                    {React.cloneElement(p.icon as React.ReactElement, { size: 48, strokeWidth: 1.5 })}
                                </div>
                                <div className={`text-center text-xs px-1 rounded-sm line-clamp-2 w-full
                                     ${selectedId === p.id 
                                        ? 'text-white' 
                                        : 'text-gray-700'
                                     }
                                `}>
                                    {p.name}
                                </div>
                            </div>
                        ))}
                    </div>
            </div>
       </div>

        {/* Footer Info */}
       <div className="h-6 bg-[#ECE9D8] border-t border-[#D8D2BD] flex items-center px-4 gap-4 text-xs text-gray-600 shadow-[inset_0_1px_2px_rgba(255,255,255,0.5)]">
            <span>{MY_ACTIVITIES.length} objects</span>
            <div className="w-[1px] h-3 bg-gray-400"></div>
            <span>{selectedId ? '1 selected' : '0 selected'}</span>
       </div>
    </div>
  );
};
