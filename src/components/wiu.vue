<template>
    <div class="p-0 pb-5 m-0 d-flex flex-column wiu-section vw-100 overflow-hidden">

        <div class="mx-auto">
            <h1 class="title-large pt-5 mt-5 pb-3 mb-3 pb-md-5 mb-md-5 text-center" style="color: var(--wiu-title);">Toolbox</h1>
        </div>

        <div class="d-flex flex-row align-items-start justify-content-center flex-grow-1 pb-3 p-md-0 mx-auto">
            <div v-if="!loadingToolbox" class="d-flex flex-column flex-md-row align-items-stretch">
                <div class="flex-grow-1 d-flex flex-row flex-md-column flex-wrap border-right mw-md-30" style="border-color: var(--wiu-chip-border) !important;">
                    <div class="flex-grow-1 d-flex flex-column algin-items-center p-4 border-bottom" style="border-color: var(--wiu-chip-border) !important;">
                        <!-- Frontend -->
                        <p class="font-weight-bold small mx-auto" style="color: var(--wiu-sub);">Frontend</p>
                        <div class="d-flex flex-row flex-wrap justify-content-center" >
                            <div v-for="(item, idx) in items.filter(x => x.category == categories['Frontend'])"
                                :key="idx" @click="changeSelected(item)"  >
                                    <div 
                                        class="highlights py-2 px-3 m-2 btn chip-btn" 
                                        :class="{'active-chip': selected==item}"
                                        style="border-radius: 2em;" >
                                        <span class="h6 font-weight-bold">
                                            {{ item.name }}
                                        </span>
                                    </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex-grow-1 d-flex flex-column algin-items-center p-4 border-bottom" style="border-color: var(--wiu-chip-border) !important;">
                        <!-- Backend -->
                        <p class="font-weight-bold small mx-auto" style="color: var(--wiu-sub);">Backend</p>
                        <div class="d-flex flex-row flex-wrap justify-content-center" >
                            <div v-for="(item, idx) in items.filter(x => x.category == categories['Backend'])"
                                :key="idx" @click="changeSelected(item)"  >
                                    <div 
                                        class="highlights py-2 px-3 m-2 btn chip-btn" 
                                        :class="{'active-chip': selected==item}"
                                        style="border-radius: 2em;" >
                                        <span class="h6 font-weight-bold">
                                            {{ item.name }}
                                        </span>
                                    </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex-grow-1 d-flex flex-column algin-items-center p-4 border-bottom border-md-0" style="border-color: var(--wiu-chip-border) !important;">
                        <!-- Database -->
                        <p class="font-weight-bold small mx-auto" style="color: var(--wiu-sub);">Database</p>
                        <div class="d-flex flex-row flex-wrap justify-content-center" >
                            <div v-for="(item, idx) in items.filter(x => x.category == categories['Database'])"
                                :key="idx" @click="changeSelected(item)"  >
                                    <div 
                                        class="highlights py-2 px-3 m-2 btn chip-btn" 
                                        :class="{'active-chip': selected==item}"
                                        style="border-radius: 2em;" >
                                        <span class="h6 font-weight-bold">
                                            {{ item.name }}
                                        </span>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex-grow-1 d-flex flex-column align-items-center justify-content-center p-4 border-right" style="border-color: var(--wiu-chip-border) !important;">
                    <!-- Other -->
                    <p class="font-weight-bold small mx-auto" style="color: var(--wiu-sub);">Other</p>
                    <div class="d-flex flex-md-column flex-wrap justify-content-center px-4" >
                        <div v-for="(item, idx) in items.filter(x => x.category == categories['Other'])"
                            :key="idx" @click="changeSelected(item)"  >
                                <div 
                                    class="highlights py-2 px-3 m-2 btn chip-btn" 
                                    :class="{'active-chip': selected==item}"
                                    style="border-radius: 2em;" >
                                    <span class="h6 font-weight-bold">
                                        {{ item.name }}
                                    </span>
                                </div>
                        </div>
                    </div>
                </div>
                <transition name="terminal-fade">
                    <div id="description-box" class="terminal-window my-auto mx-auto mx-md-5" v-if="selected">
                        <!-- Title bar -->
                        <div class="terminal-titlebar">
                            <div class="traffic-lights">
                                <span class="tl tl-red" @click="selected = null"></span>
                                <span class="tl tl-yellow"></span>
                                <span class="tl tl-green"></span>
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
    mounted(){
        let self = this;
        self.items = [];

        self.loadingToolbox = true;
        async function getDocsAndInit() {
            return getDocs(collection(db, 'toolbox')).then(async (querySnapshot) => {
                await Promise.all(querySnapshot.docs.map(async (doc) => {
                    if(doc.data().show) {
                        if(doc.data().icon) {
                            try {
                                let url = await getDownloadURL(ref(storage, 'icons/'+doc.data().icon+'.svg'));
                                self.items.push ({
                                    name: doc.data().name,
                                    category: doc.data().category,
                                    icon: url,
                                    description: doc.data().description,
                                    points: doc.data().points,
                                    order: doc.data().order,
                                });
                            } catch (error) {
                                self.items.push ({
                                    name: doc.data().name,
                                    category: doc.data().category,
                                    description: doc.data().description,
                                    points: doc.data().points,
                                    order: doc.data().order,
                                });
                            }
                        } else {
                            self.items.push ({
                                name: doc.data().name,
                                category: doc.data().category,
                                description: doc.data().description,
                                points: doc.data().points,
                                order: doc.data().order,
                            });
                        }
                    }
                }));
            }).catch(error => {
                console.log('Toolbox query error: ', error);
            });
        }

        getDocsAndInit().then(()=>{
            self.items.sort((a,b)=> {
                if ( a.order < b.order )
                    return -1;
                if ( a.order > b.order )
                    return 1;
                return 0;
            });
            self.loadingToolbox = false;
            self.$forceUpdate();
            setTimeout(()=>{
                if(window.innerWidth > 768)
                    self.selected = self.items[0];
            }, 250);
        });
    },
    methods: {
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
.bg-custom-grey {
    background-color: #555;
}
.wiu-section {
    max-width: 100vw;
    overflow: hidden;
    background-color: var(--wiu-bg);
    color: var(--wiu-fg);
}
.chip-btn {
    background-color: var(--wiu-chip-bg);
    color: var(--wiu-chip-fg);
    border: 1px solid var(--wiu-chip-border);
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
    box-shadow: 0 0 10px rgba(255, 127, 80, 0.4);
}
.left {
    min-width: 100vw;
}
.right {
    align-items: center;
}
.w-hidden {
    min-width: unset;
    display: none !important;
}
.title,
.subtitle {
    font-weight: 300;
}

/* ── Terminal window ─────────────────────────── */
.terminal-window {
    width: 90vw;
    max-width: 600px;
    min-width: 320px;
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
.tl-yellow { background: #ffbd2e; }
.tl-green  { background: #28c840; }
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
    .wiu-section {
        min-height: 100vh;
    }
    .left {
        min-width: unset;
    }
    .w-hidden {
        min-width: unset;
        display: flex !important;
    }
    .border-md-0 {
        border: 0 !important;
    }
    .mw-md-30 {
        max-width: 30vw;
    }
    .terminal-body {
        font-size: 0.95rem;
    }
    .terminal-output,
    .terminal-line {
        font-size: 0.92rem;
    }
}

/* Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
    .right {
        align-items: start;
    }
}

.layer-icons {
    width:4em;
    height:4em;
    border-radius:50%;
    background-size: 75%;
    background-color: #FFFFFF55 !important;
    background-position: center;
    background-repeat: no-repeat;
    background-blend-mode: color-dodge;
}
</style>