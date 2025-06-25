interface SongInfoProps {
  title: string;
  artist: string;
}

export function SongInfo({ title, artist }: SongInfoProps) {
  return (
    <section className='text-center space-y-4'>
      <div>
        <h2 className='text-2xl font-bold mb-2' aria-label='Song title'>
          {title}
        </h2>
        <p
          className='text-lg text-muted-foreground font-medium'
          aria-label='Artist'
        >
          {artist}
        </p>
      </div>
    </section>
  );
}
