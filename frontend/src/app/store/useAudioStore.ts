import { create } from 'zustand';
import { soundscape } from '../../utils/audioSynthesizer';

export type TrackType = 'fireplace' | 'rain' | 'library';

export const mapMoodToTrack = (mood: string): TrackType => {
  const m = mood.toLowerCase();
  if (m.includes('ecstatic') || m.includes('happy') || m.includes('excited')) {
    return 'fireplace';
  } else if (m.includes('sad') || m.includes('anxious') || m.includes('tired') || m.includes('angry')) {
    return 'rain';
  } else {
    return 'library';
  }
};

interface AudioState {
  isPlaying: boolean;
  track: TrackType;
  volume: number;
  togglePlay: () => void;
  setTrack: (track: TrackType) => void;
  setTrackByMood: (mood: string) => void;
  setVolume: (vol: number) => void;
}

export const useAudioStore = create<AudioState>((set, get) => ({
  isPlaying: false,
  track: 'fireplace',
  volume: 0.3,

  togglePlay: () => {
    const { isPlaying, track, volume } = get();
    if (isPlaying) {
      soundscape.stop();
      set({ isPlaying: false });
    } else {
      soundscape.play(track, volume);
      set({ isPlaying: true });
    }
  },

  setTrack: (track) => {
    const { volume } = get();
    set({ track });
    if (get().isPlaying) {
      soundscape.play(track, volume);
    }
  },

  setTrackByMood: (mood) => {
    const targetTrack = mapMoodToTrack(mood);
    get().setTrack(targetTrack);
  },

  setVolume: (volume) => {
    set({ volume });
    soundscape.setVolume(volume);
  },
}));
