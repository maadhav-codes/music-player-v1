import type { LucideProps } from 'lucide-react';
import type React from 'react';

export type NetworkStatus = 'offline' | 'online';

export type RepeatMode = 0 | 1 | 2;

export type Tabs = {
  id: 'home' | 'playlist' | 'browse' | 'settings';
  label: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
  >;
}[];

export type Song = {
  id: string;
  title: string;
  artist: string;
  album: string;
  src: string;
  image: string;
  duration: string;
  isLocal: boolean;
  fileName?: string;
  fileSize?: string;
  fileType?: string;
  format?: string;
  bitrate?: string;
};

export type PlayerSettings = {
  crossfade: boolean;
  crossfadeDuration: number;
  autoplay: boolean;
  rememberPosition: boolean;
  defaultRepeat: RepeatMode;
  theme: string;
  showVisualizer: boolean;
  animations: boolean;
  highContrast: boolean;
  largeText: boolean;
  masterVolume: number;
};

export type PlayerState = {
  currentSongIndex: number;
  isPlaying: boolean;
  isShuffled: boolean;
  repeatMode: RepeatMode;
  currentTime: number;
  duration: number;
  volume: number;
  isLoading: boolean;
  error: string | null;
};

export interface HeaderProps {
  networkStatus: NetworkStatus;
  currentTime: string;
}
