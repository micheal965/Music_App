import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { SongType } from '@/Constants/SongType';
import { storage } from '@/App';

interface LikedSongsContextType {
  likedSongs: SongType[];
  isLiked: (songUrl: string) => boolean;
  toggleLike: (song: SongType) => void;
  addLike: (song: SongType) => void;
  removeLike: (songUrl: string) => void;
}

const LikedSongsContext = createContext<LikedSongsContextType | undefined>(
  undefined,
);

const STORAGE_KEY = 'likedSongs';

export const LikedSongsProvider = ({ children }: { children: ReactNode }) => {
  const [likedSongs, setLikedSongs] = useState<SongType[]>([]);

  // Load liked songs from storage on mount
  useEffect(() => {
    const loadLikedSongs = () => {
      try {
        const stored = storage.getString(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored) as SongType[];
          setLikedSongs(parsed);
        }
      } catch (error) {
        console.error('Failed to load liked songs:', error);
      }
    };

    loadLikedSongs();
  }, []);

  // Save liked songs to storage whenever they change
  const saveLikedSongs = (songs: SongType[]) => {
    try {
      storage.set(STORAGE_KEY, JSON.stringify(songs));
      setLikedSongs(songs);
    } catch (error) {
      console.error('Failed to save liked songs:', error);
    }
  };

  const isLiked = (songUrl: string): boolean => {
    return likedSongs.some((song) => song.url === songUrl);
  };

  const addLike = (song: SongType) => {
    if (!isLiked(song.url)) {
      const updatedLikedSongs = [...likedSongs, song];
      saveLikedSongs(updatedLikedSongs);
    }
  };

  const removeLike = (songUrl: string) => {
    const updatedLikedSongs = likedSongs.filter(
      (song) => song.url !== songUrl,
    );
    saveLikedSongs(updatedLikedSongs);
  };

  const toggleLike = (song: SongType) => {
    if (isLiked(song.url)) {
      removeLike(song.url);
    } else {
      addLike(song);
    }
  };

  return (
    <LikedSongsContext.Provider
      value={{
        likedSongs,
        isLiked,
        toggleLike,
        addLike,
        removeLike,
      }}
    >
      {children}
    </LikedSongsContext.Provider>
  );
};

export const useLikedSongs = () => {
  const context = useContext(LikedSongsContext);
  if (!context) {
    throw new Error('useLikedSongs must be used within LikedSongsProvider');
  }
  return context;
};
