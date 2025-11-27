import React from 'react';
import { DesktopIconProps } from '../types';

export const DesktopIcon: React.FC<DesktopIconProps> = ({ id, label, icon, onDoubleClick }) => {
  return (
    <div
      className="flex flex-col items-center justify-start w-24 p-2 cursor-pointer group hover:bg-blue-200/30 rounded border border-transparent hover:border-blue-200/50 mb-2"
      onDoubleClick={() => onDoubleClick(id)}
    >
      <div className="w-12 h-12 mb-1 drop-shadow-md [&>svg]:w-full [&>svg]:h-full [&>svg]:drop-shadow-lg text-white filter">
        {icon}
      </div>
      <span className="text-white text-xs font-normal text-center select-none px-1 rounded-sm line-clamp-2" style={{ textShadow: '1px 1px 2px black' }}>
        {label}
      </span>
    </div>
  );
};