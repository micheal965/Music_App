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

export type RepeatMode = 'off' | 'all' | 'one';

interface AudioContextType {
  currentTrack: SongType | null;
  currentIndex: number;
  isPlaying: boolean;
  position: number;
  duration: number;
  isPlayerReady: boolean;
  isMuted: boolean;
  repeatMode: RepeatMode;
  isShuffled: boolean;
  play: () => void;
  pause: () => void;
  skipToNext: () => void;
  skipToPrevious: () => void;
  loadQueue: (songs: SongType[]) => void;
  playSong: (song: SongType, queue: SongType[]) => void;
  toggleMute: () => void;
  toggleRepeat: () => void;
  toggleShuffle: () => void;
  seekTo: (seconds: number) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider = ({ children }: { children: ReactNode }) => {
  const [currentTrack, setCurrentTrack] = useState<SongType | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [repeatMode, setRepeatMode] = useState<RepeatMode>('off');
  const [isShuffled, setIsShuffled] = useState(false);

  const [queue, setQueue] = useState<SongType[]>([]);
  const originalQueueRef = useRef<SongType[]>([]);

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
          handleTrackEnd();
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
          handleTrackEnd();
        }
      });
      setIsPlaying(true);
    } else if (queue.length > 0) {
      loadSound(queue[currentIndex], true);
    }
  };

  const handleTrackEnd = () => {
    if (repeatMode === 'one') {
      // Replay the same track
      if (soundRef.current) {
        soundRef.current.setCurrentTime(0);
        soundRef.current.play(() => {
          setIsPlaying(false);
          handleTrackEnd();
        });
        setIsPlaying(true);
      }
    } else if (repeatMode === 'all') {
      // Go to next track (will loop back to first after last)
      skipToNext();
    } else {
      // Repeat off: only skip if not the last track
      if (currentIndex < queue.length - 1) {
        skipToNext();
      }
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

  const loadQueue = (songs: SongType[]) => {
    setQueue(songs);
    originalQueueRef.current = songs;
    setCurrentIndex(0);
    setIsShuffled(false);
    if (songs.length > 0) {
      loadSound(songs[0], false);
    }
  };

  const playSong = (song: SongType, newQueue: SongType[]) => {
    setQueue(newQueue);
    originalQueueRef.current = newQueue;
    setIsShuffled(false);
    const index = newQueue.findIndex((s) => s.url === song.url);
    if (index >= 0) {
      setCurrentIndex(index);
      loadSound(song, true);
    }
  };

  const toggleMute = () => {
    if (soundRef.current) {
      const newMutedState = !isMuted;
      soundRef.current.setVolume(newMutedState ? 0 : 1);
      setIsMuted(newMutedState);
    }
  };

  const toggleRepeat = () => {
    setRepeatMode((current) => {
      if (current === 'off') return 'all';
      if (current === 'all') return 'one';
      return 'off';
    });
  };

  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const toggleShuffle = () => {
    if (!currentTrack || queue.length === 0) {
      setIsShuffled(!isShuffled);
      return;
    }

    if (isShuffled) {
      // Turn off shuffle - restore original order
      const originalIndex = originalQueueRef.current.findIndex(
        (song) => song.url === currentTrack.url
      );
      setQueue(originalQueueRef.current);
      setCurrentIndex(originalIndex >= 0 ? originalIndex : 0);
      setIsShuffled(false);
    } else {
      // Turn on shuffle
      originalQueueRef.current = [...queue];
      
      // Create shuffled queue with current track at the beginning
      const otherSongs = queue.filter((song) => song.url !== currentTrack.url);
      const shuffledOthers = shuffleArray(otherSongs);
      const newQueue = [currentTrack, ...shuffledOthers];
      
      setQueue(newQueue);
      setCurrentIndex(0);
      setIsShuffled(true);
    }
  };

  const seekTo = (seconds: number) => {
    if (soundRef.current) {
      soundRef.current.setCurrentTime(seconds);
      setPosition(seconds);
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
        isMuted,
        repeatMode,
        isShuffled,
        play,
        pause,
        skipToNext,
        skipToPrevious,
        loadQueue,
        playSong,
        toggleMute,
        toggleRepeat,
        toggleShuffle,
        seekTo,
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
