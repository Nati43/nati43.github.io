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
            <path d="M231 162 L245 162 L245 180 Q256 193 264 212 Q268 224 262 232 Q258 236 244 236 L228 236 Q214 236 210 232 Q204 224 208 212 Q216 193 231 180 Z" />
          </clipPath>

          <!-- Elixir Liquid Gradient -->
          <linearGradient id="elixir-fluid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#ff79c6" />
            <stop offset="45%" stop-color="#bd93f9" />
            <stop offset="100%" stop-color="#4c1d95" />
          </linearGradient>

          <!-- Screen Backdrop Glow -->
          <linearGradient id="screen-glow" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#7aa2f7" />
            <stop offset="100%" stop-color="#2ac3de" />
          </linearGradient>

          <!-- Glass Sheen Gradient -->
          <linearGradient id="glass-sheen" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="rgba(255, 255, 255, 0.45)" />
            <stop offset="35%" stop-color="rgba(255, 255, 255, 0.08)" />
            <stop offset="100%" stop-color="rgba(255, 255, 255, 0.02)" />
          </linearGradient>

          <!-- Soft Outer Glow Filter -->
          <filter id="soft-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <!-- Desk Surface Line -->
        <rect x="20" y="238" width="360" height="6" rx="3" fill="#2f3549" />
        <rect x="40" y="244" width="8" height="26" fill="#24283b" />
        <rect x="352" y="244" width="8" height="26" fill="#24283b" />

        <!-- Desk Lamp (Far Left) -->
        <path d="M45 238 L60 238 M52 238 L52 135 Q52 105 80 105 L90 105" stroke="#565f89" stroke-width="3.5" stroke-linecap="round" fill="none" />
        <path d="M80 98 L105 112 L86 118 Z" fill="#7aa2f7" />
        <!-- Soft Lamp Light Cone -->
        <polygon points="92,114 35,238 160,238" fill="url(#screen-glow)" opacity="0.06" />

        <!-- Prominent Glowing Monitor with Live Animated Code (Left-Center) -->
        <!-- Monitor Stand & Base -->
        <rect x="95" y="234" width="30" height="4" rx="2" fill="#44475a" />
        <rect x="108" y="215" width="4" height="20" fill="#2f3549" />
        <!-- Monitor Frame -->
        <rect x="62" y="135" width="96" height="82" rx="5" fill="#1f2335" stroke="#44475a" stroke-width="2.5" />
        <!-- Screen Interior -->
        <rect x="67" y="140" width="86" height="72" rx="3" fill="#141620" />

        <!-- Animated Code inside Monitor -->
        <g class="monitor-screen-code">
          <!-- Window traffic light dots -->
          <circle cx="73" cy="146" r="1.8" fill="#ff5f57" />
          <circle cx="78" cy="146" r="1.8" fill="#ffbd2e" />
          <circle cx="83" cy="146" r="1.8" fill="#28c840" />

          <!-- Syntax Highlighted Animated Code Lines -->
          <rect class="code-line l1" x="73" y="154" width="28" height="3.5" rx="1.7" fill="#ff79c6" />
          <rect class="code-line l2" x="78" y="161" width="46" height="3.5" rx="1.7" fill="#7aa2f7" />
          <rect class="code-line l3" x="84" y="168" width="38" height="3.5" rx="1.7" fill="#9ece6a" />
          <rect class="code-line l4" x="84" y="175" width="52" height="3.5" rx="1.7" fill="#7dcfff" />
          <rect class="code-line l5" x="78" y="182" width="32" height="3.5" rx="1.7" fill="#bd93f9" />
          <rect class="code-line l6" x="73" y="189" width="20" height="3.5" rx="1.7" fill="#ff79c6" />
          
          <!-- Blinking Cursor -->
          <rect class="screen-cursor" x="96" y="189" width="3" height="4" fill="#7aa2f7" />

          <!-- Animated Scanner Sweep Line -->
          <line class="screen-scanline" x1="67" y1="140" x2="153" y2="140" stroke="rgba(122, 162, 247, 0.45)" stroke-width="1.5" />
        </g>

        <!-- Ergonomic Office Chair behind Character -->
        <g class="chair-group">
          <path d="M138 150 Q132 188 140 238" stroke="#1a1b26" stroke-width="7" stroke-linecap="round" fill="none" />
          <rect x="130" y="152" width="10" height="28" rx="4" fill="#24283b" />
          <rect x="133" y="184" width="8" height="42" rx="3" fill="#1f2335" />
          <path d="M140 216 L160 216" stroke="#24283b" stroke-width="4" stroke-linecap="round" />
        </g>

        <!-- Mechanical Keyboard on Desk under Left Hand -->
        <g class="keyboard-group">
          <rect x="88" y="232" width="48" height="6" rx="2" fill="#2f3549" stroke="#44475a" stroke-width="1" />
          <line x1="92" y1="234" x2="132" y2="234" stroke="#7aa2f7" stroke-width="1.5" stroke-dasharray="3 2" opacity="0.85" />
        </g>

        <!-- Realistic Connected Chemist / Developer Character -->
        <g class="chemist-character">
          <!-- Torso & Hoodie with Anatomical Depth -->
          <path d="M146 168 Q165 158 186 166 L190 238 L142 238 Z" fill="#24283b" />
          <path d="M148 170 Q168 162 184 170 L188 238 L146 238 Z" fill="#343746" />
          <!-- Hoodie Collar & Fold -->
          <path d="M160 162 L170 176 L176 164" stroke="#44475a" stroke-width="2" fill="#24283b" />

          <!-- Head, Neck, Face & Hair Profile -->
          <g class="chemist-head">
            <!-- Neck -->
            <path d="M165 146 L175 146 L177 158 L165 158 Z" fill="#9aa5ce" />
            <!-- Face Contour -->
            <path d="M164 125 Q182 125 182 144 Q182 154 172 156 Q162 156 160 142 Z" fill="#a9b1d6" />
            <!-- Ear -->
            <circle cx="162" cy="144" r="3.5" fill="#9aa5ce" />
            <!-- Layered Hair -->
            <path d="M156 136 Q158 118 174 118 Q188 118 186 132 Q182 136 178 132 Q174 124 164 126 Z" fill="#1f2335" />
            <path d="M156 132 Q160 122 172 122 Q180 122 184 130" stroke="#24283b" stroke-width="2.5" stroke-linecap="round" fill="none" />
            <!-- Glasses Frame with Cyan Monitor Reflection -->
            <rect x="172" y="136" width="10" height="8" rx="2.5" stroke="#1f2335" stroke-width="1.8" fill="rgba(122, 162, 247, 0.25)" />
            <line x1="168" y1="139" x2="172" y2="139" stroke="#1f2335" stroke-width="1.5" />
            <line x1="174" y1="138" x2="179" y2="142" stroke="rgba(255, 255, 255, 0.75)" stroke-linecap="round" />
          </g>

          <!-- Left Arm (Typing naturally on Keyboard) -->
          <g class="left-arm-typing">
            <path d="M154 174 Q144 195 132 212" stroke="#343746" stroke-width="9.5" stroke-linecap="round" fill="none" />
            <path d="M132 212 Q124 220 112 228" stroke="#44475a" stroke-width="7.5" stroke-linecap="round" fill="none" />
            <ellipse cx="112" cy="228" rx="4" ry="2.5" fill="#24283b" />
            <!-- Hand typing on keyboard -->
            <path d="M110 229 Q104 231 98 232" stroke="#a9b1d6" stroke-width="4.2" stroke-linecap="round" fill="none" />
          </g>

          <!-- Right Arm (Reaching out & Gripping Flask Neck) -->
          <g class="right-arm-holding">
            <path d="M178 174 Q196 186 216 195" stroke="#343746" stroke-width="10.5" stroke-linecap="round" fill="none" />
            <path d="M214 194 L228 198" stroke="#44475a" stroke-width="8" stroke-linecap="round" fill="none" />
            <ellipse cx="226" cy="198" rx="3.5" ry="4.5" fill="#24283b" />
            <!-- Gripping Hand with Fingers around Flask -->
            <ellipse cx="230" cy="198" rx="4" ry="4" fill="#a9b1d6" />
            <path d="M228 194 Q233 192 237 194" stroke="#9aa5ce" stroke-width="2.2" stroke-linecap="round" fill="none" />
            <path d="M232 196 C236 195 238 199 235 203 C232 205 228 204 228 201" stroke="#a9b1d6" stroke-width="2.6" stroke-linecap="round" fill="none" />
          </g>
        </g>

        <!-- Compact Smaller Elixir Flask Held in Hand -->
        <g class="flask-desk-group">
          <!-- Outer Glass Ambient Glow -->
          <path 
            d="M231 162 L245 162 L245 180 Q256 193 264 212 Q268 224 262 232 Q258 236 244 236 L228 236 Q214 236 210 232 Q204 224 208 212 Q216 193 231 180 Z" 
            fill="rgba(189, 147, 249, 0.18)" 
            filter="url(#soft-glow)"
          />

          <!-- Liquid Area (Clipped inside Flask) -->
          <g clip-path="url(#flask-desk-clip)">
            <g class="liquid-fill-anim">
              <rect x="195" y="162" width="80" height="80" fill="url(#elixir-fluid)" />
              
              <!-- Surface Boiling Wave -->
              <path class="wave-surface" fill="#ff79c6" opacity="0.85"
                d="M195 164 Q215 158 238 164 T275 164 L275 180 L195 180 Z" 
              />

              <!-- Magic Bubbles -->
              <circle class="bubble b1" cx="225" cy="216" r="2.5" fill="rgba(255,255,255,0.85)" />
              <circle class="bubble b2" cx="238" cy="224" r="3.2" fill="rgba(255,255,255,0.95)" />
              <circle class="bubble b3" cx="248" cy="212" r="2.2" fill="rgba(255,255,255,0.8)" />
            </g>
          </g>

          <!-- Outer Glass Body Path -->
          <path 
            d="M231 162 L245 162 L245 180 Q256 193 264 212 Q268 224 262 232 Q258 236 244 236 L228 236 Q214 236 210 232 Q204 224 208 212 Q216 193 231 180 Z" 
            fill="url(#glass-sheen)" 
            stroke="rgba(255, 255, 255, 0.85)" 
            stroke-width="2.2"
          />

          <!-- Glowing Mouth Lip Overboil Fill -->
          <g class="mouth-spill-group" :class="{ 'show-spill': isOverflowing }">
            <ellipse cx="238" cy="162" rx="7.5" ry="2.5" fill="url(#elixir-fluid)" />
            <path d="M230 162 Q238 165 246 162 Q238 159 230 162 Z" fill="#ff79c6" opacity="0.9" />
          </g>

          <!-- Top Rim Lip Outer Border -->
          <ellipse ref="flaskMouth" cx="238" cy="162" rx="7" ry="2" stroke="rgba(255, 255, 255, 0.9)" stroke-width="1.8" fill="none" />
        </g>
      </svg>

      <!-- Subtitle Label under workstation -->
      <div class="brew-label">
        <span class="dot"></span> Alchemist at work...
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const emit = defineEmits(['done']);

const canvas = ref(null);
const flaskMouth = ref(null);
const isOverflowing = ref(false);
const isFading = ref(false);

let animId = null;
let timer1 = null;
let timer2 = null;
let timer3 = null;

function initPhysics() {
  const c = canvas.value;
  if (!c) return;
  const ctx = c.getContext('2d');
  if (!ctx) return;

  let width = (c.width = window.innerWidth);
  let height = (c.height = window.innerHeight);

  const handleResize = () => {
    width = c.width = window.innerWidth;
    height = c.height = window.innerHeight;
  };
  window.addEventListener('resize', handleResize);

  const codeTokens = [
    'def', 'fn', '|>', ':ok', '%{}', 'Enum', 'mix', 'GenServer', 'Task',
    'func', 'go', 'chan', 'err != nil', 'struct', 'defer',
    'const', 'await', 'async', '=>', 'import', 'Promise', 'type'
  ];
  const tokenColors = [
    '#ff79c6', '#bd93f9', '#7aa2f7', '#7dcfff', '#9ece6a', '#ff9e64'
  ];

  let codeParticles = [];
  let frameCounter = 0;

  const animate = () => {
    ctx.clearRect(0, 0, width, height);

    let flaskMouthX = width / 2 + 38; 
    let flaskMouthY = height / 2 + 22;

    if (flaskMouth.value) {
      const rect = flaskMouth.value.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        flaskMouthX = rect.left + rect.width / 2;
        flaskMouthY = rect.top + rect.height / 2;
      }
    }

    frameCounter++;

    if (isOverflowing.value && frameCounter % 9 === 0) {
      const side = Math.random() > 0.5 ? -1 : 1;
      const token = codeTokens[Math.floor(Math.random() * codeTokens.length)];
      const color = tokenColors[Math.floor(Math.random() * tokenColors.length)];

      codeParticles.push({
        text: token,
        x: flaskMouthX + (Math.random() - 0.5) * 6,
        y: flaskMouthY,
        spawnY: flaskMouthY,
        vx: side * (0.25 + Math.random() * 0.6),
        vy: -1.3 - Math.random() * 0.9,
        rot: (Math.random() - 0.5) * 0.15,
        vRot: (Math.random() - 0.5) * 0.015,
        fontSize: 12 + Math.floor(Math.random() * 4),
        scale: 0.85,
        alpha: 0,
        color: color
      });
    }

    for (let i = codeParticles.length - 1; i >= 0; i--) {
      const p = codeParticles[i];
      p.x += p.vx + Math.sin((p.spawnY - p.y) * 0.04) * 0.5;
      p.y += p.vy;
      p.vy -= 0.015;
      p.rot += p.vRot;
      p.scale += 0.004;

      const riseDist = p.spawnY - p.y;
      if (riseDist < 20) {
        p.alpha = Math.min(1, riseDist / 14);
      } else if (riseDist > 55) {
        p.alpha -= 0.022;
      }

      if (p.alpha <= 0 || p.y <= 0) {
        codeParticles.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.globalAlpha = Math.max(0, p.alpha);
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.scale(p.scale, p.scale);

      ctx.font = `700 ${p.fontSize}px 'JetBrains Mono', 'Fira Code', monospace`;
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 10;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      ctx.fillText(p.text, 0, 0);
      ctx.restore();
    }

    animId = requestAnimationFrame(animate);
  };

  animId = requestAnimationFrame(animate);
}

onMounted(() => {
  initPhysics();

  timer1 = setTimeout(() => {
    isOverflowing.value = true;
  }, 500);

  timer2 = setTimeout(() => {
    isFading.value = true;
  }, 2400);

  timer3 = setTimeout(() => {
    emit('done');
  }, 3000);
});

onBeforeUnmount(() => {
  if (animId && typeof cancelAnimationFrame !== 'undefined') cancelAnimationFrame(animId);
  if (timer1) clearTimeout(timer1);
  if (timer2) clearTimeout(timer2);
  if (timer3) clearTimeout(timer3);
});
</script>

<style scoped>
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
  transition: transform 0.8s cubic-bezier(0.76, 0, 0.24, 1);
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

.alchemist-scene {
  position: relative;
  z-index: 2;
  width: 440px;
  height: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: -25vh;
}

.alchemist-scene.is-brewing {
  animation: desk-rumble 0.08s ease-in-out infinite alternate;
}

@keyframes desk-rumble {
  0% { transform: translate(-1px, 1px); }
  100% { transform: translate(1px, -1px); }
}

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

.alchemist-svg {
  width: 400px;
  height: 280px;
  z-index: 2;
  overflow: visible;
}

.code-line {
  animation: code-shimmer 1.8s ease-in-out infinite alternate;
  transform-origin: left center;
}
.l1 { animation-delay: 0.1s; }
.l2 { animation-delay: 0.3s; }
.l3 { animation-delay: 0.5s; }
.l4 { animation-delay: 0.7s; }
.l5 { animation-delay: 0.9s; }
.l6 { animation-delay: 1.1s; }

@keyframes code-shimmer {
  0% { opacity: 0.45; transform: scaleX(0.92); }
  50% { opacity: 1; transform: scaleX(1); }
  100% { opacity: 0.7; transform: scaleX(0.95); }
}

.left-arm-typing {
  animation: typing-motion 0.22s ease-in-out infinite alternate;
  transform-origin: 154px 174px;
}
@keyframes typing-motion {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(-1.2deg) translateY(-0.6px); }
}

.right-arm-holding {
  animation: flask-hold-motion 2.4s ease-in-out infinite alternate;
  transform-origin: 178px 174px;
}
@keyframes flask-hold-motion {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(0.6deg) translateY(-0.4px); }
}

.chemist-head {
  animation: head-nod 2.8s ease-in-out infinite alternate;
  transform-origin: 165px 158px;
}
@keyframes head-nod {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(0.8deg) translateY(0.4px); }
}

.screen-cursor {
  animation: screen-blink 0.6s step-end infinite;
}
@keyframes screen-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.screen-scanline {
  animation: scan-sweep 2.2s ease-in-out infinite;
}
@keyframes scan-sweep {
  0% { transform: translateY(0); opacity: 0.1; }
  50% { opacity: 0.65; }
  100% { transform: translateY(68px); opacity: 0.1; }
}

.liquid-fill-anim {
  animation: fill-up 1.0s cubic-bezier(0.25, 1, 0.5, 1) forwards;
}
@keyframes fill-up {
  0% { transform: translateY(60px); }
  100% { transform: translateY(0); }
}

.wave-surface {
  animation: wave-motion 0.5s ease-in-out infinite alternate;
}
@keyframes wave-motion {
  0% { transform: translateY(0) scaleY(1); }
  100% { transform: translateY(-3px) scaleY(1.3); }
}

.bubble {
  animation: bubble-float 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
.b1 { animation-delay: 0s; }
.b2 { animation-delay: 0.3s; animation-duration: 0.9s; }
.b3 { animation-delay: 0.6s; animation-duration: 1.1s; }

@keyframes bubble-float {
  0% { transform: translateY(0) scale(0.6); opacity: 0.2; }
  50% { opacity: 0.9; }
  100% { transform: translateY(-50px) scale(1.2); opacity: 0; }
}

.mouth-spill-group {
  opacity: 0;
  transition: opacity 0.3s ease;
}
.mouth-spill-group.show-spill {
  opacity: 1;
}

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
