// Procedural Web Audio API Soundscape Synthesizer
// Zero external network dependencies, 100% offline & performant

class SoundscapeSynthesizer {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private currentTrack: 'fireplace' | 'rain' | 'library' = 'fireplace';
  private gainNode: GainNode | null = null;
  private activeNodes: (AudioNode | number)[] = [];

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setTrack(track: 'fireplace' | 'rain' | 'library') {
    this.currentTrack = track;
    if (this.isPlaying) {
      this.stop();
      this.play(track);
    }
  }

  public play(track: 'fireplace' | 'rain' | 'library' = this.currentTrack, volume = 0.3) {
    this.initContext();
    if (!this.ctx) return;

    this.stop();
    this.currentTrack = track;
    this.isPlaying = true;

    this.gainNode = this.ctx.createGain();
    this.gainNode.gain.value = volume;
    this.gainNode.connect(this.ctx.destination);

    if (track === 'fireplace') {
      this.generateFireplace();
    } else if (track === 'rain') {
      this.generateRain();
    } else {
      this.generateLibrary();
    }
  }

  public stop() {
    this.activeNodes.forEach((node) => {
      if (typeof node === 'number') {
        window.clearInterval(node);
      } else if (node && 'stop' in node) {
        try {
          (node as any).stop();
        } catch (e) {}
      }
    });
    this.activeNodes = [];
    this.isPlaying = false;
  }

  public setVolume(vol: number) {
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setValueAtTime(vol, this.ctx.currentTime);
    }
  }

  public getIsPlaying() {
    return this.isPlaying;
  }

  // 1. Fireplace Crackle Generator
  private generateFireplace() {
    if (!this.ctx || !this.gainNode) return;

    // Continuous rumble
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 400;

    noise.connect(filter);
    filter.connect(this.gainNode);
    noise.start();
    this.activeNodes.push(noise);

    // Random pops & crackles
    const popInterval = window.setInterval(() => {
      if (!this.ctx || !this.gainNode || !this.isPlaying) return;
      const pop = this.ctx.createOscillator();
      const popGain = this.ctx.createGain();

      pop.type = 'sine';
      pop.frequency.setValueAtTime(100 + Math.random() * 300, this.ctx.currentTime);
      popGain.gain.setValueAtTime(0.2 + Math.random() * 0.3, this.ctx.currentTime);
      popGain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.05);

      pop.connect(popGain);
      popGain.connect(this.gainNode);
      pop.start();
      pop.stop(this.ctx.currentTime + 0.05);
    }, 120);

    this.activeNodes.push(popInterval);
  }

  // 2. Castle Rain Generator
  private generateRain() {
    if (!this.ctx || !this.gainNode) return;

    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 1000;

    noise.connect(filter);
    filter.connect(this.gainNode);
    noise.start();
    this.activeNodes.push(noise);
  }

  // 3. Hogwarts Library Ambience
  private generateLibrary() {
    if (!this.ctx || !this.gainNode) return;

    const osc = this.ctx.createOscillator();
    const oscGain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(110, this.ctx.currentTime); // Low A note drone
    oscGain.gain.setValueAtTime(0.15, this.ctx.currentTime);

    osc.connect(oscGain);
    oscGain.connect(this.gainNode);
    osc.start();
    this.activeNodes.push(osc);
  }
}

export const soundscape = new SoundscapeSynthesizer();
