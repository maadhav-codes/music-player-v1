import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useMusicPlayer } from '@/hooks/use-music-player';
import { Upload, FolderOpen, Loader2 } from 'lucide-react';
import type { Song } from '@/types/data';

export default function BrowseTab() {
  const { addSongs } = useMusicPlayer();
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
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    );
  };

  const extractTitle = (filename: string): string => {
    return filename
      .replace(/\.[^/.]+$/, '')
      .replace(/[-_]/g, ' ')
      .trim();
  };

  const createSongFromFile = async (file: File): Promise<Song> => {
    return new Promise((resolve, reject) => {
      const url = URL.createObjectURL(file);
      const audio = new Audio();
      audio.src = url;

      audio.addEventListener('loadedmetadata', () => {
        const duration = Math.floor(audio.duration);
        const mins = Math.floor(duration / 60);
        const secs = duration % 60;
        const formattedDuration = `${mins}:${secs.toString().padStart(2, '0')}`;

        const song: Song = {
          id: `local-${Date.now()}-${Math.random()}`,
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
      });

      audio.addEventListener('error', () => {
        URL.revokeObjectURL(url);
        reject(new Error(`Failed to load audio file: ${file.name}`));
      });
    });
  };

  const processFiles = async (files: File[]) => {
    setError(null);
    setIsProcessing(true);
    const audioFiles = files.filter(isAudioFile);

    if (audioFiles.length === 0) {
      setError(
        'No supported audio files found. Please select MP3, WAV, OGG, or other supported formats.'
      );
      setIsProcessing(false);
      return;
    }

    try {
      const newSongs: Song[] = [];
      for (const file of audioFiles) {
        try {
          const song = await createSongFromFile(file);
          newSongs.push(song);
        } catch (error) {
          console.error(`Error processing file ${file.name}:`, error);
        }
      }

      if (newSongs.length > 0) {
        addSongs(newSongs);
      } else {
        setError(
          'Could not process any of the selected files. Please check the file formats.'
        );
      }
    } catch (error) {
      console.error('Error processing files:', error);
      setError('An unexpected error occurred while processing your files.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    processFiles(files);
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
    processFiles(files);
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
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
          <Card className='p-4'>
            <p className='text-muted-foreground italic text-center text-sm'>
              No recent files
            </p>
          </Card>
        </section>
      </section>
    </div>
  );
}
