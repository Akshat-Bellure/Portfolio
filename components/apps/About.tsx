import React from 'react';

// ==========================================
// 🔧 CONFIGURATION SECTION - EDIT YOUR INFO HERE
// ==========================================
const PROFILE_DATA = {
  // 1. Profile Picture URL
  imageUrl: "https://picsum.photos/300/300", 
  
  // 2. Your Name
  name: "John Doe",
  
  // 3. Your Job Title
  title: "Senior Frontend Engineer",
  
  // 4. Status (Appears under name)
  status: "Available for hire",

  // 5. Short Summary
  summary: `Passionate developer with 8+ years of experience building scalable web applications. 
  Expert in React, TypeScript, and modern UI/UX design. I love turning complex problems 
  into simple, beautiful, and intuitive interface designs.`,

  // 6. Experience List
  experience: [
    {
      company: "TechCorp Inc.",
      dates: "2020 - Present",
      role: "Senior Frontend Developer leading a team of 5."
    },
    {
      company: "WebSolutions LLC",
      dates: "2017 - 2020",
      role: "Full Stack Developer building e-commerce sites."
    },
    // Add more experience blocks here...
  ],

  // 7. Education List
  education: [
    {
      degree: "B.S. Computer Science",
      school: "University of Technology, 2016"
    }
  ]
};

// ==========================================
// 🛑 COMPONENT CODE (No need to edit below)
// ==========================================

export const About: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 h-full bg-white overflow-hidden">
      {/* Sidebar - Left */}
      <div className="w-full md:w-1/3 flex flex-col items-center shrink-0">
        <div className="w-48 h-48 bg-gray-200 border-4 border-blue-100 shadow-[2px_2px_5px_rgba(0,0,0,0.2)] mb-4 overflow-hidden relative">
            <img 
                src={PROFILE_DATA.imageUrl} 
                alt="Profile" 
                className="w-full h-full object-cover"
            />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">{PROFILE_DATA.name}</h2>
        <p className="text-gray-500 font-medium">{PROFILE_DATA.title}</p>
        
        <div className="mt-6 w-full bg-[#FFFFE1] p-4 border border-[#D0D0BF] rounded shadow-sm text-sm relative">
            <div className="absolute -top-3 left-3 bg-white px-1 text-xs text-gray-500 border border-gray-200 rounded">Status</div>
            <p className="text-green-700 font-bold flex items-center gap-2">
                <span className="w-3 h-3 bg-green-500 rounded-full inline-block animate-pulse shadow-sm"></span>
                {PROFILE_DATA.status}
            </p>
        </div>
      </div>
      
      {/* Content - Right */}
      <div className="flex-1 space-y-6 overflow-y-auto pr-2 custom-scrollbar">
        {/* Summary Box */}
        <div className="bg-gradient-to-r from-blue-50 to-white border-l-4 border-[#245DDA] p-4 shadow-sm">
            <h3 className="font-bold text-[#001D53] mb-2">Summary</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
                {PROFILE_DATA.summary}
            </p>
        </div>

        {/* Experience Section */}
        <div>
            <h3 className="font-bold text-gray-800 border-b-2 border-gray-200 mb-3 pb-1 flex items-baseline justify-between">
              Experience
              <span className="text-xs font-normal text-gray-400">Professional History</span>
            </h3>
            <div className="space-y-4">
                {PROFILE_DATA.experience.map((exp, index) => (
                  <div key={index} className="group">
                    <div className="flex justify-between items-baseline">
                        <span className="font-bold text-[#245DDA] group-hover:underline cursor-pointer">{exp.company}</span>
                        <span className="text-xs text-gray-500 font-mono bg-gray-100 px-2 rounded-full">{exp.dates}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1 pl-2 border-l-2 border-gray-200">{exp.role}</p>
                  </div>
                ))}
            </div>
        </div>

        {/* Education Section */}
        <div>
            <h3 className="font-bold text-gray-800 border-b-2 border-gray-200 mb-3 pb-1 flex items-baseline justify-between">
              Education
              <span className="text-xs font-normal text-gray-400">Academic Background</span>
            </h3>
            <div className="space-y-3">
               {PROFILE_DATA.education.map((edu, index) => (
                  <div key={index} className="text-sm">
                    <p className="font-bold text-gray-700">{edu.degree}</p>
                    <p className="text-gray-600 text-xs italic">{edu.school}</p>
                  </div>
               ))}
            </div>
        </div>
      </div>
    </div>
  );
};