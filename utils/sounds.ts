
export type SoundType = 'startup' | 'shutdown' | 'click' | 'error' | 'navigation' | 'ding';

const SOUND_URLS: Record<SoundType, string> = {
  // Using Internet Archive and other reliable sources for XP sounds
  startup: 'https://archive.org/download/windows-xp-startup/Windows%20XP%20Startup.mp3',
  shutdown: 'https://archive.org/download/windows-xp-shutdown_202105/Windows%20XP%20Shutdown.mp3',
  click: 'https://archive.org/download/windows-xp-start_202105/Windows%20XP%20Start.mp3', // Used for navigation/clicks
  error: 'https://archive.org/download/windows-xp-error_202105/Windows%20XP%20Error.mp3',
  navigation: 'https://archive.org/download/windows-xp-ding_202105/Windows%20XP%20Ding.mp3',
  ding: 'https://archive.org/download/windows-xp-ding_202105/Windows%20XP%20Ding.mp3'
};

export const playSound = (type: SoundType) => {
  try {
    const audio = new Audio(SOUND_URLS[type]);
    audio.volume = 0.4;
    audio.play().catch(e => {
      // Browsers often block autoplay without user interaction first
      console.warn("Audio playback failed (interaction required):", e);
    });
  } catch (error) {
    console.error("Error playing sound:", error);
  }
};
