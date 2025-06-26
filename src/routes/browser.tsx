import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useMusicPlayer } from '@/hooks/use-music-player';
import { Upload, FolderOpen, Loader2 } from 'lucide-react';
import type { Song } from '@/types/data';

export default function BrowseTab() {
  const { addSongs, songs } = useMusicPlayer();
  const [isDragOver, setIsDragOver] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const supportedFormats = [
    'audio/mpeg',
    'audio/mp3',
    'audio/wav',
    'audio/ogg',
    'audio/aac',
    'audio/flac',
    'audio/m4a',
    'audio/webm',
  ];

  const isAudioFile = (file: File): boolean => {
    return (
      supportedFormats.includes(file.type) ||
      /\.(mp3|wav|ogg|aac|flac|m4a|webm)$/i.test(file.name)
    );
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const extractTitle = (filename: string): string => {
    return filename
      .replace(/\.[^/.]+$/, '')
      .replace(/[-_]/g, ' ')
      .trim();
  };

  const createSongFromFile = (file: File): Promise<Song> => {
    return new Promise((resolve, reject) => {
      const url = URL.createObjectURL(file);
      const audio = new Audio();
      audio.src = url;

      const cleanup = () => {
        audio.removeEventListener('loadedmetadata', onLoaded);
        audio.removeEventListener('error', onError);
      };

      const onLoaded = () => {
        cleanup();
        const duration = Math.floor(audio.duration);
        const mins = Math.floor(duration / 60);
        const secs = duration % 60;
        const formattedDuration = `${mins}:${secs.toString().padStart(2, '0')}`;

        const song: Song = {
          id: `local-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
          title: extractTitle(file.name),
          artist: 'Unknown Artist',
          album: 'Local Files',
          src: url,
          image: '/placeholder.svg?height=300&width=300',
          duration: formattedDuration,
          isLocal: true,
          fileName: file.name,
          fileSize: formatFileSize(file.size),
          fileType: file.type || 'audio/unknown',
          format: file.type.split('/')[1]?.toUpperCase() || 'Unknown',
          bitrate: 'Unknown',
        };
        resolve(song);
      };

      const onError = () => {
        cleanup();
        URL.revokeObjectURL(url);
        reject(new Error(`Failed to load audio file: ${file.name}`));
      };

      audio.addEventListener('loadedmetadata', onLoaded, { once: true });
      audio.addEventListener('error', onError, { once: true });

      setTimeout(() => {
        cleanup();
        reject(new Error(`Timeout loading metadata for: ${file.name}`));
      }, 10000);
    });
  };

  const processFiles = async (files: File[]) => {
    setError(null);
    setIsProcessing(true);

    try {
      const audioFiles = files.filter(isAudioFile);

      if (audioFiles.length === 0) {
        throw new Error(
          'No supported audio files found. Please select MP3, WAV, OGG, or other supported formats.'
        );
      }

      const processingPromises = audioFiles.map(file =>
        createSongFromFile(file).catch(error => {
          console.error(`Error processing file ${file.name}:`, error);
          return null;
        })
      );

      const results = await Promise.all(processingPromises);
      const newSongs = results.filter(Boolean) as Song[];

      if (newSongs.length === 0) {
        throw new Error(
          'Could not process any of the selected files. Please check the file formats.'
        );
      }

      addSongs(newSongs);
    } catch (error) {
      console.error('Error processing files:', error);
      setError(
        error instanceof Error ? error.message : 'An unexpected error occurred'
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length > 0) {
      processFiles(files);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
    const files = Array.from(event.dataTransfer.files);
    if (files.length > 0) {
      processFiles(files);
    }
  };

  const handleBrowseClick = () => {
    if (!isProcessing) {
      fileInputRef.current?.click();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if ((event.key === 'Enter' || event.key === ' ') && !isProcessing) {
      handleBrowseClick();
    }
  };

  return (
    <div className='flex flex-col h-full'>
      <header className='p-6 text-center border-b'>
        <h1 className='text-2xl font-bold mb-2'>Add Music</h1>
        <p className='text-muted-foreground text-sm'>
          Build your personal music library
        </p>
      </header>

      <section className='flex-1 p-4 space-y-6'>
        <article
          role='region'
          aria-labelledby='upload-heading'
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all hover:border-primary/50 ${
            isDragOver
              ? 'border-primary bg-primary/5'
              : 'border-muted-foreground/25'
          } ${isProcessing ? 'opacity-50 pointer-events-none' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleBrowseClick}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          aria-disabled={isProcessing}
        >
          <div className='space-y-4'>
            <div className='text-4xl text-muted-foreground'>
              {isProcessing ? (
                <Loader2 className='w-16 h-16 mx-auto animate-spin' />
              ) : (
                <Upload className='w-16 h-16 mx-auto' />
              )}
            </div>
            <div>
              <h2 id='upload-heading' className='text-xl font-semibold mb-3'>
                Add Your Music
              </h2>
              <p className='text-muted-foreground mb-6'>
                {isProcessing
                  ? 'Processing files...'
                  : 'Drag & drop files here or click to browse'}
              </p>
              <Button disabled={isProcessing} aria-label='Browse files'>
                <FolderOpen className='w-4 h-4 mr-2' />
                Browse Files
              </Button>
            </div>
          </div>
          <input
            ref={fileInputRef}
            type='file'
            multiple
            accept='audio/*'
            onChange={handleFileSelect}
            className='hidden'
            aria-hidden='true'
            id='file-upload'
          />
        </article>

        {error && (
          <div
            role='alert'
            className='bg-destructive/15 text-destructive p-4 rounded-lg text-sm'
          >
            {error}
          </div>
        )}

        <section
          aria-labelledby='supported-formats-heading'
          className='text-center space-y-4'
        >
          <h3
            id='supported-formats-heading'
            className='font-medium text-muted-foreground'
          >
            Supported Formats
          </h3>
          <div className='flex flex-wrap gap-2 justify-center'>
            {['MP3', 'WAV', 'OGG', 'AAC', 'FLAC', 'M4A'].map(format => (
              <span
                key={format}
                className='bg-muted px-3 py-1 rounded-full text-xs font-medium border'
                aria-label={`${format} format`}
              >
                {format}
              </span>
            ))}
          </div>
        </section>

        <section aria-labelledby='recent-files-heading' className='space-y-4'>
          <h3 id='recent-files-heading' className='text-lg font-semibold'>
            Recently Added
          </h3>

          {songs.length === 0 ? (
            <Card className='p-4'>
              <p className='text-muted-foreground italic text-center text-sm'>
                No recent files
              </p>
            </Card>
          ) : (
            <ul className='flex-1 overflow-y-auto' aria-label='Song list'>
              {songs.map(song => (
                <li
                  key={song.id}
                  className='p-4 border-b transition-colors hover:bg-muted/50'
                >
                  <div className='flex justify-between items-center'>
                    <div className='flex-1 min-w-0'>
                      <div className='flex items-center gap-2'>
                        <h3 className='font-semibold truncate'>{song.title}</h3>
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
                </li>
              ))}
            </ul>
          )}
        </section>
      </section>
    </div>
  );
}
