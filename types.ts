import { ReactNode } from 'react';

export enum AppId {
  ABOUT = 'about',
  SKILLS = 'skills',
  PROJECTS = 'projects',
  CONTACT = 'contact',
  AI_ASSISTANT = 'ai_assistant',
  TRASH = 'trash',
}

export interface WindowState {
  id: AppId;
  title: string;
  icon: ReactNode;
  content: ReactNode;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

export interface DesktopIconProps {
  id: AppId;
  label: string;
  icon: ReactNode;
  onDoubleClick: (id: AppId) => void;
}
