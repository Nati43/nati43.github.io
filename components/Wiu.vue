<template>
    <div class="p-0 pb-5 m-0 d-flex flex-column wiu-section vw-100 overflow-hidden">

        <div class="mx-auto">
            <h1 class="title-large pt-5 mt-5 pb-3 mb-3 pb-md-5 mb-md-5 text-center" style="color: var(--wiu-title);">Toolbox</h1>
        </div>

        <div class="d-flex flex-row align-items-center justify-content-center flex-grow-1 pb-4 p-md-0 mx-auto w-100">
            <div v-if="items && items.length" class="toolbox-layout d-flex flex-column flex-lg-row align-items-center justify-content-center mx-auto px-3 w-100">
                
                <!-- Left Pane: 2x2 Category Grid (Backend Prioritized First) -->
                <div class="categories-grid">
                    <!-- 1. Backend (Primary Focus) -->
                    <div class="category-card">
                        <div class="category-header">
                            <span class="cat-pill cat-be">Backend</span>
                        </div>
                        <div class="chips-wrap">
                            <div v-for="(item, idx) in items.filter(x => x.category === categories['Backend'])"
                                :key="'be-' + idx" @click="changeSelected(item)">
                                <div class="highlights py-2 px-3 m-1 btn chip-btn"
                                    :class="{'active-chip': selected === item}">
                                    <span class="h6 font-weight-bold mb-0">{{ item.name }}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 2. Database -->
                    <div class="category-card">
                        <div class="category-header">
                            <span class="cat-pill cat-db">Database</span>
                        </div>
                        <div class="chips-wrap">
                            <div v-for="(item, idx) in items.filter(x => x.category === categories['Database'])"
                                :key="'db-' + idx" @click="changeSelected(item)">
                                <div class="highlights py-2 px-3 m-1 btn chip-btn"
                                    :class="{'active-chip': selected === item}">
                                    <span class="h6 font-weight-bold mb-0">{{ item.name }}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 3. Frontend -->
                    <div class="category-card">
                        <div class="category-header">
                            <span class="cat-pill cat-fe">Frontend</span>
                        </div>
                        <div class="chips-wrap">
                            <div v-for="(item, idx) in items.filter(x => x.category === categories['Frontend'])"
                                :key="'fe-' + idx" @click="changeSelected(item)">
                                <div class="highlights py-2 px-3 m-1 btn chip-btn"
                                    :class="{'active-chip': selected === item}">
                                    <span class="h6 font-weight-bold mb-0">{{ item.name }}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 4. Other / DevOps -->
                    <div class="category-card">
                        <div class="category-header">
                            <span class="cat-pill cat-other">DevOps &amp; Tools</span>
                        </div>
                        <div class="chips-wrap">
                            <div v-for="(item, idx) in items.filter(x => x.category === categories['Other'])"
                                :key="'ot-' + idx" @click="changeSelected(item)">
                                <div class="highlights py-2 px-3 m-1 btn chip-btn"
                                    :class="{'active-chip': selected === item}">
                                    <span class="h6 font-weight-bold mb-0">{{ item.name }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right Pane: Centered Interactive Terminal (Mac Window Style) -->
                <div class="terminal-pane">
                    <transition name="terminal-fade">
                        <div id="description-box" class="terminal-window" v-if="selected">
                            <!-- Title bar -->
                            <div class="terminal-titlebar">
                                <div class="traffic-lights">
                                    <span class="tl tl-red" @click="selected = null"></span>
                                </div>
                                <span class="terminal-title">~ {{ selected.name }}</span>
                                <span class="tl-spacer"></span>
                            </div>
                            <!-- Terminal body -->
                            <div class="terminal-body">
                                <!-- Prompt line -->
                                <div class="terminal-line prompt-line">
                                    <span class="prompt-user">nati</span><span class="prompt-at">@</span><span class="prompt-host">portfolio</span><span class="prompt-sep">:~$</span>
                                    <span class="prompt-cmd"> info {{ selected.name.toLowerCase() }}</span>
                                </div>
                                <!-- Typed output -->
                                <div class="terminal-line output-line" v-if="typedDescription">
                                    <span class="terminal-output">{{ typedDescription }}<span class="term-cursor" v-if="isTyping">▊</span></span>
                                </div>
                                <!-- Points as typed list -->
                                <div v-if="!isTyping && selected.points && selected.points.length">
                                    <div class="terminal-line" v-for="(point, idx) in visiblePoints" :key="idx">
                                        <span class="point-arrow" style="color: var(--wiu-chip-active-bg);">▸</span>
                                        <span class="terminal-output ml-2">{{ point }}<span class="term-cursor" v-if="idx === visiblePoints.length - 1 && isTypingPoints">▊</span></span>
                                    </div>
                                </div>
                                <!-- Icon -->
                                <div v-if="!isTypingPoints && selected.icon" class="terminal-icon-row mt-2">
                                    <img :src="selected.icon" class="terminal-icon" alt="icon" />
                                </div>
                            </div>
                        </div>
                    </transition>
                </div>

            </div>
        </div>

    </div>
</template>

<script setup>
import { ref, watch, nextTick, onMounted, onBeforeUnmount } from 'vue';
import { collection, getDocs } from 'firebase/firestore';
import { getDownloadURL, ref as storageRef } from 'firebase/storage';
import { db, storage } from '~/utils/firebase';

const categories = { 'Frontend': 0, 'Backend': 1, 'Database': 2, 'Other': 3 };

const selected = ref(null);
const typedDescription = ref('');
const isTyping = ref(false);
const visiblePoints = ref([]);
const isTypingPoints = ref(false);
let typeTimer = null;

// Fetch at build time — baked into pre-rendered HTML for crawlers
const { data: items } = useAsyncData('toolbox', async () => {
    const querySnapshot = await getDocs(collection(db, 'toolbox'));
    const fetched = await Promise.all(
        querySnapshot.docs
            .map(doc => doc.data())
            .filter(data => data && data.show)
            .map(async (data) => {
                let iconUrl = null;
                if (data.icon) {
                    try { iconUrl = await getDownloadURL(storageRef(storage, 'icons/' + data.icon + '.svg')); } catch { /* no icon */ }
                }
                return { name: data.name, category: data.category, icon: iconUrl, description: data.description, points: data.points, order: data.order, default: data.default };
            })
    );
    fetched.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    return fetched;
});
if (!items.value) items.value = [];

watch(selected, (newVal) => {
    typedDescription.value = '';
    isTyping.value = false;
    visiblePoints.value = [];
    isTypingPoints.value = false;
    if (typeTimer) { clearTimeout(typeTimer); typeTimer = null; }
    if (newVal) nextTick(() => startTypewriter());
});

function changeSelected(obj) {
    if (selected.value !== obj) {
        selected.value = null;
        if (typeTimer) { clearTimeout(typeTimer); typeTimer = null; }
        setTimeout(() => {
            selected.value = obj;
            if (typeof window !== 'undefined' && window.innerWidth < 768) {
                setTimeout(() => {
                    const descEl = document.getElementById('description-box');
                    if (descEl) window.scrollTo({ top: descEl.getBoundingClientRect().top + window.pageYOffset - 250, behavior: 'smooth' });
                }, 50);
            }
        }, 250);
    }
}

function startTypewriter() {
    const desc = selected.value?.description ?? '';
    const points = selected.value?.points ?? [];
    typedDescription.value = ''; isTyping.value = true; visiblePoints.value = []; isTypingPoints.value = false;
    let i = 0;
    const typeChar = () => {
        if (!selected.value) return;
        if (i < desc.length) { typedDescription.value += desc.charAt(i++); typeTimer = setTimeout(typeChar, 18); }
        else { isTyping.value = false; if (points.length) nextTick(() => typePoints(points, 0)); }
    };
    typeTimer = setTimeout(typeChar, 120);
}

function typePoints(points, idx) {
    if (!selected.value || idx >= points.length) { isTypingPoints.value = false; return; }
    isTypingPoints.value = true;
    const point = points[idx]; let typed = ''; let i = 0;
    visiblePoints.value[idx] = '';
    const typeChar = () => {
        if (!selected.value) return;
        if (i < point.length) { typed += point.charAt(i++); visiblePoints.value[idx] = typed; typeTimer = setTimeout(typeChar, 14); }
        else typeTimer = setTimeout(() => typePoints(points, idx + 1), 80);
    };
    typeChar();
}

onMounted(() => {
    if (typeof window !== 'undefined' && window.innerWidth > 768 && items.value.length > 0) {
        selected.value = items.value.find(i => i.default) || items.value.find(i => i.category === categories['Backend']) || items.value[0];
    }
});

onBeforeUnmount(() => { if (typeTimer) clearTimeout(typeTimer); });
</script>

<style scoped>
.title-large {
    font-size: clamp(38px, 2.5vw, 52px);
    font-weight: 900;
}
.wiu-section {
    max-width: 100vw;
    overflow: hidden;
    background-color: var(--wiu-bg);
    color: var(--wiu-fg);
}

/* ── 2-Pane Toolbox Layout ────────────────── */
.toolbox-layout {
    width: 92vw;
    max-width: 1440px;
    gap: clamp(2rem, 5vw, 5.5rem);
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;
    margin: 0 auto;
}

/* Categories 2x2 Grid */
.categories-grid {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: 100%;
    max-width: 680px;
    flex: 1.15;
}

.category-card {
    background: rgba(255, 255, 255, 0.025);
    border: 1px solid var(--wiu-chip-border);
    border-radius: 14px;
    padding: 1.4rem 1.35rem;
    text-align: left;
    transition: border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
}
.category-card:hover {
    border-color: rgba(122, 162, 247, 0.4);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.category-header {
    margin-bottom: 0.85rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

/* Category Accent Badges */
.cat-pill {
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    padding: 4px 11px;
    border-radius: 6px;
    display: inline-block;
}
.cat-be {
    color: #7aa2f7;
    background: rgba(122, 162, 247, 0.12);
    border: 1px solid rgba(122, 162, 247, 0.25);
}
.cat-db {
    color: #7dcfff;
    background: rgba(125, 207, 255, 0.12);
    border: 1px solid rgba(125, 207, 255, 0.25);
}
.cat-fe {
    color: #ff79c6;
    background: rgba(255, 121, 198, 0.12);
    border: 1px solid rgba(255, 121, 198, 0.25);
}
.cat-other {
    color: #bd93f9;
    background: rgba(189, 147, 249, 0.12);
    border: 1px solid rgba(189, 147, 249, 0.25);
}

.chips-wrap {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.25rem;
    margin: -0.25rem;
}

.chip-btn {
    background-color: var(--wiu-chip-bg);
    color: var(--wiu-chip-fg);
    border: 1px solid var(--wiu-chip-border);
    border-radius: 2em;
    transition: all 0.2s ease;
}
.chip-btn:hover {
    color: var(--wiu-chip-active-bg);
    border-color: var(--wiu-chip-active-bg);
}
.active-chip {
    color: var(--wiu-chip-active-fg) !important;
    background-color: var(--wiu-chip-active-bg) !important;
    border-color: var(--wiu-chip-active-bg) !important;
    box-shadow: 0 0 10px rgba(122, 162, 247, 0.35);
}

/* ── Terminal Pane (Dual-axis centered & Spaced) ───── */
.terminal-pane {
    flex: 1;
    width: 100%;
    max-width: 580px;
    min-width: 320px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto 0;
}

/* ── Terminal window ─────────────────────────── */
.terminal-window {
    width: 100%;
    margin: auto;
    min-height: 280px;
    background: rgba(18, 18, 28, 0.72);
    backdrop-filter: blur(18px);
    -webkit-backdrop-filter: blur(18px);
    border: 1px solid rgba(255, 255, 255, 0.09);
    border-radius: 12px;
    box-shadow:
        0 24px 60px rgba(0, 0, 0, 0.55),
        inset 0 1px 0 rgba(255, 255, 255, 0.07);
    overflow: hidden;
    font-family: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
}

/* Title bar */
.terminal-titlebar {
    display: flex;
    align-items: center;
    gap: 0;
    padding: 10px 14px;
    background: rgba(255, 255, 255, 0.05);
    border-bottom: 1px solid rgba(255, 255, 255, 0.07);
    user-select: none;
}
.traffic-lights {
    display: flex;
    align-items: center;
    gap: 6px;
    margin-right: 10px;
}
.tl {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    display: inline-block;
    opacity: 0.85;
}
.tl-red    { background: #ff5f57; cursor: pointer; }
.tl-red:hover { opacity: 1; filter: brightness(1.15); }
.tl-spacer { flex: 1; }
.terminal-title {
    flex: 1;
    text-align: center;
    font-size: 0.78rem;
    color: rgba(255,255,255,0.4);
    letter-spacing: 0.04em;
}

/* Body */
.terminal-body {
    padding: 18px 24px 24px;
    min-height: 200px;
    text-align: left;
}
.terminal-line {
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    line-height: 1.7;
    font-size: 0.85rem;
    margin-bottom: 2px;
    text-align: left;
}

/* Prompt */
.prompt-user   { color: #50fa7b; font-weight: 700; }
.prompt-at     { color: rgba(255,255,255,0.3); }
.prompt-host   { color: #8be9fd; font-weight: 700; }
.prompt-sep    { color: rgba(255,255,255,0.35); margin-right: 4px; }
.prompt-cmd    { color: rgba(255,255,255,0.55); }

/* Output */
.terminal-output {
    color: rgba(255, 255, 255, 0.8);
    white-space: pre-wrap;
    word-break: break-word;
    font-size: 0.85rem;
    line-height: 1.65;
    text-align: left;
}
.output-line {
    margin-top: 6px;
    margin-bottom: 4px;
}
.point-arrow {
    font-size: 0.78rem;
    flex-shrink: 0;
    margin-top: 1px;
}

/* Blinking block cursor */
.term-cursor {
    display: inline-block;
    animation: blink-block 0.9s step-end infinite;
    color: var(--wiu-chip-active-bg);
    font-size: 0.85rem;
    line-height: 1;
    vertical-align: baseline;
}
@keyframes blink-block {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0; }
}

/* Icon row */
.terminal-icon-row {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    opacity: 0.45;
    padding-top: 4px;
}
.terminal-icon {
    width: 36px;
    height: 36px;
    object-fit: contain;
    filter: grayscale(0.3);
}

/* Transition */
.terminal-fade-enter-active {
    transition: opacity 0.22s ease, transform 0.22s ease;
}
.terminal-fade-leave-active {
    transition: opacity 0.15s ease, transform 0.15s ease;
}
.terminal-fade-enter-from,
.terminal-fade-leave-to {
    opacity: 0;
    transform: scale(0.96) translateY(6px);
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) { 
    .categories-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 1.25rem;
    }
    .terminal-body {
        font-size: 0.95rem;
    }
    .terminal-output,
    .terminal-line {
        font-size: 0.92rem;
    }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
    .wiu-section {
        min-height: 100vh;
    }
    .terminal-pane {
        align-self: center;
    }
}
</style>
