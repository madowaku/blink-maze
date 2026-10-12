export class GameAudio {
  enabled = false;
  private music = new Audio(`${import.meta.env.BASE_URL}assets/audio/loop03.mp3`);
  private sounds = new Map<string, HTMLAudioElement>();
  constructor() {
    this.music.loop = true;
    this.music.volume = 0.16;
    this.music.preload = 'none';
    for (const name of ['move','blink','undo','clear','blocked']) {
      const audio = new Audio(`${import.meta.env.BASE_URL}assets/audio/${name}.ogg`);
      audio.preload = 'none'; audio.volume = name === 'move' ? 0.16 : 0.32;
      this.sounds.set(name, audio);
    }
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) { this.music.pause(); this.sounds.forEach(audio => audio.pause()); }
      else if (this.enabled) void this.music.play().catch(() => {});
    });
  }
  async toggle(): Promise<boolean> {
    this.enabled = !this.enabled;
    if (this.enabled) {
      try { await this.music.play(); } catch { this.enabled = false; }
    } else { this.music.pause(); this.sounds.forEach(audio => audio.pause()); }
    return this.enabled;
  }
  play(name: string): void {
    if (!this.enabled || document.hidden) return;
    const audio = this.sounds.get(name);
    if (audio) { audio.currentTime = 0; void audio.play().catch(() => {}); }
  }
}
