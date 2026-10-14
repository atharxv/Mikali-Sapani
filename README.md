# Mikali Sapani — Signature Loading Screen Animation

A bespoke, luxury loading screen animation created from the original vector emblem `Mikali sapani logo file.svg`.

Featuring a deep wine red canvas (`#731D13`), an authentic stamped debossed emblem cavity with hairline outline, and an organic liquid cream (`#fff9e7`) wave fill that rises cleanly through the emblem contours from bottom to top, concluding with a 45° specular sheen sweep and tracked luxury serif typography.

---

## 🌟 Key Features

1. **Exact Brand Palette & Background**:
   - Canvas: Real luxury red textile texture from [`Mikali Sapani Red Background.png`](file:///c:/Users/athar/OneDrive/Desktop/Prime%20Digital/Mikali%20Sapani/Mikali%20Sapani%20Red%20Background.png) rendered naturally without artificial radial glows or vignettes.
   - Fallback Base: `#731D13` (Original Adobe Illustrator Tuscan wine red from the SVG).
   - Cream Tone: `#fff9e7` (Signature luxury cream) with liquid wave rise starting directly from the bottom of the emblem cavity.
2. **Authentic Stamped Debossed Effect**:
   - Crafted SVG filter (`#emblemDeboss`) applying recessed inner shadow (`#080201`) and beveled light rim highlight (`#ffd5c2`) to create a physical stamped leather deboss cavity.
   - Blank baseline state cleanly showcases the sunken emblem crest before liquid fill begins.
3. **No Glow Around the Emblem**:
   - Zero artificial halo or glowing drop-shadows around the emblem or wordmark.
   - Clean, crisp, high-end editorial physical aesthetic.
4. **Single Luxury Reset Button**:
   - Exactly 1 reset button on the entire loading screen (`.loader-reset-btn`), located in the top-right corner.
   - Clicking it makes the emblem immediately go back to being blank (0% empty cavity).
   - Toggles to `▶ Play` allowing users to replay the fill at will.
5. **Completion State**:
   - 45° diagonal specular gleam sweep across the filled vector shape.
   - Official luxury vector wordmark **"MIKALI SAPANI"** seamlessly fades and tracks in signature cream `#fff9e7`.
   - "ENTER BOUTIQUE →" action button for entering the main boutique website.

---

## 📂 Project Structure

```
Mikali Sapani/
├── Mikali Sapani Red Background.png # High-resolution brand luxury red background texture
├── Mikali Sapani Wordmark.svg       # Original bespoke vector wordmark file
├── Mikali sapani logo file.svg      # Original Adobe Illustrator logo emblem file
├── index.html                       # Clean showcase & live boutique demo
├── mikali-loader.css                # Standalone modular stylesheet & tokens
├── mikali-loader.js                 # Standalone vanilla JavaScript controller
├── MikaliLoader.jsx                 # React / Next.js component
├── mikali-emblem.svg                # Tight-cropped, optimized standalone SVG emblem
├── mikali-wordmark.svg              # Tight-cropped standalone SVG wordmark (fill="currentColor")
└── README.md                        # Documentation & integration guide
```

---

## 🚀 Quick Start (Vanilla HTML / CSS / JS)

### 1. Link Stylesheet & Script
```html
<link rel="stylesheet" href="mikali-loader.css">
<script src="mikali-loader.js"></script>
```

### 2. Add Loader HTML Markup
```html
<div class="mikali-loader-overlay mode-wave" id="mikaliLoader">
  <!-- The Single Reset Button -->
  <button class="loader-reset-btn" id="mainResetBtn" onclick="window.mikaliInstance.toggleResetBlank()">
    &#8635; Reset
  </button>

  <div class="loader-stage">
    <!-- Emblem with Deboss Filter -->
    <div class="emblem-container">
      <svg class="emblem-svg" viewBox="335 212 110 120" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="emblemDeboss" x="-25%" y="-25%" width="150%" height="150%">
            <feOffset dx="1.4" dy="2" in="SourceAlpha" result="offDark"/>
            <feGaussianBlur stdDeviation="1.5" in="offDark" result="blurDark"/>
            <feComposite operator="out" in="SourceAlpha" in2="blurDark" result="invDark"/>
            <feFlood flood-color="#080201" flood-opacity="0.95" result="cDark"/>
            <feComposite operator="in" in="cDark" in2="invDark" result="shadow"/>

            <feOffset dx="-0.9" dy="-1.1" in="SourceAlpha" result="offLight"/>
            <feGaussianBlur stdDeviation="0.8" in="offLight" result="blurLight"/>
            <feComposite operator="out" in="SourceAlpha" in2="blurLight" result="invLight"/>
            <feFlood flood-color="#ffd5c2" flood-opacity="0.32" result="cLight"/>
            <feComposite operator="in" in="cLight" in2="invLight" result="highlight"/>

            <feMerge>
              <feMergeNode in="SourceGraphic"/>
              <feMergeNode in="shadow"/>
              <feMergeNode in="highlight"/>
            </feMerge>
          </filter>
          <clipPath id="logoShapeClip">
            <path d="M346.9,285.14c0.24-0.72..."/>
            <path d="M394.82,287.06..."/>
            <path d="M432.85,276.11..."/>
          </clipPath>
        </defs>

        <!-- Debossed Silhouette Base -->
        <g class="silhouette-group" filter="url(#emblemDeboss)">
          <path class="silhouette-path" d="..."/>
        </g>
        <!-- Hairline Stroke -->
        <g class="stroke-group">
          <path class="stroke-path p1" d="..."/>
        </g>
        <!-- Clipped Liquid Cream Wave Fill (#fff9e7) -->
        <g clip-path="url(#logoShapeClip)">
          <g class="liquid-rise-group">
            <path class="liquid-wave-front" d="..." />
            <rect class="liquid-solid-body" x="280" y="215" width="250" height="140" />
          </g>
          <rect class="specular-sheen" x="300" y="190" width="180" height="150" fill="url(#sheenSweepGrad)" />
        </g>
      </svg>
    </div>

    <!-- Wordmark -->
    <div class="brand-identity">
      <div class="brand-wordmark-wrap">
        <svg class="brand-wordmark-svg" viewBox="360 345 720 85">...</svg>
      </div>
    </div>
  </div>
</div>
```

### 3. Initialize Controller
```javascript
const loader = new MikaliLoader({
  containerId: 'mikaliLoader',
  mode: 'wave',
  duration: 2800,
  creamColor: '#fff9e7', // Signature cream tone
  autoDismiss: false,
  onComplete: () => {
    console.log('Loading animation complete');
  }
});
```

---

## ⚛️ React & Next.js Usage

```jsx
import React from 'react';
import MikaliLoader from './MikaliLoader';

export default function Home() {
  return (
    <>
      <MikaliLoader 
        mode="wave"
        duration={2800}
        creamColor="#fff9e7"
        showWordmark={true}
        autoDismiss={false}
        onComplete={() => console.log('Loaded!')}
      />
      <main>
        {/* Your website content */}
      </main>
    </>
  );
}
```
