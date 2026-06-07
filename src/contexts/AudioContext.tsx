import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useRef,
} from 'react';
import Sound from 'react-native-sound';
import { SongType } from '@/Constants/SongType';

// Enable playback in silence mode (iOS)
Sound.setCategory('Playback');

interface AudioContextType {
  currentTrack: SongType | null;
  currentIndex: number;
  isPlaying: boolean;
  position: number;
  duration: number;
  isPlayerReady: boolean;
  play: () => void;
  pause: () => void;
  skipToNext: () => void;
  skipToPrevious: () => void;
  loadQueue: (songs: SongType[]) => void;
  seekTo: (position: number) => void;
  playSong: (song: SongType, queue: SongType[]) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider = ({ children }: { children: ReactNode }) => {
  const [currentTrack, setCurrentTrack] = useState<SongType | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);

  const [queue, setQueue] = useState<SongType[]>([]);
  
  const loadIdRef = useRef(0);
  const soundRef = useRef<Sound | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Clean up sound on unmount
  useEffect(() => {
    return () => {
      if (soundRef.current) {
        soundRef.current.release();
      }
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, []);

  // Update progress
  useEffect(() => {
    if (isPlaying && soundRef.current) {
      progressIntervalRef.current = setInterval(() => {
        soundRef.current?.getCurrentTime((seconds) => {
          setPosition(seconds);
        });
      }, 250);
    } else {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
    }

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [isPlaying]);
  const loadSound = (song: SongType, autoPlay = false) => {
    const loadId = ++loadIdRef.current;

    if (soundRef.current) {
      soundRef.current.stop();
      soundRef.current.release();
      soundRef.current = null;
    }

    const sound = new Sound(song.url, '', (error) => {
      if (error) return;

      // Ignore old loads
      if (loadId !== loadIdRef.current) {
        sound.release();
        return;
      }

      soundRef.current = sound;

      setCurrentTrack(song);
      setDuration(sound.getDuration());

      if (autoPlay) {
        setIsPlaying(true);

        sound.play(() => {
          setIsPlaying(false);
          skipToNext();
        });
      }
    });
  };
  const play = () => {
    if (soundRef.current) {
      soundRef.current.play((success) => {
        if (success) {
          console.log('Finished playing');
          setIsPlaying(false);
          skipToNext();
        }
      });
      setIsPlaying(true);
    } else if (queue.length > 0) {
      loadSound(queue[currentIndex], true);
    }
  };

  const pause = () => {
    if (soundRef.current) {
      soundRef.current.pause();
      setIsPlaying(false);
    }
  };

  const skipToNext = () => {
    if (queue.length === 0) return;

    const nextIndex = (currentIndex + 1) % queue.length;
    setCurrentIndex(nextIndex);
    loadSound(queue[nextIndex], isPlaying);
  };

  const skipToPrevious = () => {
    if (queue.length === 0) return;

    const prevIndex = currentIndex === 0 ? queue.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    loadSound(queue[prevIndex], isPlaying);
  };

  const seekTo = (seconds: number) => {
    if (soundRef.current) {
      soundRef.current.setCurrentTime(seconds);
      setPosition(seconds);
    }
  };

  const loadQueue = (songs: SongType[]) => {
    setQueue(songs);
    setCurrentIndex(0);
    if (songs.length > 0) {
      loadSound(songs[0], false);
    }
  };

  const playSong = (song: SongType, newQueue: SongType[]) => {
    setQueue(newQueue);
    const index = newQueue.findIndex((s) => s.url === song.url);
    if (index >= 0) {
      setCurrentIndex(index);
      loadSound(song, true);
    }
  };

  return (
    <AudioContext.Provider
      value={{
        currentTrack,
        currentIndex,
        isPlaying,
        position,
        duration,
        isPlayerReady: true,
        play,
        pause,
        skipToNext,
        skipToPrevious,
        loadQueue,
        seekTo,
        playSong,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudioPlayer = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudioPlayer must be used within AudioProvider');
  }
  return context;
};
