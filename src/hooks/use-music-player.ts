import {
  DEFAULT_SETTINGS,
  DEFAULT_SONGS,
  LOCAL_STORAGE_KEYS,
} from '@/constants/player';
import { formatTime, getRandomIndex, handleAudioError } from '@/lib/utils';
import type {
  PlayerSettings,
  PlayerState,
  RepeatMode,
  Song,
} from '@/types/data';
import { useLocalStorage } from '@uidotdev/usehooks';
import { useCallback, useEffect, useRef, useState } from 'react';
import { usePersistedSet } from './use-persisted-set';

export function useMusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [songs, setSongs] = useState<Song[]>(DEFAULT_SONGS);

  const favorites = usePersistedSet(LOCAL_STORAGE_KEYS.FAVORITES);

  const [settings, setSettings] = useLocalStorage<PlayerSettings>(
    LOCAL_STORAGE_KEYS.SETTINGS,
    DEFAULT_SETTINGS
  );

  const [playerState, setPlayerState] = useState<PlayerState>({
    currentSongIndex: 0,
    isPlaying: false,
    isShuffled: false,
    repeatMode: DEFAULT_SETTINGS.defaultRepeat,
    currentTime: 0,
    duration: 0,
    volume: DEFAULT_SETTINGS.masterVolume,
    isLoading: false,
    error: null,
  });

  const currentSong = songs[playerState.currentSongIndex];

  const play = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || !currentSong) return;

    try {
      setPlayerState(prev => ({ ...prev, error: null, isLoading: true }));
      await audio.play();
      setPlayerState(prev => ({ ...prev, isPlaying: true, isLoading: false }));
    } catch (error) {
      setPlayerState(prev => ({
        ...prev,
        isPlaying: false,
        isLoading: false,
        error: handleAudioError(error),
      }));
    }
  }, [currentSong]);

  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    setPlayerState(prev => ({ ...prev, isPlaying: false }));
  }, []);

  const togglePlayPause = useCallback(async () => {
    if (playerState.isPlaying) {
      pause();
    } else {
      await play();
    }
  }, [playerState.isPlaying, play, pause]);

  const getNextSongIndex = useCallback(() => {
    if (playerState.isShuffled) {
      return getRandomIndex(songs.length);
    }
    return playerState.currentSongIndex < songs.length - 1
      ? playerState.currentSongIndex + 1
      : 0;
  }, [playerState.isShuffled, playerState.currentSongIndex, songs.length]);

  const getPreviousSongIndex = useCallback(() => {
    if (playerState.isShuffled) {
      return getRandomIndex(songs.length);
    }
    return playerState.currentSongIndex > 0
      ? playerState.currentSongIndex - 1
      : songs.length - 1;
  }, [playerState.isShuffled, playerState.currentSongIndex, songs.length]);

  const nextSong = useCallback(() => {
    setPlayerState(prev => ({ ...prev, currentSongIndex: getNextSongIndex() }));
  }, [getNextSongIndex]);

  const previousSong = useCallback(() => {
    setPlayerState(prev => ({
      ...prev,
      currentSongIndex: getPreviousSongIndex(),
    }));
  }, [getPreviousSongIndex]);

  const toggleShuffle = useCallback(() => {
    setPlayerState(prev => ({ ...prev, isShuffled: !prev.isShuffled }));
  }, []);

  const toggleRepeat = useCallback(() => {
    setPlayerState(prev => ({
      ...prev,
      repeatMode: ((prev.repeatMode + 1) % 3) as RepeatMode,
    }));
  }, []);

  const seekTo = useCallback((time: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = time;
    setPlayerState(prev => ({ ...prev, currentTime: time }));
  }, []);

  const setVolume = useCallback(
    (volume: number) => {
      const audio = audioRef.current;
      if (!audio) return;

      audio.volume = volume / 100;
      setPlayerState(prev => ({ ...prev, volume }));
      setSettings(prev => ({ ...prev, masterVolume: volume }));
    },
    [setSettings]
  );

  const selectSong = useCallback((index: number) => {
    setPlayerState(prev => ({ ...prev, currentSongIndex: index }));
  }, []);

  const toggleFavorite = useCallback(
    (songId: string) => {
      if (favorites.has(songId)) {
        favorites.delete(songId);
      } else {
        favorites.add(songId);
      }
    },
    [favorites]
  );

  const addSongs = useCallback((newSongs: Song[]) => {
    setSongs(prev => [...prev, ...newSongs]);
  }, []);

  const clearPlaylist = useCallback(() => {
    setSongs(DEFAULT_SONGS);
    setPlayerState(prev => ({ ...prev, currentSongIndex: 0 }));
  }, []);

  const updateSettings = useCallback(
    (newSettings: Partial<PlayerSettings>) => {
      setSettings(prev => ({ ...prev, ...newSettings }));
    },
    [setSettings]
  );

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = settings.masterVolume / 100;
    }
  }, [settings.masterVolume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setPlayerState(prev => ({
        ...prev,
        currentTime: audio.currentTime,
        duration: audio.duration || 0,
      }));
    };

    const handleLoadedMetadata = () => {
      setPlayerState(prev => ({
        ...prev,
        duration: audio.duration || 0,
        isLoading: false,
      }));
    };

    const handleEnded = () => {
      if (playerState.repeatMode === 2) {
        audio.currentTime = 0;
        audio.play().catch(error => {
          setPlayerState(prev => ({
            ...prev,
            error: handleAudioError(error),
          }));
        });
      } else if (
        settings.autoplay &&
        (playerState.repeatMode === 1 ||
          playerState.currentSongIndex < songs.length - 1)
      ) {
        nextSong();
      } else {
        setPlayerState(prev => ({ ...prev, isPlaying: false }));
      }
    };

    const handleLoadStart = () => {
      setPlayerState(prev => ({ ...prev, isLoading: true }));
    };

    const handleCanPlay = () => {
      setPlayerState(prev => ({ ...prev, isLoading: false }));
    };

    const handleError = () => {
      setPlayerState(prev => ({
        ...prev,
        isLoading: false,
        error: handleAudioError(audio.error),
      }));
    };

    const events = [
      { type: 'timeupdate', handler: handleTimeUpdate },
      { type: 'loadedmetadata', handler: handleLoadedMetadata },
      { type: 'ended', handler: handleEnded },
      { type: 'loadstart', handler: handleLoadStart },
      { type: 'canplay', handler: handleCanPlay },
      { type: 'error', handler: handleError },
    ];

    events.forEach(({ type, handler }) =>
      audio.addEventListener(type, handler)
    );

    return () => {
      events.forEach(({ type, handler }) =>
        audio.removeEventListener(type, handler)
      );
    };
  }, [
    playerState.repeatMode,
    playerState.currentSongIndex,
    settings.autoplay,
    songs.length,
    nextSong,
  ]);

  return {
    songs,
    currentSong,
    favorites,
    settings,
    playerState,
    audioRef,

    play,
    pause,
    togglePlayPause,
    nextSong,
    previousSong,
    toggleShuffle,
    toggleRepeat,
    seekTo,
    setVolume,
    selectSong,
    toggleFavorite,
    addSongs,
    clearPlaylist,
    updateSettings,

    formatTime,
  };
}
