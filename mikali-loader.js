/**
 * Mikali Sapani — Luxury Loading Screen Controller
 * Curated Haute Horlogerie / Joaillerie Palette:
 * Black: #171717 | Red: #7B1902 | Gold: #A8894F | White: #FFF7E4
 * @author Prime Digital / Mikali Sapani
 */

const COLOR_PRESETS = {
  white_on_red: {
    id: 'white_on_red',
    label: 'White on Red',
    shortLabel: 'White / Red',
    fg: '#FFF7E4',
    bg: '#7B1902',
    bgType: 'red',
    outlineStroke: 'rgba(255, 247, 228, 0.38)',
    actionBtnBorder: 'rgba(255, 247, 228, 0.32)',
    actionBtnText: '#FFF7E4',
    resetBtnBg: 'rgba(44, 9, 5, 0.72)',
    resetBtnBorder: 'rgba(255, 247, 228, 0.28)',
    resetBtnColor: '#FFF7E4',
  },
  red_on_black: {
    id: 'red_on_black',
    label: 'Red on Black',
    shortLabel: 'Red / Black',
    fg: '#7B1902',
    bg: '#171717',
    bgType: 'black',
    outlineStroke: 'rgba(123, 25, 2, 0.45)',
    actionBtnBorder: 'rgba(123, 25, 2, 0.45)',
    actionBtnText: '#7B1902',
    resetBtnBg: 'rgba(20, 20, 20, 0.75)',
    resetBtnBorder: 'rgba(123, 25, 2, 0.45)',
    resetBtnColor: '#e04022',
  },
  gold_on_white: {
    id: 'gold_on_white',
    label: 'Gold on White',
    shortLabel: 'Gold / White',
    fg: '#A8894F',
    bg: '#FFF7E4',
    bgType: 'white',
    outlineStroke: 'rgba(168, 137, 79, 0.4)',
    actionBtnBorder: 'rgba(168, 137, 79, 0.45)',
    actionBtnText: '#876931',
    resetBtnBg: 'rgba(255, 247, 228, 0.85)',
    resetBtnBorder: 'rgba(168, 137, 79, 0.4)',
    resetBtnColor: '#876931',
  },
  gold_on_black: {
    id: 'gold_on_black',
    label: 'Gold on Black',
    shortLabel: 'Gold / Black',
    fg: '#A8894F',
    bg: '#171717',
    bgType: 'black',
    outlineStroke: 'rgba(168, 137, 79, 0.4)',
    actionBtnBorder: 'rgba(168, 137, 79, 0.4)',
    actionBtnText: '#A8894F',
    resetBtnBg: 'rgba(20, 20, 20, 0.75)',
    resetBtnBorder: 'rgba(168, 137, 79, 0.35)',
    resetBtnColor: '#A8894F',
  },
  gold_on_red: {
    id: 'gold_on_red',
    label: 'Gold on Red',
    shortLabel: 'Gold / Red',
    fg: '#A8894F',
    bg: '#7B1902',
    bgType: 'red',
    outlineStroke: 'rgba(168, 137, 79, 0.4)',
    actionBtnBorder: 'rgba(168, 137, 79, 0.45)',
    actionBtnText: '#A8894F',
    resetBtnBg: 'rgba(44, 9, 5, 0.72)',
    resetBtnBorder: 'rgba(168, 137, 79, 0.35)',
    resetBtnColor: '#A8894F',
  },
  red_on_white: {
    id: 'red_on_white',
    label: 'Red on White',
    shortLabel: 'Red / White',
    fg: '#7B1902',
    bg: '#FFF7E4',
    bgType: 'white',
    outlineStroke: 'rgba(123, 25, 2, 0.38)',
    actionBtnBorder: 'rgba(123, 25, 2, 0.42)',
    actionBtnText: '#7B1902',
    resetBtnBg: 'rgba(255, 247, 228, 0.85)',
    resetBtnBorder: 'rgba(123, 25, 2, 0.35)',
    resetBtnColor: '#7B1902',
  }
};

class MikaliLoader {
  constructor(options = {}) {
    this.options = Object.assign({
      containerId: 'mikaliLoader',
      mode: 'wave', // 'wave', 'calligraphy', 'shimmer', 'bloom'
      duration: 2800, // ms
      preset: 'white_on_red', // Default signature preset
      creamColor: '#FFF7E4',
      bgImage: 'Mikali%20Sapani%20Red%20Background.png',
      autoStart: true,
      autoDismiss: false,
      dismissDelay: 600,
      showWordmark: true,
      showPercentage: true,
      onProgress: null,
      onComplete: null,
      onDismiss: null,
      onPresetChange: null,
    }, options);

    this.container = document.getElementById(this.options.containerId);
    if (!this.container) {
      console.warn(`[MikaliLoader] Element #${this.options.containerId} not found.`);
      return;
    }

    this.liquidGroup = this.container.querySelector('.liquid-rise-group');
    this.pctNumber = this.container.querySelector('.pct-number');
    this.progressFill = this.container.querySelector('.minimal-progress-fill');
    this.brandIdentity = this.container.querySelector('.brand-identity');
    this.enterBtn = this.container.querySelector('.loader-enter-btn');

    this.currentProgress = 0;
    this.targetProgress = 0;
    this.animFrameId = null;
    this._dismissTimeout = null;
    this.startTime = null;
    this.isComplete = false;
    this.activePresetKey = this.options.preset;

    this.init();
  }

  init() {
    this.setPreset(this.options.preset || 'white_on_red');

    if (this.options.bgImage) {
      this.setBackgroundImage(this.options.bgImage);
    }
    this.setMode(this.options.mode);

    if (this.enterBtn) {
      this.enterBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.dismiss();
      });
    }

    // Attach event listener to the single reset button
    const mainResetBtn = document.getElementById('mainResetBtn') || this.container.querySelector('.loader-reset-btn');
    if (mainResetBtn) {
      mainResetBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.toggleResetBlank();
      });
    }

    // Attach click listeners to preset dock chips
    const chips = this.container.querySelectorAll('.preset-chip');
    chips.forEach(chip => {
      chip.addEventListener('click', (e) => {
        e.preventDefault();
        const presetKey = chip.getAttribute('data-preset');
        if (presetKey) {
          this.setPreset(presetKey);
        }
      });
    });

    if (this.options.autoStart) {
      this.startSimulation(false);
    }
  }

  /**
   * Switch color preset
   * @param {string} presetKey - e.g. 'white_on_red', 'red_on_black', 'gold_on_white', etc.
   */
  setPreset(presetKey) {
    const preset = COLOR_PRESETS[presetKey] || COLOR_PRESETS.white_on_red;
    this.activePresetKey = preset.id;
    this.options.creamColor = preset.fg;

    // 1. Update CSS custom properties
    this.container.style.setProperty('--loader-bg-color', preset.bg);
    this.container.style.setProperty('--loader-fg-color', preset.fg);
    
    const light = this._adjustBrightness(preset.fg, 16);
    const shadow = this._adjustBrightness(preset.fg, -16);
    this.container.style.setProperty('--loader-fg-light', light);
    this.container.style.setProperty('--loader-fg-shadow', shadow);

    this.container.style.setProperty('--emblem-outline-stroke', preset.outlineStroke);
    this.container.style.setProperty('--action-btn-border', preset.actionBtnBorder);
    this.container.style.setProperty('--action-btn-text', preset.actionBtnText);
    this.container.style.setProperty('--reset-btn-bg', preset.resetBtnBg);
    this.container.style.setProperty('--reset-btn-border', preset.resetBtnBorder);
    this.container.style.setProperty('--reset-btn-color', preset.resetBtnColor);

    // 2. Recreate leather texture across all themes (red, black, white)
    this.container.classList.remove('bg-type-red', 'bg-type-black', 'bg-type-white');
    this.container.classList.add(`bg-type-${preset.bgType}`);

    // 3. Update preset chips active state
    const chips = this.container.querySelectorAll('.preset-chip');
    chips.forEach(chip => {
      if (chip.getAttribute('data-preset') === preset.id) {
        chip.classList.add('is-active');
      } else {
        chip.classList.remove('is-active');
      }
    });

    if (this.options.onPresetChange) {
      this.options.onPresetChange(preset);
    }
  }

  /**
   * Set custom background image
   * @param {string} url - e.g. 'Mikali%20Sapani%20Red%20Background.png'
   */
  setBackgroundImage(url) {
    this.options.bgImage = url;
    const formatted = url.startsWith('url(') ? url : `url('${url}')`;
    this.container.style.setProperty('--loader-bg-image', formatted);
  }

  /**
   * Set custom cream color
   * @param {string} hex - e.g. '#F5EBE1'
   */
  setCreamColor(hex) {
    this.options.creamColor = hex;
    this.container.style.setProperty('--cream-primary', hex);
    
    // Calculate lighter and shadowed variations for realistic depth
    const light = this._adjustBrightness(hex, 18);
    const shadow = this._adjustBrightness(hex, -16);
    this.container.style.setProperty('--cream-light', light);
    this.container.style.setProperty('--cream-shadow', shadow);
    this.container.style.setProperty('--cream-stroke', `${hex}4D`); // 30% alpha
  }

  /**
   * Switch animation mode
   * @param {'wave' | 'calligraphy' | 'shimmer' | 'bloom'} mode
   */
  setMode(mode) {
    this.options.mode = mode;
    this.container.classList.remove('mode-wave', 'mode-calligraphy', 'mode-shimmer', 'mode-bloom');
    this.container.classList.add(`mode-${mode}`);

    // If shimmer mode, we flatten the wave oscillation
    const frontWave = this.container.querySelector('.liquid-wave-front');
    const backWave = this.container.querySelector('.liquid-wave-back');
    if (frontWave && backWave) {
      if (mode === 'shimmer') {
        frontWave.style.animation = 'none';
        backWave.style.animation = 'none';
      } else {
        frontWave.style.animation = '';
        backWave.style.animation = '';
      }
    }
  }

  /**
   * Set progress manually (0.0 to 1.0)
   * @param {number} fraction - from 0.0 to 1.0
   */
  setProgress(fraction) {
    const clamped = Math.max(0, Math.min(1, fraction));
    this.currentProgress = clamped;
    this._renderProgress(clamped);

    if (this.options.onProgress) {
      this.options.onProgress(clamped);
    }

    if (clamped >= 1 && !this.isComplete) {
      this._handleComplete();
    }
  }

  /**
   * Start time-based simulated progress
   * @param {boolean} [shouldReset=true] - Whether to reset before running
   */
  startSimulation(shouldReset = true) {
    if (shouldReset) {
      this.reset(true);
    }
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }

    this.isComplete = false;
    this.startTime = performance.now();

    const animate = (now) => {
      const elapsed = now - this.startTime;
      const progress = Math.min(1, elapsed / this.options.duration);

      // Elegant luxury easing curve: smooth slow start, fluid rise, gentle deceleration
      const eased = this._luxuryEase(progress);
      this.setProgress(eased);

      if (progress < 1) {
        this.animFrameId = requestAnimationFrame(animate);
      } else {
        this.animFrameId = null;
        this.setProgress(1);
      }
    };

    this.animFrameId = requestAnimationFrame(animate);
  }

  _renderProgress(progress) {
    const pct = Math.round(progress * 100);

    // 1. Numeric percentage
    if (this.pctNumber) {
      this.pctNumber.textContent = String(pct).padStart(2, '0');
    }

    // 2. Minimal progress bar fill
    if (this.progressFill) {
      this.progressFill.style.width = `${pct}%`;
    }

    // 3. Liquid level rise: from translateY(112px) [0% empty, below emblem baseline] down to translateY(0px) [100% full, above emblem]
    if (this.liquidGroup) {
      const translateY = (1 - progress) * 112;
      this.liquidGroup.style.transform = `translateY(${translateY.toFixed(2)}px)`;
    }

    // 4. Mode-specific handling
    if (this.options.mode === 'bloom') {
      const bloomCircle = this.container.querySelector('.bloom-circle');
      if (bloomCircle) {
        bloomCircle.style.transform = `scale(${(progress * 1.15).toFixed(3)})`;
        bloomCircle.style.opacity = progress > 0.05 ? '1' : '0';
      }
    }

    if (this.options.mode === 'calligraphy') {
      const flood = this.container.querySelector('.calligraphy-flood-rect');
      if (flood) {
        // Flood reveals after 55%
        const floodProgress = Math.max(0, (progress - 0.55) / 0.45);
        flood.style.opacity = floodProgress.toFixed(3);
      }
    }

    // Wordmark fade in at 65%
    if (this.brandIdentity && this.options.showWordmark) {
      if (progress >= 0.65) {
        this.brandIdentity.classList.add('is-visible');
      } else {
        this.brandIdentity.classList.remove('is-visible');
      }
    }
  }

  _handleComplete() {
    this.isComplete = true;
    this.container.classList.add('is-complete');

    if (this.brandIdentity && this.options.showWordmark) {
      this.brandIdentity.classList.add('is-visible');
    }

    const btn = document.getElementById('mainResetBtn') || this.container.querySelector('.loader-reset-btn');
    if (btn) {
      btn.innerHTML = '&#8635; Reset';
      btn.title = 'Reset emblem back to blank';
      btn.classList.remove('is-blank-state');
    }

    if (this.options.onComplete) {
      this.options.onComplete();
    }

    if (this.options.autoDismiss) {
      this._dismissTimeout = setTimeout(() => {
        this.dismiss();
      }, this.options.dismissDelay);
    }
  }

  /**
   * Dismiss loader with cinematic exit transition
   */
  dismiss() {
    this.container.classList.add('is-dismissed');
    if (this.options.onDismiss) {
      setTimeout(() => {
        this.options.onDismiss();
      }, 1100);
    }
  }

  /**
   * Reset loader to initial state (Emblem goes back to being blank)
   * @param {boolean} [immediate=true] - Instantly reset without transition lag
   */
  reset(immediate = true) {
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
    if (this._dismissTimeout) {
      clearTimeout(this._dismissTimeout);
      this._dismissTimeout = null;
    }

    this.isComplete = false;
    this.currentProgress = 0;

    if (immediate) {
      this.container.classList.add('is-resetting');
    }

    this.container.classList.remove('is-complete', 'is-dismissed', 'is-animating', 'is-flooding');

    if (this.brandIdentity) {
      this.brandIdentity.classList.remove('is-visible');
    }

    this._renderProgress(0);

    // Trigger reflow for stroke animations if calligraphy
    if (this.options.mode === 'calligraphy') {
      const strokes = this.container.querySelectorAll('.stroke-path');
      strokes.forEach(s => {
        s.style.animation = 'none';
        void s.offsetWidth;
        s.style.animation = '';
      });
    }

    if (immediate) {
      // Force immediate DOM reflow to snap layout without transitions
      void this.container.offsetWidth;
      this.container.classList.remove('is-resetting');
    }
  }

  /**
   * Make the emblem go back to being completely blank (empty debossed state)
   */
  resetToBlank() {
    this.reset(true);
    const btn = document.getElementById('mainResetBtn') || this.container.querySelector('.loader-reset-btn');
    if (btn) {
      btn.innerHTML = '&#9654; Play';
      btn.title = 'Play loading animation';
      btn.classList.add('is-blank-state');
    }
  }

  /**
   * Toggle between blank state and playing the fill animation
   */
  toggleResetBlank() {
    if (this.currentProgress === 0 && !this.animFrameId) {
      // It is currently blank -> start playing fill animation
      const btn = document.getElementById('mainResetBtn') || this.container.querySelector('.loader-reset-btn');
      if (btn) {
        btn.innerHTML = '&#8635; Reset';
        btn.title = 'Reset emblem back to blank';
        btn.classList.remove('is-blank-state');
      }
      this.startSimulation(false);
    } else {
      // Currently animating or full -> make emblem go back to being blank
      this.resetToBlank();
    }
  }

  /**
   * Start animation from blank state (used when replaying from boutique)
   */
  startFromBlank() {
    this.container.classList.remove('is-dismissed');
    this.resetToBlank();
    requestAnimationFrame(() => {
      this.toggleResetBlank();
    });
  }

  /**
   * Replay the animation smoothly from 0%
   */
  replay() {
    this.reset(true);
    const btn = document.getElementById('mainResetBtn') || this.container.querySelector('.loader-reset-btn');
    if (btn) {
      btn.innerHTML = '&#8635; Reset';
      btn.title = 'Reset emblem back to blank';
      btn.classList.remove('is-blank-state');
    }
    this.animFrameId = requestAnimationFrame(() => {
      this.startSimulation(false);
    });
  }

  // Smooth custom easing curve
  _luxuryEase(t) {
    return t < 0.5 
      ? 2 * t * t 
      : 1 - Math.pow(-2 * t + 2, 2) / 2;
  }

  // Utility to adjust hex color brightness
  _adjustBrightness(hex, percent) {
    const num = parseInt(hex.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.min(255, Math.max(0, (num >> 16) + amt));
    const G = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amt));
    const B = Math.min(255, Math.max(0, (num & 0x0000FF) + amt));
    return `#${((1 << 24) + (R << 16) + (G << 8) + B).toString(16).slice(1)}`;
  }
}

// Attach to window for global browser usage
if (typeof window !== 'undefined') {
  window.MikaliLoader = MikaliLoader;
  window.COLOR_PRESETS = COLOR_PRESETS;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { MikaliLoader, COLOR_PRESETS };
}
