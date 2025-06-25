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
      <div className='relative w-64 h-64 sm:w-72 sm:h-72'>
        <Card className='relative h-full w-full overflow-hidden rounded-3xl'>
          {image ? (
            <img
              src={image}
              alt={`Album cover for ${title} by ${artist}`}
              className='w-full h-full object-cover'
              width={288}
              height={288}
              loading='lazy'
            />
          ) : (
            <AudioLines
              className='w-full h-full object-cover text-slate-200'
              width={288}
              height={288}
            />
          )}
        </Card>
      </div>
    </figure>
  );
}
