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
            <span className='bg-primary text-primary-foreground absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full text-xs font-bold'>
              1
            </span>
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
        className={`h-12 w-12 rounded-full transition-all duration-200 ${
          isShuffled
            ? 'bg-primary text-primary-foreground scale-105 shadow-lg'
            : 'hover:bg-primary/10 hover:border-primary/50'
        }`}
      >
        <Shuffle className='w-5 h-5' aria-hidden='true' />
      </Button>

      <Button
        variant='outline'
        size='icon'
        onClick={onPrevious}
        aria-label='Previous song'
        className='hover:bg-primary/10 hover:border-primary/50 h-12 w-12 rounded-full transition-all duration-200'
      >
        <SkipBack className='w-5 h-5' aria-hidden='true' />
      </Button>

      <Button
        size='icon'
        className='from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 group h-20 w-20 rounded-full bg-gradient-to-br shadow-xl transition-all duration-200 hover:scale-105 hover:shadow-2xl'
        onClick={onPlayPause}
        aria-label={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? (
          <Pause
            className='text-primary-foreground h-8 w-8 drop-shadow-sm transition-transform duration-200 group-hover:scale-110'
            aria-hidden='true'
          />
        ) : (
          <Play
            className='text-primary-foreground ml-1 h-8 w-8 drop-shadow-sm transition-transform duration-200 group-hover:scale-110'
            aria-hidden='true'
          />
        )}
      </Button>

      <Button
        variant='outline'
        size='icon'
        onClick={onNext}
        aria-label='Next song'
        className='hover:bg-primary/10 hover:border-primary/50 h-12 w-12 rounded-full transition-all duration-200'
      >
        <SkipForward className='w-5 h-5' aria-hidden='true' />
      </Button>

      <Button
        variant={repeatMode > 0 ? 'default' : 'outline'}
        size='icon'
        onClick={onRepeat}
        aria-label={`Repeat mode ${repeatMode}`}
        className={`h-12 w-12 rounded-full transition-all duration-200 ${
          repeatMode > 0
            ? 'bg-primary text-primary-foreground scale-105 shadow-lg'
            : 'hover:bg-primary/10 hover:border-primary/50'
        }`}
      >
        {getRepeatIcon()}
      </Button>
    </nav>
  );
}
