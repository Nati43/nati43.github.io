<template>
  <div class="loader-overlay" :class="{ 'slide-up': isFading }">
    <!-- Code Tokens Canvas -->
    <canvas ref="canvas" class="spill-canvas"></canvas>

    <div class="alchemist-scene" :class="{ 'is-brewing': isOverflowing }">
      <!-- Background Ambient Lamp Glow -->
      <div class="lamp-glow"></div>

      <!-- Vector Alchemist Workstation Illustration -->
      <svg class="alchemist-svg" viewBox="0 0 400 280" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <!-- Flask Inner Clip -->
          <clipPath id="flask-desk-clip">
            <path d="M208 145 L224 145 L224 168 Q238 182 250 206 Q255 220 248 232 Q243 238 226 238 L206 238 Q189 238 184 232 Q177 220 182 206 Q194 182 208 168 Z" />
          </clipPath>

          <!-- Elixir Liquid Gradient -->
          <linearGradient id="elixir-fluid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#ff79c6" />
            <stop offset="45%" stop-color="#bd93f9" />
            <stop offset="100%" stop-color="#4c1d95" />
          </linearGradient>

          <!-- Laptop Screen Glow -->
          <linearGradient id="screen-glow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#7aa2f7" />
            <stop offset="100%" stop-color="#2ac3de" />
          </linearGradient>

          <!-- Glass Sheen Gradient -->
          <linearGradient id="glass-sheen" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="rgba(255, 255, 255, 0.4)" />
            <stop offset="35%" stop-color="rgba(255, 255, 255, 0.08)" />
            <stop offset="100%" stop-color="rgba(255, 255, 255, 0.02)" />
          </linearGradient>

          <!-- Soft Outer Glow Filter -->
          <filter id="soft-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <!-- Desk Surface Line -->
        <rect x="20" y="238" width="360" height="6" rx="3" fill="#2f3549" />
        <rect x="40" y="244" width="8" height="30" fill="#24283b" />
        <rect x="352" y="244" width="8" height="30" fill="#24283b" />

        <!-- Desk Lamp (Left) -->
        <path d="M50 238 L65 238 M57 238 L57 140 Q57 110 85 110 L95 110" stroke="#565f89" stroke-width="4" stroke-linecap="round" fill="none" />
        <path d="M85 102 L110 118 L90 125 Z" fill="#7aa2f7" />
        <!-- Lamp Light Cone -->
        <polygon points="97,120 40,238 180,238" fill="url(#screen-glow)" opacity="0.08" />

        <!-- Laptop on Desk (Left Side) -->
        <!-- Laptop Base -->
        <path d="M100 234 L160 234 L165 238 L95 238 Z" fill="#44475a" />
        <!-- Laptop Screen Cover -->
        <path d="M105 234 L92 180 Q91 176 95 176 L155 176 Q159 176 158 180 L145 234 Z" fill="#24283b" stroke="#44475a" stroke-width="2" />
        <!-- Screen Content Glow -->
        <polygon points="97,180 153,180 143,230 107,230" fill="url(#screen-glow)" opacity="0.85" />
        <!-- Code lines on screen -->
        <line x1="105" y1="190" x2="135" y2="190" stroke="#1a1b26" stroke-width="2" stroke-linecap="round" />
        <line x1="108" y1="198" x2="142" y2="198" stroke="#1a1b26" stroke-width="2" stroke-linecap="round" />
        <line x1="105" y1="206" x2="128" y2="206" stroke="#1a1b26" stroke-width="2" stroke-linecap="round" />

        <!-- Chemist / Developer Silhouette (Center-Left) -->
        <g class="chemist-character">
          <!-- Chair back -->
          <rect x="110" y="165" width="10" height="70" rx="4" fill="#1f2335" />
          <!-- Head / Hair / Glasses -->
          <circle cx="140" cy="142" r="18" fill="#a9b1d6" />
          <!-- Hair cap -->
          <path d="M124 140 Q130 122 148 124 Q158 126 156 138 Z" fill="#24283b" />
          <!-- Glasses -->
          <circle cx="148" cy="142" r="5" stroke="#1a1b26" stroke-width="2" fill="none" />
          <!-- Torso / Hoodie -->
          <path d="M122 170 Q140 160 158 170 L165 238 L115 238 Z" fill="#343746" />
          <!-- Arm typing on laptop (Left arm) -->
          <path d="M145 180 Q135 205 125 230 L135 233 Q148 210 152 185 Z" fill="#44475a" />
          <!-- Arm holding the Elixir Flask (Right arm reaching out) -->
          <path d="M152 178 Q180 188 208 198 L204 204 Q176 195 148 185 Z" fill="#44475a" />
          <!-- Hand fingers grasping flask neck -->
          <ellipse cx="209" cy="197" rx="4" ry="7" fill="#a9b1d6" />
        </g>

        <!-- Smaller Elixir Flask Held in Hand -->
        <g class="flask-desk-group">
          <!-- Outer Glass Ambient Glow -->
          <path 
            d="M208 145 L224 145 L224 168 Q238 182 250 206 Q255 220 248 232 Q243 238 226 238 L206 238 Q189 238 184 232 Q177 220 182 206 Q194 182 208 168 Z" 
            fill="rgba(189, 147, 249, 0.18)" 
            filter="url(#soft-glow)"
          />

          <!-- Liquid Area (Clipped inside Flask) -->
          <g clip-path="url(#flask-desk-clip)">
            <g class="liquid-fill-anim">
              <rect x="160" y="145" width="110" height="100" fill="url(#elixir-fluid)" />
              
              <!-- Surface Boiling Wave -->
              <path class="wave-surface" fill="#ff79c6" opacity="0.85"
                d="M160 147 Q190 140 216 147 T272 147 L272 165 L160 165 Z" 
              />

              <!-- Magic Bubbles -->
              <circle class="bubble b1" cx="205" cy="210" r="3.5" fill="rgba(255,255,255,0.85)" />
              <circle class="bubble b2" cx="220" cy="220" r="4" fill="rgba(255,255,255,0.95)" />
              <circle class="bubble b3" cx="232" cy="205" r="3" fill="rgba(255,255,255,0.8)" />
            </g>
          </g>

          <!-- Outer Glass Body Path -->
          <path 
            d="M208 145 L224 145 L224 168 Q238 182 250 206 Q255 220 248 232 Q243 238 226 238 L206 238 Q189 238 184 232 Q177 220 182 206 Q194 182 208 168 Z" 
            fill="url(#glass-sheen)" 
            stroke="rgba(255, 255, 255, 0.8)" 
            stroke-width="2.5"
          />

          <!-- Glowing Mouth Lip Overboil Fill -->
          <g class="mouth-spill-group" :class="{ 'show-spill': isOverflowing }">
            <ellipse cx="216" cy="145" rx="9" ry="3" fill="url(#elixir-fluid)" />
            <path d="M207 145 Q216 149 225 145 Q216 142 207 145 Z" fill="#ff79c6" opacity="0.9" />
          </g>

          <!-- Top Rim Lip Outer Border -->
          <ellipse cx="216" cy="145" rx="8.5" ry="2.5" stroke="rgba(255, 255, 255, 0.85)" stroke-width="2" fill="none" />
        </g>
      </svg>

      <!-- Subtitle Label under workstation -->
      <div class="brew-label">
        <span class="dot"></span> Alchemist at work...
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loader',
  data() {
    return {
      isOverflowing: false,
      isFading: false,
      animId: null,
      timer1: null,
      timer2: null,
      timer3: null
    };
  },
  mounted() {
    this.initPhysics();

    // 1. Trigger code overflow at 0.6s
    this.timer1 = setTimeout(() => {
      this.isOverflowing = true;
    }, 600);

    // 2. Trigger overlay curtain slide-up at 3.8s (allows 10-12 code tokens to flow out)
    this.timer2 = setTimeout(() => {
      this.isFading = true;
    }, 3800);

    // 3. Complete and unmount loader at 4.5s
    this.timer3 = setTimeout(() => {
      this.$emit('done');
    }, 4500);
  },
  beforeDestroy() {
    if (this.animId) cancelAnimationFrame(this.animId);
    if (this.timer1) clearTimeout(this.timer1);
    if (this.timer2) clearTimeout(this.timer2);
    if (this.timer3) clearTimeout(this.timer3);
  },
  methods: {
    initPhysics() {
      const canvas = this.$refs.canvas;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');

      let width = (canvas.width = window.innerWidth);
      let height = (canvas.height = window.innerHeight);

      const handleResize = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      };
      window.addEventListener('resize', handleResize);

      // Multi-Language Code Tokens Pool (Elixir, Go, JS/TS)
      const codeTokens = [
        // Elixir
        'def', 'fn', '|>', ':ok', '%{}', 'Enum', 'mix', 'GenServer', 'Task',
        // Go
        'func', 'go', 'chan', 'err != nil', 'struct', 'defer',
        // JavaScript / TypeScript
        'const', 'await', 'async', '=>', 'import', 'Promise', 'type'
      ];
      const tokenColors = [
        '#ff79c6', // Pink (Elixir/JS)
        '#bd93f9', // Purple (Elixir)
        '#7aa2f7', // Electric Blue (Go/TS)
        '#7dcfff', // Ice Cyan (Go/Elixir)
        '#9ece6a', // Lime Green (JS/Elixir)
        '#ff9e64'  // Warm Orange (JS)
      ];

      let codeParticles = [];
      const floorY = height - 20;
      let frameCounter = 0;

      const animate = () => {
        ctx.clearRect(0, 0, width, height);

        // Position of the smaller held flask mouth in viewport coordinates matching SVG
        const flaskMouthX = width / 2 + 16; 
        const flaskMouthY = height / 2 + 5;

        frameCounter++;

        // --- EMIT CODE TOKENS (Paced for 10-12 tokens over 3.2s overflow window) ---
        if (this.isOverflowing && frameCounter % 15 === 0) {
          const side = Math.random() > 0.5 ? -1 : 1;
          const token = codeTokens[Math.floor(Math.random() * codeTokens.length)];
          const color = tokenColors[Math.floor(Math.random() * tokenColors.length)];

          codeParticles.push({
            text: token,
            x: flaskMouthX + side * (6 + Math.random() * 8),
            y: flaskMouthY - 2,
            spawnY: flaskMouthY - 2,
            vx: side * (0.5 + Math.random() * 0.8),
            vy: 0.9 + Math.random() * 0.7,
            rot: (Math.random() - 0.5) * 0.2,
            vRot: (Math.random() - 0.5) * 0.02,
            fontSize: 12 + Math.floor(Math.random() * 4),
            alpha: 0,
            color: color
          });
        }

        // --- UPDATE & DRAW CODE PARTICLES ---
        for (let i = codeParticles.length - 1; i >= 0; i--) {
          const p = codeParticles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.14; // Balanced gravity acceleration
          p.rot += p.vRot;

          // Fade in as token emerges from mouth
          const distFromMouth = p.y - p.spawnY;
          if (distFromMouth < 20) {
            p.alpha = Math.min(1, distFromMouth / 14);
          }

          // Slow fade out near floor
          if (p.y > floorY - 90) {
            p.alpha -= 0.015;
          }

          if (p.alpha <= 0 || p.y >= floorY) {
            codeParticles.splice(i, 1);
            continue;
          }

          ctx.save();
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rot);

          ctx.font = `700 ${p.fontSize}px 'JetBrains Mono', 'Fira Code', monospace`;
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 8;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';

          ctx.fillText(p.text, 0, 0);
          ctx.restore();
        }

        this.animId = requestAnimationFrame(animate);
      };

      this.animId = requestAnimationFrame(animate);
    }
  }
};
</script>

<style scoped>
/* Fullscreen Overlay */
.loader-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 999999;
  background: #181926;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transform: translateY(0);
  transition: transform 0.85s cubic-bezier(0.76, 0, 0.24, 1);
  pointer-events: auto;
}

.loader-overlay.slide-up {
  transform: translateY(-100%);
  pointer-events: none;
}

.spill-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 1;
}

/* Alchemist Scene Container */
.alchemist-scene {
  position: relative;
  z-index: 2;
  width: 440px;
  height: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.alchemist-scene.is-brewing {
  animation: desk-rumble 0.08s ease-in-out infinite alternate;
}

@keyframes desk-rumble {
  0% { transform: translate(-1px, 1px); }
  100% { transform: translate(1px, -1px); }
}

/* Ambient Lamp Glow */
.lamp-glow {
  position: absolute;
  left: 60px;
  top: 60px;
  width: 220px;
  height: 220px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(122, 162, 247, 0.2) 0%, rgba(42, 195, 222, 0.05) 55%, transparent 75%);
  animation: lamp-pulse 2.5s ease-in-out infinite alternate;
  pointer-events: none;
}
@keyframes lamp-pulse {
  0% { transform: scale(0.92); opacity: 0.7; }
  100% { transform: scale(1.12); opacity: 1; }
}

/* Alchemist SVG Illustration */
.alchemist-svg {
  width: 400px;
  height: 280px;
  z-index: 2;
  overflow: visible;
}

/* Liquid Fill Animation */
.liquid-fill-anim {
  animation: fill-up 1.2s cubic-bezier(0.25, 1, 0.5, 1) forwards;
}
@keyframes fill-up {
  0% { transform: translateY(80px); }
  100% { transform: translateY(0); }
}

/* Churning Surface Wave */
.wave-surface {
  animation: wave-motion 0.5s ease-in-out infinite alternate;
}
@keyframes wave-motion {
  0% { transform: translateY(0) scaleY(1); }
  100% { transform: translateY(-3px) scaleY(1.3); }
}

/* Bubbles */
.bubble {
  animation: bubble-float 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
.b1 { animation-delay: 0s; }
.b2 { animation-delay: 0.3s; animation-duration: 0.9s; }
.b3 { animation-delay: 0.6s; animation-duration: 1.1s; }

@keyframes bubble-float {
  0% { transform: translateY(0) scale(0.6); opacity: 0.2; }
  50% { opacity: 0.9; }
  100% { transform: translateY(-70px) scale(1.2); opacity: 0; }
}

/* Mouth Overboil Rim */
.mouth-spill-group {
  opacity: 0;
  transition: opacity 0.3s ease;
}
.mouth-spill-group.show-spill {
  opacity: 1;
}

/* Subtitle Label */
.brew-label {
  margin-top: 10px;
  z-index: 2;
  font-family: 'JetBrains Mono', monospace, sans-serif;
  font-size: 0.85rem;
  font-weight: 500;
  color: #bd93f9;
  letter-spacing: 0.08em;
  display: flex;
  align-items: center;
  gap: 8px;
}

.dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #7aa2f7;
  box-shadow: 0 0 8px #7aa2f7;
  animation: dot-blink 0.8s ease-in-out infinite alternate;
}
@keyframes dot-blink {
  0% { opacity: 0.3; transform: scale(0.8); }
  100% { opacity: 1; transform: scale(1.2); }
}
</style>
