import { AudioLines } from 'lucide-react';
import { Card } from '../ui/card';

interface AlbumArtProps {
  image: string;
  title: string;
  artist: string;
}

export function AlbumArt({ image, title, artist }: AlbumArtProps) {
  return (
    <figure className='flex justify-center py-4'>
      <div className='group relative h-72 w-72 sm:h-80 sm:w-80'>
        <Card className='card-shadow-lg border-border/20 from-muted/50 to-muted relative h-full w-full overflow-hidden rounded-3xl border-2 bg-gradient-to-br'>
          <div className='from-primary/20 to-accent/20 absolute inset-0 bg-gradient-to-br via-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100' />

          <div className='relative flex h-full w-full items-center justify-center'>
            {image ? (
              <img
                src={image}
                alt={`Album cover for ${title} by ${artist}`}
                className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
                width={320}
                height={320}
                loading='lazy'
              />
            ) : (
              <div className='text-muted-foreground/60 flex flex-col items-center justify-center p-8'>
                <AudioLines
                  className='animate-pulse-gentle mb-4 h-20 w-20'
                  aria-hidden='true'
                />
                <p className='text-sm font-medium text-center'>
                  No album artwork
                </p>
              </div>
            )}
          </div>

          <div className='pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent' />
        </Card>

        <div className='bg-primary/20 absolute inset-0 -z-10 scale-95 rounded-3xl opacity-0 blur-2xl transition-all duration-500 group-hover:opacity-100' />
      </div>
    </figure>
  );
}
