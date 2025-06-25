import type { PlayerSettings, Song } from '@/types/data';

export const DEFAULT_SONGS: Song[] = [
  {
    id: '1',
    title: 'Jungle Run',
    artist: 'SoundJay',
    album: 'Jungle beat',
    src: 'https://www.soundjay.com/free-music/jungle-run-01.mp3',
    image: '',
    duration: '1:17',
    isLocal: false,
  },
];

export const DEFAULT_SETTINGS: PlayerSettings = {
  crossfade: false,
  crossfadeDuration: 2,
  autoplay: true,
  rememberPosition: false,
  defaultRepeat: 0,
  theme: 'default',
  showVisualizer: false,
  animations: true,
  highContrast: false,
  largeText: false,
  masterVolume: 70,
};

export const LOCAL_STORAGE_KEYS = {
  SETTINGS: 'musicPlayerSettings',
  FAVORITES: 'musicPlayerFavorites',
};
