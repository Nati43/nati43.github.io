<template>
    <div class="p-0 pb-5 m-0 d-flex flex-column wiu-section vw-100 overflow-hidden">

        <div class="mx-auto">
            <h1 class="title-large pt-5 mt-5 pb-3 mb-3 pb-md-5 mb-md-5 text-center" style="color: var(--wiu-title);">Toolbox</h1>
        </div>

        <div class="d-flex flex-row align-items-center justify-content-center flex-grow-1 pb-4 p-md-0 mx-auto w-100">
            <div v-if="!loadingToolbox" class="toolbox-layout d-flex flex-column flex-lg-row align-items-center justify-content-center mx-auto px-3 w-100">
                
                <!-- Left Pane: 2x2 Category Grid (Backend Prioritized First) -->
                <div class="categories-grid">
                    <!-- 1. Backend (Primary Focus) -->
                    <div class="category-card">
                        <div class="category-header">
                            <span class="cat-pill cat-be">Backend</span>
                        </div>
                        <div class="chips-wrap">
                            <div v-for="(item, idx) in items.filter(x => x.category == categories['Backend'])"
                                :key="'be-' + idx" @click="changeSelected(item)">
                                <div class="highlights py-2 px-3 m-1 btn chip-btn"
                                    :class="{'active-chip': selected == item}">
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
                            <div v-for="(item, idx) in items.filter(x => x.category == categories['Database'])"
                                :key="'db-' + idx" @click="changeSelected(item)">
                                <div class="highlights py-2 px-3 m-1 btn chip-btn"
                                    :class="{'active-chip': selected == item}">
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
                            <div v-for="(item, idx) in items.filter(x => x.category == categories['Frontend'])"
                                :key="'fe-' + idx" @click="changeSelected(item)">
                                <div class="highlights py-2 px-3 m-1 btn chip-btn"
                                    :class="{'active-chip': selected == item}">
                                    <span class="h6 font-weight-bold mb-0">{{ item.name }}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 4. DevOps & Other -->
                    <div class="category-card">
                        <div class="category-header">
                            <span class="cat-pill cat-other">DevOps & Other</span>
                        </div>
                        <div class="chips-wrap">
                            <div v-for="(item, idx) in items.filter(x => x.category == categories['Other'])"
                                :key="'ot-' + idx" @click="changeSelected(item)">
                                <div class="highlights py-2 px-3 m-1 btn chip-btn"
                                    :class="{'active-chip': selected == item}">
                                    <span class="h6 font-weight-bold mb-0">{{ item.name }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right Pane: Terminal Window -->
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
                                    <b-img :src="selected.icon" class="terminal-icon" alt="icon">
                                        <b-spinner small />
                                    </b-img>
                                </div>
                            </div>
                        </div>
                    </transition>
                </div>

            </div>
            <b-spinner v-else variant="secondary" class="my-5"></b-spinner>
        </div>

    </div>
</template>

<script>
import { collection, getDocs } from '@firebase/firestore';
import { getDownloadURL, ref } from '@firebase/storage';
import { db, storage } from '../firebase/index';
export default {
    name:"wiu",
    data: ()=>{
        return {
            items: [],
            categories: {
                'Frontend': 0,
                'Backend': 1,
                'Database': 2,
                'Other': 3,
            },
            selected: null,
            windowWidth: window.innerWidth,
            loadingToolbox: false,
            // Typewriter state
            typedDescription: '',
            isTyping: false,
            visiblePoints: [],
            isTypingPoints: false,
            _typeTimer: null,
        }
    },
    watch: {
        selected(newVal) {
            // Reset and restart typewriter whenever selection changes
            this.typedDescription = '';
            this.isTyping = false;
            this.visiblePoints = [];
            this.isTypingPoints = false;
            if (this._typeTimer) { clearTimeout(this._typeTimer); this._typeTimer = null; }
            if (newVal) {
                this.$nextTick(() => this.startTypewriter());
            }
        }
    },
    async mounted() {
        await this.getDocsAndInit();
    },
    methods: {
        async getDocsAndInit() {
            this.items = [];
            this.loadingToolbox = true;
            try {
                const querySnapshot = await getDocs(collection(db, 'toolbox'));
                const fetchedItems = await Promise.all(
                    querySnapshot.docs
                        .map(doc => doc.data())
                        .filter(data => data && data.show)
                        .map(async (data) => {
                            let iconUrl = null;
                            if (data.icon) {
                                try {
                                    iconUrl = await getDownloadURL(ref(storage, 'icons/' + data.icon + '.svg'));
                                } catch (error) {
                                    iconUrl = null;
                                }
                            }
                            return {
                                name: data.name,
                                category: data.category,
                                icon: iconUrl,
                                description: data.description,
                                points: data.points,
                                order: data.order,
                                default: data.default,
                            };
                        })
                );

                fetchedItems.sort((a, b) => {
                    const orderA = a.order !== undefined ? a.order : 0;
                    const orderB = b.order !== undefined ? b.order : 0;
                    return orderA - orderB;
                });

                this.items = fetchedItems;

                if (window.innerWidth > 768 && this.items.length > 0) {
                    const defaultItem = this.items.find(item => item.default) ||
                                        this.items.find(item => item.category == this.categories['Backend']) ||
                                        this.items[0];
                    this.selected = defaultItem;
                }
            } catch (error) {
                console.error('Toolbox query error: ', error);
            } finally {
                this.loadingToolbox = false;
            }
        },
        changeSelected(obj) {
            if(this.selected != obj){
                this.selected = null;
                if (this._typeTimer) { clearTimeout(this._typeTimer); this._typeTimer = null; }
                setTimeout(()=>{
                    this.selected = obj;
                    this.$forceUpdate();
                    if(window.innerWidth < 768)
                        setTimeout(()=>{
                            window.scrollTo({
                                top: document.getElementById('description-box').getBoundingClientRect().top + window.pageYOffset - 250,
                                behavior: 'smooth'
                            });
                        }, 50)
                }, 250);
            }
        },
        startTypewriter() {
            const desc = this.selected && this.selected.description ? this.selected.description : '';
            const points = this.selected && this.selected.points ? this.selected.points : [];
            this.typedDescription = '';
            this.isTyping = true;
            this.visiblePoints = [];
            this.isTypingPoints = false;

            let i = 0;
            const typeChar = () => {
                if (!this.selected) return;
                if (i < desc.length) {
                    this.typedDescription += desc.charAt(i);
                    i++;
                    this._typeTimer = setTimeout(typeChar, 18);
                } else {
                    this.isTyping = false;
                    if (points.length) {
                        this.$nextTick(() => this.typePoints(points, 0));
                    }
                }
            };
            this._typeTimer = setTimeout(typeChar, 120);
        },
        typePoints(points, idx) {
            if (!this.selected || idx >= points.length) {
                this.isTypingPoints = false;
                return;
            }
            this.isTypingPoints = true;
            const point = points[idx];
            let typed = '';
            let i = 0;
            this.visiblePoints.splice(idx, 1, '');
            const typeChar = () => {
                if (!this.selected) return;
                if (i < point.length) {
                    typed += point.charAt(i);
                    this.$set(this.visiblePoints, idx, typed);
                    i++;
                    this._typeTimer = setTimeout(typeChar, 14);
                } else {
                    this._typeTimer = setTimeout(() => this.typePoints(points, idx + 1), 80);
                }
            };
            typeChar();
        }
    }
}
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
.terminal-fade-enter,
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