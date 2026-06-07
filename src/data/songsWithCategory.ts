import { SongType } from './../Constants/SongType';
import {
  likedSongs,
  newReleasesSongs,
  recommendedSongs,
  topHitsSongs,
} from './songs';

type CategorySongs = {
  id: number;
  title: string;
  songs: SongType[];
};

export const songsWithCategory: CategorySongs[] = [
  {
    id: 1,
    title: 'Recommended for you',
    songs: recommendedSongs,
  },
  {
    id: 2,
    title: 'Your Liked Songs',
    songs: likedSongs,
  },
  {
    id: 5,
    title: 'Top Hits',
    songs: topHitsSongs,
  },
  {
    id: 6,
    title: 'New Releases',
    songs: newReleasesSongs,
  },
];
