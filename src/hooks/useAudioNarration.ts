import { useRef, useCallback, useEffect } from 'react';

interface Subtitle {
  start: number;
  end: number;
  text: string;
}

interface UseAudioNarrationProps {
  subtitles: Subtitle[];
  currentTime: number;
  isPlaying: boolean;
  isMuted: boolean;
}

export function useAudioNarration({ subtitles, currentTime, isPlaying, isMuted }: UseAudioNarrationProps) {
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const currentUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const lastSpokenIndexRef = useRef<number>(-1);
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);

  // Initialize speech synthesis
  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      synthRef.current = window.speechSynthesis;
      
      const loadVoices = () => {
        voicesRef.current = window.speechSynthesis.getVoices();
      };
      
      loadVoices();
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  // Find the best voice for narration
  const getPreferredVoice = useCallback(() => {
    const voices = voicesRef.current;
    if (voices.length === 0) return null;

    // Prefer English voices
    const englishVoices = voices.filter(v => v.lang.startsWith('en'));
    
    // Prefer specific high-quality voices
    const preferredNames = [
      'Google UK English Female',
      'Google US English',
      'Microsoft Aria Online',
      'Microsoft Jenny Online',
      'Samantha',
      'Karen',
      'Daniel',
      'Alex',
    ];

    for (const name of preferredNames) {
      const voice = voices.find(v => v.name.includes(name));
      if (voice) return voice;
    }

    // Fallback to any English voice
    if (englishVoices.length > 0) return englishVoices[0];
    
    // Fallback to first available voice
    return voices[0];
  }, []);

  // Speak a subtitle
  const speakSubtitle = useCallback((subtitle: Subtitle) => {
    if (!synthRef.current || isMuted) return;

    // Cancel any ongoing speech
    synthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(subtitle.text);
    const voice = getPreferredVoice();
    
    if (voice) {
      utterance.voice = voice;
    }

    // Adjust speech parameters for natural pacing
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    currentUtteranceRef.current = utterance;
    synthRef.current.speak(utterance);
  }, [isMuted, getPreferredVoice]);

  // Track which subtitle should be spoken based on current time
  useEffect(() => {
    if (!isPlaying || isMuted) {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
      lastSpokenIndexRef.current = -1;
      return;
    }

    const currentIndex = subtitles.findIndex(
      s => currentTime >= s.start && currentTime < s.end
    );

    if (currentIndex !== -1 && currentIndex !== lastSpokenIndexRef.current) {
      lastSpokenIndexRef.current = currentIndex;
      speakSubtitle(subtitles[currentIndex]);
    }
  }, [currentTime, isPlaying, isMuted, subtitles, speakSubtitle]);

  // Handle mute/unmute
  useEffect(() => {
    if (isMuted && synthRef.current) {
      synthRef.current.cancel();
      lastSpokenIndexRef.current = -1;
    }
  }, [isMuted]);

  // Handle pause/resume
  useEffect(() => {
    if (!isPlaying && synthRef.current) {
      synthRef.current.pause();
    } else if (isPlaying && synthRef.current) {
      synthRef.current.resume();
    }
  }, [isPlaying]);

  const stopNarration = useCallback(() => {
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    lastSpokenIndexRef.current = -1;
  }, []);

  return { stopNarration };
}
