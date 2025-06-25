import { Slider } from '../ui/slider';

interface ProgressBarProps {
  currentTime: number;
  duration: number;
  formatTime: (seconds: number) => string;
  onSeek: (value: number[]) => void;
}

export function ProgressBar({
  currentTime,
  duration,
  formatTime,
  onSeek,
}: ProgressBarProps) {
  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <section className='space-y-3' aria-label='Playback progress'>
      <div className='px-2'>
        <Slider
          value={[progressPercent]}
          onValueChange={onSeek}
          max={100}
          step={0.1}
          className='w-full'
          aria-label='Seek slider'
          aria-valuenow={progressPercent}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
      <div className='flex justify-between text-sm text-muted-foreground font-mono'>
        <span aria-label='Current time'>{formatTime(currentTime)}</span>
        <span aria-label='Duration'>{formatTime(duration)}</span>
      </div>
    </section>
  );
}
