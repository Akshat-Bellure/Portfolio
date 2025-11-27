
import React from 'react';
import { Github, Linkedin, Twitter, Globe, Mail, ExternalLink, Instagram, Facebook, Youtube } from 'lucide-react';

// ==========================================
// 🔧 CONFIGURATION SECTION - EDIT LINKS HERE
// ==========================================
// Add or remove links below. Supported icons can be imported from 'lucide-react'.
const MY_LINKS = [
  { 
    name: "GitHub", 
    url: "https://github.com", 
    icon: <Github size={24} />, 
    description: "Explore my open-source contributions, repositories, and code snippets.",
    color: "bg-gray-800" 
  },
  { 
    name: "LinkedIn", 
    url: "https://linkedin.com", 
    icon: <Linkedin size={24} />, 
    description: "View my professional career timeline, endorsements, and network.",
    color: "bg-[#0077b5]" 
  },
  { 
    name: "Twitter / X", 
    url: "https://twitter.com", 
    icon: <Twitter size={24} />, 
    description: "Follow me for tech thoughts, random musings, and daily updates.",
    color: "bg-[#1DA1F2]" 
  },
  { 
    name: "My Blog", 
    url: "https://dev.to", 
    icon: <Globe size={24} />, 
    description: "Read my latest articles, tutorials, and deep dives into web development.",
    color: "bg-[#0F9D58]" 
  },
  { 
    name: "Contact Me", 
    url: "mailto:hello@example.com", 
    icon: <Mail size={24} />, 
    description: "Got a project in mind? Shoot me an email and let's talk!",
    color: "bg-[#DB4437]" 
  },
];

// ==========================================
// 🛑 COMPONENT CODE (No need to edit below)
// ==========================================

export const Links: React.FC = () => {
  return (
    <div className="h-full bg-gradient-to-b from-[#6375d6] to-[#5a6ac2] p-6 flex flex-col items-center overflow-y-auto">
        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl mb-6 w-full max-w-lg text-center border border-white/20 shadow-lg">
            <h2 className="text-2xl font-bold text-white drop-shadow-md">My Important Links</h2>
            <p className="text-blue-100 text-sm mt-1">Connect with me across the web</p>
        </div>

        <div className="w-full max-w-lg space-y-4">
            {MY_LINKS.map((link) => (
                <a 
                    key={link.name} 
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center bg-white border-l-4 border-transparent hover:border-l-[#E57E31] p-4 rounded shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                >
                    {/* Hover Effect Background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    <div className={`relative z-10 w-12 h-12 ${link.color} text-white rounded-lg flex items-center justify-center mr-4 shadow-inner group-hover:scale-110 transition-transform duration-300`}>
                        {link.icon}
                    </div>
                    <div className="relative z-10 flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                             <span className="block font-bold text-gray-800 text-lg group-hover:text-[#245DDA] transition-colors">{link.name}</span>
                             <ExternalLink size={14} className="text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300" />
                        </div>
                        <span className="block text-sm text-gray-600 truncate group-hover:text-gray-800">{link.description}</span>
                    </div>
                </a>
            ))}
        </div>
        
        <div className="mt-auto pt-8 flex flex-col items-center gap-2">
            <div className="h-[1px] w-24 bg-white/30"></div>
            <p className="text-white/60 text-xs">
                Network Status: <span className="text-green-300 font-bold animate-pulse">Connected</span>
            </p>
        </div>
    </div>
  );
};
