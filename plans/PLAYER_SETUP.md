# Music Player Setup Guide

## ✅ What's Been Implemented

### Core Features
- ✅ Play/Pause functionality
- ✅ Next/Previous track navigation
- ✅ Real-time progress bar
- ✅ Time display (current/total)
- ✅ Dynamic track info display
- ✅ Audio playback with react-native-track-player

### Components Updated
1. **PlayPauseButton** - Connected to audio player
2. **NextButton** - Skips to next track
3. **PreviousButton** - Skips to previous track
4. **ProgressBar** - Shows real-time playback progress
5. **PlayerScreen** - Displays current track info and time
6. **FloatingPlayer** - Mini player with current track
7. **HomeScreen** - Loads songs on startup

### New Files Created
- `src/contexts/AudioContext.tsx` - Audio state management
- `src/services/trackPlayerService.ts` - Track player initialization
- `src/services/playbackService.ts` - Background playback service
- `src/utils/formatTime.ts` - Time formatting utility
- `index.js` - App entry with track player service registration

## 🚀 How to Run

### Android

1. **Clean and rebuild:**
   ```bash
   cd android
   gradlew clean
   cd ..
   ```

2. **Run the app:**
   ```bash
   yarn android
   ```

### iOS (if applicable)

1. **Install pods:**
   ```bash
   cd ios
   pod install
   cd ..
   ```

2. **Run the app:**
   ```bash
   yarn ios
   ```

## 🎵 How It Works

### Song Queue
- On app startup, recommended songs are loaded into the queue
- Songs are defined in `src/data/songs.ts`

### Controls
- **Play/Pause**: Tap the play button on FloatingPlayer or PlayerScreen
- **Next**: Skip to the next song in the queue
- **Previous**: Go back to the previous song
- **Progress Bar**: Shows real-time playback progress

### Audio Context
The `AudioContext` provides:
- `currentTrack` - Currently playing track info
- `isPlaying` - Play/pause state
- `position` - Current playback position (seconds)
- `duration` - Total track duration (seconds)
- `play()` - Start playback
- `pause()` - Pause playback
- `skipToNext()` - Next track
- `skipToPrevious()` - Previous track
- `loadQueue(songs)` - Load songs into queue
- `seekTo(position)` - Seek to position (future feature)

## 🎛️ Usage

### In Your Components

```tsx
import { useAudioPlayer } from '@/contexts/AudioContext';

const MyComponent = () => {
  const { currentTrack, isPlaying, play, pause } = useAudioPlayer();
  
  return (
    <View>
      <Text>{currentTrack?.title}</Text>
      <Button onPress={isPlaying ? pause : play} />
    </View>
  );
};
```

### Load Custom Songs

```tsx
const mySongs = [
  {
    url: 'https://example.com/song.mp3',
    title: 'My Song',
    artist: 'My Artist',
    artwork: 'https://example.com/artwork.jpg',
  },
];

const { loadQueue } = useAudioPlayer();
loadQueue(mySongs);
```

## 🐛 Troubleshooting

### Build Issues
If you encounter build issues:
1. Clean the project: `cd android && gradlew clean`
2. Delete node_modules: `rm -rf node_modules && yarn install`
3. Reset metro cache: `yarn start --reset-cache`

### Audio Not Playing
- Check internet connection (songs are streamed)
- Verify song URLs are accessible
- Check device volume
- Look for errors in the console

### Android Permissions
Ensure these permissions are in `android/app/src/main/AndroidManifest.xml`:
```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
<uses-permission android:name="android.permission.WAKE_LOCK" />
```

## 📱 Testing

1. Launch the app
2. You should see the FloatingPlayer at the bottom of the Home screen
3. Tap the play button - the first song should start playing
4. Test next/previous buttons
5. Navigate to the Player screen (tap FloatingPlayer or Player tab)
6. Verify the progress bar updates in real-time
7. Check that time display updates (00:00 / 03:45)

## 🎯 Next Steps (Optional Enhancements)

- [ ] Add seek functionality (drag progress bar)
- [ ] Implement shuffle mode
- [ ] Implement repeat mode
- [ ] Add volume control
- [ ] Save playback state (persist on app restart)
- [ ] Add playlist management
- [ ] Implement like/favorite functionality
- [ ] Add background playback notifications
- [ ] Lock screen controls
