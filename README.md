# Mikali Sapani — Signature Luxury Loading Screen Animation

A bespoke, luxury loading screen animation created from the original vector emblem and official wordmark for **MIKALI SAPANI**.

Featuring 6 switchable haute horlogerie / joaillerie color presets, an authentic leather grain texture layer across all themes, a refined plain outline hairline emblem, and an organic liquid wave fill rising cleanly through the emblem contours from bottom to top, concluding with a diagonal specular sheen sweep and tracked luxury serif typography.

---

## 🎨 Curated Brand Palette & Presets

The loading screen incorporates four core luxury tones:
- **Black**: `#171717` (Deep matte obsidian)
- **Red**: `#7B1902` (Signature rich crimson)
- **Gold**: `#A8894F` (Warm champagne satin gold)
- **White**: `#FFF7E4` (Warm luminous ivory cream)

### Available Color Presets
Users can switch between presets via the bottom **Palette Dock** or keyboard shortcuts (`1` to `6`):

| # | Preset Key | Preset Name | Foreground (Fill & Strokes) | Background Canvas | Texture Treatment |
|---|---|---|---|---|---|
| **Default** | `white_on_red` | **White on Red** | `#FFF7E4` | `#7B1902` | Signature crimson leather background (`Mikali Sapani Red Background.png`) |
| **1** | `red_on_black` | **Red on Black** | `#7B1902` | `#171717` | Recreated deep noir leather grain (`luminosity`, `brightness 0.24`) |
| **2** | `gold_on_white` | **Gold on White** | `#A8894F` | `#FFF7E4` | Recreated warm ivory leather grain (`multiply`, `opacity 0.22`) |
| **3** | `gold_on_black` | **Gold on Black** | `#A8894F` | `#171717` | Recreated deep noir leather grain (`luminosity`, `brightness 0.24`) |
| **4** | `gold_on_red` | **Gold on Red** | `#A8894F` | `#7B1902` | Signature crimson leather background (`Mikali Sapani Red Background.png`) |
| **5** | `red_on_white` | **Red on White** | `#7B1902` | `#FFF7E4` | Recreated warm ivory leather grain (`multiply`, `opacity 0.22`) |

---

## 🌟 Key Features

1. **Clean Plain Outline Emblem (No Deboss Filter)**:
   - Ultra-fine hairline outline strokes (`.stroke-path`) resting cleanly against the luxury textured background.
   - Zero deboss filter cavities or artificial glows.
2. **Recreated Luxury Leather Texture**:
   - Red themes retain the signature physical red leather texture.
   - Black and White themes authentically recreate deep noir and warm ivory leather grain using CSS filters and blend modes.
3. **Single Luxury Reset Button**:
   - Exactly 1 reset button on screen (`#mainResetBtn`), anchored in the top-right corner.
   - Instantly snaps the emblem back to a completely blank outline state.
   - Toggles to `▶ Play` allowing users to replay the wave fill from 0% anytime.
4. **Organic Wave Fill & Completion Sheen**:
   - Fluid wave rising upwards strictly clipped to the emblem paths.
   - Specular diagonal sheen sweep upon reaching 100%.
   - Seamlessly reveals the official vector wordmark **"MIKALI SAPANI"**.
5. **Interactive Preset Dock**:
   - Elegant bottom floating dock with dual-tone concentric swatches for instant switching.

---

## 📂 Project Structure

```
Mikali Sapani/
├── Mikali Sapani Red Background.png # High-resolution brand luxury red background texture
├── Mikali Sapani Wordmark.svg       # Original bespoke vector wordmark file
├── Mikali sapani logo file.svg      # Original Adobe Illustrator logo emblem file
├── index.html                       # Live interactive showcase & boutique demo
├── mikali-loader.css                # Modular stylesheet with CSS variables & texture filters
├── mikali-loader.js                 # Standalone vanilla JavaScript controller & presets
├── MikaliLoader.jsx                 # React / Next.js component with preset dock support
└── README.md                        # Documentation & integration guide
```

---

## 🚀 Quick Start (Vanilla HTML / CSS / JS)

### 1. Link Stylesheet & Script
```html
<link rel="stylesheet" href="mikali-loader.css">
<script src="mikali-loader.js"></script>
```

### 2. Markup
```html
<div class="mikali-loader-overlay mode-wave" id="mikaliLoader">
  <!-- Recreated leather grain texture layer -->
  <div class="loader-bg-texture" id="loaderBgTexture" aria-hidden="true"></div>

  <!-- The Single Reset Button -->
  <button class="loader-reset-btn" id="mainResetBtn">
    &#8635; Reset
  </button>

  <div class="loader-stage">
    <!-- Emblem SVG -->
    <div class="emblem-container">
      <svg class="emblem-svg" viewBox="335 212 110 120" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <clipPath id="logoShapeClip">
            <path d="M346.9,285.14c0.24-0.72..."/>
            <path d="M394.82,287.06..."/>
            <path d="M432.85,276.11..."/>
          </clipPath>
        </defs>

        <!-- Plain Hairline Stroke -->
        <g class="stroke-group">
          <path class="stroke-path p1" d="..."/>
          <path class="stroke-path p2" d="..."/>
          <path class="stroke-path p3" d="..."/>
        </g>

        <!-- Liquid Wave Fill -->
        <g clip-path="url(#logoShapeClip)">
          <g class="liquid-rise-group">
            <path class="liquid-wave-back" d="..." />
            <path class="liquid-wave-front" d="..." />
            <rect class="liquid-solid-body" x="280" y="215" width="250" height="140" />
            <line class="liquid-meniscus" x1="300" y1="215" x2="470" y2="215" />
          </g>
          <rect class="specular-sheen" x="300" y="190" width="180" height="150" fill="url(#sheenSweepGrad)" />
        </g>
      </svg>
    </div>

    <!-- Official Wordmark -->
    <div class="brand-identity">
      <div class="brand-wordmark-wrap">
        <svg class="brand-wordmark-svg" viewBox="360 345 720 85">...</svg>
      </div>
    </div>
  </div>

  <!-- Preset Dock -->
  <nav class="loader-preset-dock" aria-label="Color Presets">
    <!-- Preset chips rendered here or via mikali-loader.js -->
  </nav>
</div>
```

### 3. Initialize Controller
```javascript
const loader = new MikaliLoader({
  containerId: 'mikaliLoader',
  mode: 'wave',
  duration: 2800,
  preset: 'white_on_red', // Default signature preset
  autoDismiss: false,
  onComplete: () => {
    console.log('Loading animation complete');
  }
});

// Switch presets dynamically at runtime
loader.setPreset('red_on_black');
```

---

## ⚛️ React & Next.js Usage

```jsx
import React from 'react';
import MikaliLoader, { COLOR_PRESETS } from './MikaliLoader';

export default function Home() {
  return (
    <>
      <MikaliLoader 
        mode="wave"
        duration={2800}
        preset="white_on_red"
        showWordmark={true}
        showPresets={true}
        autoDismiss={false}
        onComplete={() => console.log('Emblem fill completed')}
        onPresetChange={(preset) => console.log('Switched to:', preset.label)}
      />
      <main>
        {/* Boutique website content */}
      </main>
    </>
  );
}
```

---

## ⌨️ Keyboard Shortcuts (Demo Page)

- **`1`**: White on Red (Signature)
- **`2`**: Red on Black
- **`3`**: Gold on White
- **`4`**: Gold on Black
- **`5`**: Gold on Red
- **`6`**: Red on White
- **`R` / `Space`**: Replay Fill
- **`Esc`**: Reset to Blank Outline
