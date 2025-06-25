import { Button } from '@/components/ui/button';
import { useMusicPlayer } from '@/hooks/use-music-player';
import { AlbumArt } from '@/components/player/AlbumArt';
import { PlayerControls } from '@/components/player/PlayerControls';
import { ProgressBar } from '@/components/player/ProgressBar';
import { SongInfo } from '@/components/player/SongInfo';
import { Heart, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Home() {
  const {
    currentSong,
    favorites,
    playerState,
    audioRef,
    togglePlayPause,
    nextSong,
    previousSong,
    toggleShuffle,
    toggleRepeat,
    seekTo,
    toggleFavorite,
    formatTime,
  } = useMusicPlayer();

  if (!currentSong) {
    return (
      <section
        className='flex h-full min-h-[60vh] flex-col items-center justify-center space-y-6'
        aria-live='polite'
      >
        <div className='text-muted-foreground/30 animate-pulse-gentle text-6xl'>
          🎵
        </div>
        <div className='space-y-2 text-center'>
          <h2 className='text-heading text-muted-foreground'>
            No song selected
          </h2>
          <p className='text-caption'>
            Choose a song from your playlist to start listening
          </p>
        </div>
      </section>
    );
  }

  const isFavorite = favorites.has(currentSong.id);

  const handleSeek = (value: number[]) => {
    if (playerState.duration > 0) {
      const newTime = (value[0] / 100) * playerState.duration;
      seekTo(newTime);
    }
  };

  return (
    <div className='space-y-8'>
      <audio
        ref={audioRef}
        src={currentSong.src}
        aria-label={`Currently playing: ${currentSong.title} by ${currentSong.artist}`}
      />

      <header className='flex items-center justify-between px-2'>
        <h2 className='text-caption text-primary font-medium tracking-wide capitalize'>
          Now Playing
        </h2>

        {playerState.isLoading && (
          <div className='flex items-center gap-2 text-caption'>
            <Loader2 className='w-3 h-3 animate-spin' />
            <span>Loading...</span>
          </div>
        )}

        <Button
          variant={isFavorite ? 'default' : 'outline'}
          size='icon'
          onClick={() => toggleFavorite(currentSong.id)}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          className={cn(
            'h-12 w-12 rounded-full transition-all duration-200',
            isFavorite && 'bg-red-500 text-white shadow-lg hover:bg-red-600'
          )}
        >
          <Heart
            className={cn(
              'h-5 w-5 transition-all duration-200',
              isFavorite && 'scale-110 fill-current'
            )}
            aria-hidden='true'
          />
        </Button>
      </header>

      <AlbumArt
        image={currentSong.image}
        title={currentSong.title}
        artist={currentSong.artist}
      />

      <SongInfo title={currentSong.title} artist={currentSong.artist} />

      <ProgressBar
        currentTime={playerState.currentTime}
        duration={playerState.duration}
        formatTime={formatTime}
        onSeek={handleSeek}
      />

      <PlayerControls
        isPlaying={playerState.isPlaying}
        isShuffled={playerState.isShuffled}
        repeatMode={playerState.repeatMode}
        onPlayPause={togglePlayPause}
        onNext={nextSong}
        onPrevious={previousSong}
        onShuffle={toggleShuffle}
        onRepeat={toggleRepeat}
      />
    </div>
  );
}
