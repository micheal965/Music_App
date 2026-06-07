import TrackPlayer, {
  Capability,
  AppKilledPlaybackBehavior,
} from 'react-native-track-player';

export async function setupPlayer() {
  let isSetup = false;
  try {
    // Check if already set up
    await TrackPlayer.getActiveTrackIndex();
    isSetup = true;
    console.log('Track player already initialized');
  } catch {
    // Not initialized, so set it up
    try {
      await TrackPlayer.setupPlayer();
      console.log('Track player setup completed');
      
      await TrackPlayer.updateOptions({
        android: {
          appKilledPlaybackBehavior:
            AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
        },
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.SeekTo,
        ],
        compactCapabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
        ],
      });
      console.log('Track player options updated');
      isSetup = true;
    } catch (error) {
      console.error('Error setting up track player:', error);
      throw error;
    }
  }
  return isSetup;
}
