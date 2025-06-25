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
          className='w-full group'
          aria-label='Seek slider'
          aria-valuenow={progressPercent}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
      <div className='flex items-center justify-between text-sm'>
        <time
          className='text-foreground bg-muted/50 min-w-[3rem] rounded-sm px-2 py-1 text-center font-mono font-medium'
          aria-label='Current time'
          dateTime={`PT${Math.floor(currentTime)}S`}
        >
          {formatTime(currentTime)}
        </time>

        <time
          className='text-muted-foreground bg-muted/30 min-w-[3rem] rounded-sm px-2 py-1 text-center font-mono font-medium'
          aria-label='Total duration'
          dateTime={`PT${Math.floor(duration)}S`}
        >
          {formatTime(duration)}
        </time>
      </div>
    </section>
  );
}
