<template>
    <div class="p-0 pb-5 m-0 d-flex flex-column exp-section vw-100 overflow-hidden">

        <div class="mx-auto flex-grow-1 d-flex flex-column">
            <h1 class="title-large pt-3 pt-md-5 mt-3 mt-md-5 text-center" style="color: var(--exp-title);"> Experience </h1>

            <div v-if="!loadingExperiences" class="my-5 my-auto d-flex flex-column flex-md-row align-items-stretch">

                <!-- Mobile Scroll Indicator -->
                <div class="d-md-none text-center mb-2">
                    <span class="scroll-hint font-weight-bold">
                        <span>&larr;</span> swipe companies <span>&rarr;</span>
                    </span>
                </div>

                <div class="mx-md-4 company-tabs-container d-flex flex-row flex-md-column justify-content-stretch align-items-stretch">
                    <div 
                        v-for="(item, idx) in experiences" 
                        :key="idx" 
                        @click="setSelected(idx)"
                        :class="{'active': idx==selected}"
                        class="p-3 text-left company-tabs" >
                        {{item.companyName}}
                    </div>
                </div>

                <div class="details-container mx-4" style="min-width: 40vw;">
                    <transition name="bounce">
                        <div v-if="selected != null && experiences[selected] != null">
                            <div class="role-container"
                                v-for="(role, idx) in experiences[selected].roles"
                                :key="idx" >
                                
                                <div class="text-left card shadow-sm p-4 my-3 border-0 theme-card">
                                    <!-- Top-Right Project Corner Cutout -->
                                    <div v-if="role.project" class="role-project-corner">
                                        <a 
                                            v-if="role.projectLink" 
                                            :href="role.projectLink" 
                                            target="_blank" 
                                            rel="noopener noreferrer" 
                                            class="project-corner-link"
                                            :title="'Visit ' + role.project"
                                        >
                                            <span class="project-name">{{ role.project }}</span>
                                            <svg class="external-icon" viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                                <polyline points="15 3 21 3 21 9"></polyline>
                                                <line x1="10" y1="14" x2="21" y2="3"></line>
                                            </svg>
                                        </a>
                                        <div v-else class="project-corner-badge">
                                            <span class="project-name">{{ role.project }}</span>
                                        </div>
                                    </div>

                                    <div :class="{ 'pr-5 mr-md-4': role.project }">
                                        <p class="title" style="color: var(--exp-fg);"> {{role.title}} </p>
                                        <p class="font-weight-bold small" style="color: var(--exp-sub);"> {{role.start}} - {{role.end}} <span class="font-italic px-2 font-weight-bold" v-if="role.type"> ({{role.type}}) </span> </p>
                                        <p class="small" style="color: var(--exp-sub);" v-if="experiences[selected].fullCompanyName"> {{experiences[selected].companyName}} ({{experiences[selected].fullCompanyName}}) </p>
                                    </div>
                                    <div v-if="role.pendingDetails">
                                        <span class="pending-container h6 font-weight-bold" style="color:var(--exp-tab-active-border);"></span>
                                        <span class="font-weight-bold d-inline-block mx-1 blink" style="width: .25em; height: .8em; "></span>
                                    </div>
                                    <!-- 1. Dedicated pointsMD Markdown Block -->
                                    <div v-else-if="role.pointsMD" class="role-markdown" v-html="renderMarkdown(role.pointsMD)"></div>
                                    <!-- 2. Legacy points Array Fallback -->
                                    <ul v-else-if="role.points && role.points.length" class="role-points-list">
                                        <li v-for="(point, idx2) in role.points" :key="idx2" v-html="renderInline(point)"></li>
                                    </ul>
                                    <div class="my-3 d-flex flex-wrap">
                                        <span class="highlights py-2 px-3 m-2 font-weight-bold" v-for="(highlight, idx2) in role.highlights" :key="idx2"> {{highlight}} </span>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </transition>
                </div>

            </div>
            <b-spinner v-else variant="secondary" class="my-5 mx-auto"></b-spinner>
        </div>

    </div>
</template>

<script>
import { collection, getDocs } from '@firebase/firestore';
import { db } from '../firebase/index';
import { renderBlockMarkdown, renderInlineMarkdown } from '../utils/markdown';

export default {
    name:'experience',
    data: ()=>{
        return {
            loadingExperiences: false,
            experiences: [],
            selected: 0,
            typed: ["Stay tuned...", "Awesome things are happening.", "Details coming soon."]
        }
    },
    mounted(){
        let self = this;
        self.experiences = [];

        self.loadingExperiences = true;
        async function getDocsAndInit() {
            return getDocs(collection(db, 'experiences')).then(async (querySnapshot) => {
                await Promise.all(querySnapshot.docs.map(async (doc) => {
                    self.experiences.push (doc.data());
                }));
            }).catch(error => {
                console.log('Experiences query error: ', error);
            });
        }

        getDocsAndInit().then(()=>{
            self.experiences.sort((a,b)=> {
                if ( a.order > b.order )
                    return -1;
                if ( a.order < b.order )
                    return 1;
                return 0;
            });
            self.loadingExperiences = false;
            self.$forceUpdate();
            setTimeout(()=>{
                if(window.innerWidth > 768) {
                    self.selected = 0;
                }
                setTimeout(()=>{
                    self.checkPending();
                }, 1000);
            }, 250);
        });
    },
    methods: {
        renderMarkdown(md) {
            return renderBlockMarkdown(md);
        },
        renderInline(text) {
            return renderInlineMarkdown(text);
        },
        setSelected(idx) {
            if(this.selected != idx){
                this.selected = null;
                setTimeout(()=>{
                    this.selected = idx;
                    setTimeout(()=>{
                        this.checkPending();
                    }, 1000);
                }, 50);
            }
        },
        checkPending() {
            let item = 0;
            document.querySelectorAll('.pending-container').forEach(el => {
                this.typeWriter(el, item);
            });
        },
        typeWriter(el, item) {
            if (el.innerHTML.length < this.typed[item].length) {
                el.innerHTML += this.typed[item].charAt(el.innerHTML.length);
                setTimeout(this.typeWriter.bind(null, el, item), 100);
            }else{
                setTimeout(this.clear.bind(null, el, item), 3000);
            }
        },
        clear(el, item) {
            if (el.innerHTML.length > 0) {
                el.innerHTML = el.innerHTML.substring(0, el.innerHTML.length-1);
                setTimeout(this.clear.bind(null, el, item), 50);
            }else{
                item++;
                if(item>this.typed.length-1) item=0;
                setTimeout(this.typeWriter.bind(null, el, item), 100);
            }
        }
    }
}
</script>

<style scoped>
.scroll-hint {
    font-size: 0.72rem;
    color: var(--exp-sub);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    opacity: 0.75;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    animation: pulse-hint 2.2s ease-in-out infinite;
}
@keyframes pulse-hint {
    0%, 100% { opacity: 0.45; transform: translateY(0); }
    50% { opacity: 0.9; transform: translateY(-1px); }
}

.company-tabs {
    white-space: nowrap !important;
    min-width: 180px !important;
    border-radius: 0;
    cursor: pointer;
    color: var(--exp-fg);
    transition: all 0.2s ease;
}
.company-tabs:hover {
    color: var(--exp-tab-active-border);
    background-color: var(--exp-tab-active-bg);
}
.company-tabs.active {
    border: 0;
    border-bottom: 3px solid var(--exp-tab-active-border);
    background-color: var(--exp-tab-active-bg);
    color: var(--exp-tab-active-border);
}
.company-tabs-container {
    max-width: 100vw;
    overflow: auto;
}
.title-large {
    font-size: clamp(38px, 2.5vw, 52px);
    font-weight: 900;
}
.title {
    font-size: 1.2em;
    font-weight: 900;
}
.theme-card {
    position: relative;
    overflow: hidden;
    background-color: var(--exp-card-bg) !important;
    color: var(--exp-card-fg) !important;
    border: 1px solid var(--exp-card-border) !important;
    border-radius: 12px;
}

/* ── Top-Right Project Corner Cutout ─────── */
.role-project-corner {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 2;
}

.project-corner-link,
.project-corner-badge {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 0.42rem 1rem 0.46rem 1.05rem;
    background: var(--exp-tab-active-bg);
    border: none;
    border-bottom-left-radius: 12px;
    font-size: 0.82rem;
    font-weight: 800;
    letter-spacing: 0.04em;
    color: var(--exp-tab-active-border) !important;
    text-decoration: none !important;
    transition: all 0.22s ease;
    box-shadow: 0 3px 12px rgba(0, 0, 0, 0.28);
}

.project-corner-link {
    cursor: pointer;
}

.project-corner-link:hover {
    color: #1a1b26 !important;
    background: var(--exp-tab-active-border) !important;
    box-shadow: 0 4px 18px rgba(122, 162, 247, 0.45);
    transform: translateY(-1px);
}

.project-corner-badge {
    opacity: 0.95;
}

.project-name {
    font-weight: 800;
    font-family: 'JetBrains Mono', monospace;
    line-height: 1.2;
}

.external-icon {
    opacity: 1;
    stroke: currentColor;
    stroke-width: 2.8;
    transition: transform 0.2s ease;
    margin-left: 1px;
}

.project-corner-link:hover .external-icon {
    transform: translate(2px, -2px);
}
/* ── Role Markdown Content ─────────────────── */
.role-markdown {
    color: var(--exp-fg);
    font-size: 1rem;
    line-height: 1.75em;
    margin-top: 0.5rem;
}
.role-markdown ::v-deep p {
    margin-bottom: 0.85rem;
    line-height: 1.75em;
    color: var(--exp-fg);
}
.role-markdown ::v-deep p:last-child {
    margin-bottom: 0;
}
.role-markdown ::v-deep ul,
.role-markdown ::v-deep ol {
    list-style: none;
    padding-left: 1.5rem;
    margin-bottom: 0.85rem;
}
.role-markdown ::v-deep ul li {
    position: relative;
    line-height: 1.75em;
    color: var(--exp-fg);
    margin-bottom: 0.35rem;
}
.role-markdown ::v-deep ul li::before {
    content: "\2022";
    color: var(--exp-sub);
    position: absolute;
    left: -1.25em;
}
.role-markdown ::v-deep ol {
    list-style: decimal;
}
.role-markdown ::v-deep ol li {
    margin-bottom: 0.35rem;
    color: var(--exp-fg);
}
.role-markdown ::v-deep ul ul,
.role-markdown ::v-deep ol ol,
.role-markdown ::v-deep ul ol,
.role-markdown ::v-deep ol ul {
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
    padding-left: 1.25rem;
}
.role-markdown ::v-deep ul ul li::before {
    content: "\25E6";
    color: var(--exp-sub);
}
.role-markdown ::v-deep strong,
.role-markdown ::v-deep b {
    color: var(--exp-fg);
    font-weight: 700;
}
.role-markdown ::v-deep em,
.role-markdown ::v-deep i {
    font-style: italic;
}
.role-markdown ::v-deep u,
.role-markdown ::v-deep ins {
    text-decoration: underline;
    text-underline-offset: 3px;
}
.role-markdown ::v-deep s,
.role-markdown ::v-deep del {
    text-decoration: line-through;
    opacity: 0.75;
}
.role-markdown ::v-deep code {
    background-color: var(--exp-tag-bg);
    color: var(--exp-tab-active-border);
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 0.88em;
    font-family: 'JetBrains Mono', monospace;
    border: 1px solid rgba(255, 255, 255, 0.08);
}
.role-markdown ::v-deep pre {
    background-color: var(--exp-tag-bg);
    padding: 0.85rem 1.1rem;
    border-radius: 8px;
    overflow-x: auto;
    margin-bottom: 0.85rem;
    border: 1px solid rgba(255, 255, 255, 0.08);
}
.role-markdown ::v-deep pre code {
    background: transparent;
    padding: 0;
    border: none;
    color: var(--exp-fg);
}
.role-markdown ::v-deep a {
    color: var(--exp-tab-active-border);
    text-decoration: underline;
    transition: opacity 0.2s ease;
}
.role-markdown ::v-deep a:hover {
    opacity: 0.8;
}
.role-markdown ::v-deep blockquote {
    border-left: 3px solid var(--exp-tab-active-border);
    padding-left: 1rem;
    margin: 0.85rem 0;
    color: var(--exp-sub);
    font-style: italic;
}
.role-markdown ::v-deep h3,
.role-markdown ::v-deep h4,
.role-markdown ::v-deep h5,
.role-markdown ::v-deep h6 {
    color: var(--exp-fg);
    font-weight: 700;
    margin-top: 1rem;
    margin-bottom: 0.4rem;
}

/* ── Legacy Points List Fallback ───────────── */
.role-points-list {
    list-style: none;
    padding-left: 1.5rem;
    margin-bottom: 0.85rem;
}
.role-points-list li {
    position: relative;
    line-height: 1.75em;
    color: var(--exp-fg);
    margin-bottom: 0.35rem;
}
.role-points-list li::before {
    content: "\2022";
    color: var(--exp-sub);
    position: absolute;
    left: -1.25em;
}
.role-points-list li ::v-deep strong,
.role-points-list li ::v-deep b {
    color: var(--exp-fg);
    font-weight: 700;
}
.role-points-list li ::v-deep em,
.role-points-list li ::v-deep i {
    font-style: italic;
}
.role-points-list li ::v-deep u,
.role-points-list li ::v-deep ins {
    text-decoration: underline;
    text-underline-offset: 3px;
}
.role-points-list li ::v-deep code {
    background-color: var(--exp-tag-bg);
    color: var(--exp-tab-active-border);
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 0.88em;
    font-family: 'JetBrains Mono', monospace;
    border: 1px solid rgba(255, 255, 255, 0.08);
}
.role-points-list li ::v-deep a {
    color: var(--exp-tab-active-border);
    text-decoration: underline;
}
.highlights {
    border-radius: 2em;
    background-color: var(--exp-tag-bg) !important;
    color: var(--exp-tag-fg) !important;
    border: 1px solid rgba(0, 0, 0, 0.05);
}

.exp-section {
    max-width: 100vw;
    overflow: hidden;
    background-color: var(--exp-bg);
    color: var(--exp-fg);
}
/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) { 
    .exp-section {
        min-height: 100vh;
    }
}

.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
    0% {
        transform: translateX(-3em);
        opacity: 0;
    }
    75% {
        transform: translateX(1.05em);
    }
    100% {
        transform: translateX(0em);
        opacity: 1;
    }
}
/* Small devices (phones) */
@media (max-width: 576px) {
    .role-project-corner {
        position: static;
        margin-bottom: 0.65rem;
        display: inline-block;
    }
    .project-corner-link,
    .project-corner-badge {
        border-radius: 6px;
        border: none;
        padding: 0.28rem 0.65rem;
    }
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) { 
    .company-tabs.active {
        border: 0;
        border-left: 3px solid var(--exp-tab-active-border);
    }
    .details-container {
        max-width: 40vw;
    }

}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
    
}
@keyframes blink-caret {
  from, to { background-color: transparent }
  50% { background-color: var(--exp-tab-active-border); }
}
.blink {
    animation: blink-caret .75s step-end infinite;
}
</style>