import { Button } from '@/components/ui/button';
import { useMusicPlayer } from '@/hooks/use-music-player';
import { AlbumArt } from '@/components/player/AlbumArt';
import { PlayerControls } from '@/components/player/PlayerControls';
import { ProgressBar } from '@/components/player/ProgressBar';
import { SongInfo } from '@/components/player/SongInfo';
import { Heart } from 'lucide-react';
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
        className='flex items-center justify-center h-full'
        aria-live='polite'
      >
        <p className='text-muted-foreground'>No song selected</p>
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
    <>
      <audio
        ref={audioRef}
        src={currentSong.src}
        aria-label={`Currently playing: ${currentSong.title} by ${currentSong.artist}`}
      />

      <header className='flex justify-between items-center'>
        <h2 className='text-muted-foreground text-sm font-medium tracking-wide capitalize'>
          Now Playing
        </h2>

        <Button
          variant={isFavorite ? 'default' : 'outline'}
          size='icon'
          onClick={() => toggleFavorite(currentSong.id)}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart
            className={cn('w-5 h-5', isFavorite && 'fill-current')}
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
    </>
  );
}
