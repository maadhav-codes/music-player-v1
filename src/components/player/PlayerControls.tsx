import type { RepeatMode } from '@/types/data';
import {
  Pause,
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
} from 'lucide-react';
import { Button } from '../ui/button';

interface PlayerControlsProps {
  isPlaying: boolean;
  isShuffled: boolean;
  repeatMode: RepeatMode;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onShuffle: () => void;
  onRepeat: () => void;
}

export function PlayerControls({
  isPlaying,
  isShuffled,
  repeatMode,
  onPlayPause,
  onNext,
  onPrevious,
  onShuffle,
  onRepeat,
}: PlayerControlsProps) {
  const getRepeatIcon = () => {
    switch (repeatMode) {
      case 1:
        return (
          <div className='relative'>
            <Repeat className='w-5 h-5' aria-hidden='true' />
          </div>
        );
      case 2:
        return (
          <div className='relative'>
            <Repeat className='w-5 h-5' aria-hidden='true' />
            <span className='absolute -top-2 -right-2 text-xs'>1</span>
          </div>
        );
      default:
        return <Repeat className='w-5 h-5' aria-hidden='true' />;
    }
  };

  return (
    <nav
      className='flex items-center justify-center gap-4'
      aria-label='Player controls'
    >
      <Button
        variant={isShuffled ? 'default' : 'outline'}
        size='icon'
        onClick={onShuffle}
        aria-label={isShuffled ? 'Shuffle on' : 'Shuffle off'}
      >
        <Shuffle className='w-5 h-5' aria-hidden='true' />
      </Button>

      <Button
        variant='outline'
        size='icon'
        onClick={onPrevious}
        aria-label='Previous song'
      >
        <SkipBack className='w-5 h-5' aria-hidden='true' />
      </Button>

      <Button
        size='icon'
        className='w-16 h-16 rounded-full'
        onClick={onPlayPause}
        aria-label={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? (
          <Pause className='w-6 h-6' aria-hidden='true' />
        ) : (
          <Play className='w-6 h-6 ml-1' aria-hidden='true' />
        )}
      </Button>

      <Button
        variant='outline'
        size='icon'
        onClick={onNext}
        aria-label='Next song'
      >
        <SkipForward className='w-5 h-5' aria-hidden='true' />
      </Button>

      <Button
        variant={repeatMode > 0 ? 'default' : 'outline'}
        size='icon'
        onClick={onRepeat}
        aria-label={`Repeat mode ${repeatMode}`}
      >
        {getRepeatIcon()}
      </Button>
    </nav>
  );
}
