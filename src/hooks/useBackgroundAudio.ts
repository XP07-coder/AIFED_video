import { useRef, useCallback, useEffect } from 'react';

interface UseBackgroundAudioProps {
  isPlaying: boolean;
  isMuted: boolean;
  currentTime: number;
  totalDuration: number;
}

export function useBackgroundAudio({ isPlaying, isMuted, currentTime, totalDuration }: UseBackgroundAudioProps) {
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const isInitializedRef = useRef(false);

  const initAudio = useCallback(() => {
    if (isInitializedRef.current) return;
    
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;

      const ctx = new AudioContextClass();
      audioContextRef.current = ctx;

      // Create master gain node
      const masterGain = ctx.createGain();
      masterGain.gain.value = 0.08; // Low volume for ambient
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Create ambient pad sound with multiple oscillators
      const frequencies = [130.81, 164.81, 196.00, 261.63]; // C3, E3, G3, C4 - C major chord
      
      frequencies.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        
        // Use sine waves for smooth ambient sound
        osc.type = 'sine';
        osc.frequency.value = freq;
        
        // Slight detune for warmth
        osc.detune.value = (i - 1.5) * 3;
        
        oscGain.gain.value = 0.25 / frequencies.length;
        
        osc.connect(oscGain);
        oscGain.connect(masterGain);
        osc.start();
        
        oscillatorsRef.current.push(osc);
      });

      // Add a subtle LFO (Low Frequency Oscillator) for movement
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.type = 'sine';
      lfo.frequency.value = 0.1; // Very slow modulation
      lfoGain.gain.value = 2;
      lfo.connect(lfoGain);
      
      // Connect LFO to first oscillator's frequency for subtle movement
      if (oscillatorsRef.current[0]) {
        lfoGain.connect(oscillatorsRef.current[0].frequency);
      }
      lfo.start();
      oscillatorsRef.current.push(lfo);

      // Add a second layer - higher shimmer
      const shimmerOsc = ctx.createOscillator();
      const shimmerGain = ctx.createGain();
      shimmerOsc.type = 'triangle';
      shimmerOsc.frequency.value = 523.25; // C5
      shimmerGain.gain.value = 0.03;
      shimmerOsc.connect(shimmerGain);
      shimmerGain.connect(masterGain);
      shimmerOsc.start();
      oscillatorsRef.current.push(shimmerOsc);

      isInitializedRef.current = true;
    } catch (e) {
      console.warn('Web Audio API not available:', e);
    }
  }, []);

  // Update audio based on scene/time
  useEffect(() => {
    if (!gainNodeRef.current || !audioContextRef.current) return;

    const ctx = audioContextRef.current;
    const progress = currentTime / totalDuration;
    
    // Modulate volume based on progress - build up intensity
    let targetVolume = 0.06;
    
    if (progress < 0.1) {
      // Intro - very subtle
      targetVolume = 0.04;
    } else if (progress < 0.3) {
      // Problem statement - slightly more
      targetVolume = 0.06;
    } else if (progress < 0.5) {
      // Solution - building
      targetVolume = 0.08;
    } else if (progress < 0.7) {
      // Technical details - steady
      targetVolume = 0.07;
    } else if (progress < 0.9) {
      // Impact - full
      targetVolume = 0.09;
    } else {
      // Conclusion - fade slightly
      targetVolume = 0.05;
    }

    gainNodeRef.current.gain.linearRampToValueAtTime(
      targetVolume,
      ctx.currentTime + 0.5
    );
  }, [currentTime, totalDuration]);

  // Handle play/pause
  useEffect(() => {
    if (!audioContextRef.current) return;

    if (isPlaying) {
      audioContextRef.current.resume();
    } else {
      audioContextRef.current.suspend();
    }
  }, [isPlaying]);

  // Handle mute
  useEffect(() => {
    if (!gainNodeRef.current || !audioContextRef.current) return;

    if (isMuted) {
      gainNodeRef.current.gain.linearRampToValueAtTime(0, audioContextRef.current.currentTime + 0.3);
    } else {
      gainNodeRef.current.gain.linearRampToValueAtTime(0.07, audioContextRef.current.currentTime + 0.3);
    }
  }, [isMuted]);

  // Cleanup
  useEffect(() => {
    return () => {
      oscillatorsRef.current.forEach(osc => {
        try { osc.stop(); } catch (e) {}
      });
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return { initAudio };
}
