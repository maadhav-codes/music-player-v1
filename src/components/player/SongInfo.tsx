interface SongInfoProps {
  title: string;
  artist: string;
}

export function SongInfo({ title, artist }: SongInfoProps) {
  return (
    <section className='text-center space-y-3'>
      <div className='space-y-2'>
        <h2
          className='text-display text-foreground mx-auto max-w-md leading-tight font-bold'
          aria-label='Song title'
        >
          {title}
        </h2>
        <p
          className='text-subheading text-muted-foreground font-medium'
          aria-label='Artist'
        >
          {artist}
        </p>
      </div>
    </section>
  );
}
