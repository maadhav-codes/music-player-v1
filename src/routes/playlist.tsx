import { Button } from '@/components/ui/button';
import { useMusicPlayer } from '@/hooks/use-music-player';
import { cn } from '@/lib/utils';
import { Heart, Music, Play, Shuffle, Trash2 } from 'lucide-react';

export default function PlaylistTab() {
  const {
    songs,
    favorites,
    playerState,
    selectSong,
    clearPlaylist,
    formatTime,
  } = useMusicPlayer();

  const totalDuration = songs.reduce((total, song) => {
    const [mins, secs] = song.duration.split(':').map(Number);
    return total + mins * 60 + secs;
  }, 0);

  const playAll = () => {
    if (songs.length > 0) {
      selectSong(0);
    }
  };

  const shuffleAll = () => {
    if (songs.length > 0) {
      const randomIndex = Math.floor(Math.random() * songs.length);
      selectSong(randomIndex);
    }
  };

  if (songs.length === 0) {
    return (
      <section
        className='flex flex-col h-full'
        aria-labelledby='empty-playlist-heading'
      >
        <header className='p-6 text-center border-b'>
          <h2 id='empty-playlist-heading' className='text-2xl font-bold mb-2'>
            Your Playlist
          </h2>
          <p className='text-muted-foreground text-sm'>
            No songs in your playlist
          </p>
        </header>

        <div className='flex-1 flex items-center justify-center'>
          <article className='text-center space-y-6'>
            <div
              className='text-6xl text-muted-foreground/50'
              aria-hidden='true'
            >
              <Music className='w-16 h-16 mx-auto' />
            </div>
            <div>
              <h3 className='text-xl font-semibold mb-2'>
                No songs in playlist
              </h3>
              <p className='text-muted-foreground mb-6'>
                Add music files to get started
              </p>
              <Button aria-label='Browse files to add to playlist'>
                Browse Files
              </Button>
            </div>
          </article>
        </div>
      </section>
    );
  }

  return (
    <section
      className='flex flex-col h-full'
      aria-labelledby='playlist-heading'
    >
      <header className='p-6 text-center border-b'>
        <h2 id='playlist-heading' className='text-2xl font-bold mb-2'>
          Your Playlist
        </h2>
        <div className='flex items-center justify-center gap-2 text-sm text-muted-foreground'>
          <span>
            {songs.length} song{songs.length !== 1 ? 's' : ''}
          </span>
          <span aria-hidden='true'>•</span>
          <span>{formatTime(totalDuration)} total</span>
        </div>
      </header>

      <nav aria-label='Playlist controls' className='p-4 border-b'>
        <div className='flex gap-3 flex-wrap'>
          <Button
            onClick={playAll}
            className='flex-1 min-w-[150px]'
            aria-label='Play all songs'
          >
            <Play className='w-4 h-4 mr-1' />
            Play All
          </Button>
          <Button
            variant='outline'
            onClick={shuffleAll}
            className='flex-1 min-w-[150px]'
            aria-label='Shuffle playlist'
          >
            <Shuffle className='w-4 h-4 mr-1' />
            Shuffle
          </Button>
          <Button
            variant='destructive'
            onClick={clearPlaylist}
            className='flex-1 min-w-[150px]'
            aria-label='Clear playlist'
          >
            <Trash2 className='w-4 h-4 mr-1' />
            Clear
          </Button>
        </div>
      </nav>

      <ul className='flex-1 overflow-y-auto' aria-label='Song list'>
        {songs.map((song, index) => {
          const isActive = index === playerState.currentSongIndex;
          const isFavorite = favorites.has(song.id);

          return (
            <li
              key={song.id}
              className={cn(
                'p-4 border-b transition-colors hover:bg-muted/50',
                isActive && 'bg-primary/10 border-l-4 border-l-primary'
              )}
              aria-current={isActive ? 'true' : undefined}
            >
              <button
                onClick={() => selectSong(index)}
                className='w-full text-left'
                aria-label={`Play ${song.title} by ${song.artist}`}
              >
                <div className='flex justify-between items-center'>
                  <div className='flex-1 min-w-0'>
                    <div className='flex items-center gap-2'>
                      <h3 className='font-semibold truncate'>{song.title}</h3>
                      {isFavorite && (
                        <Heart
                          className='w-4 h-4 text-red-500 fill-current'
                          aria-label='Favorite song'
                        />
                      )}
                    </div>
                    <p className='text-sm text-muted-foreground truncate'>
                      {song.artist}
                    </p>
                    {song.isLocal && (
                      <p className='text-xs text-muted-foreground truncate'>
                        File: {song.fileName} ({song.fileSize})
                      </p>
                    )}
                  </div>
                  <time
                    className='text-sm text-muted-foreground font-mono'
                    dateTime={`PT${song.duration.replace(':', 'M')}S`}
                  >
                    {song.duration}
                  </time>
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
