<template>
  <div id="app">
    <Loader v-if="loading" @done="loading = false" />
    <ThemeSwitcher />
    <Intro />
    <Experience />
    <Projects />
    <Wiu />
    <Contact />
  </div>
</template>

<script>
/* eslint-disable */
import Loader from './components/Loader.vue'
import ThemeSwitcher from './components/ThemeSwitcher.vue'
import Intro from './components/intro.vue'
import Experience from './components/experience.vue'
import Wiu from './components/wiu.vue'
import Contact from './components/contact.vue'
import Projects from './components/projects.vue'

export default {
  name: 'App',
  components: {
    Loader,
    ThemeSwitcher,
    Intro,
    Wiu,
    Experience,
    Contact,
    Projects,
  },
  data() {
    return { loading: true };
  },
  mounted() {}
}
</script>

<style>
html {
  scroll-behavior: smooth;
}

/* Default Theme (:root defaults to Tokyo Night) */
:root {
  --app-bg: #1a1b26;
  --intro-bg: #1a1b26;
  --intro-fg: #a9b1d6;
  --intro-accent: #7aa2f7;
  --exp-bg: #1a1b26;
  --exp-fg: #a9b1d6;
  --exp-title: #7aa2f7;
  --exp-card-bg: #24283b;
  --exp-card-fg: #a9b1d6;
  --exp-card-border: #2f3549;
  --exp-sub: #565f89;
  --exp-tab-active-border: #7aa2f7;
  --exp-tab-active-bg: #2f3549;
  --exp-tag-bg: #2f3549;
  --exp-tag-fg: #7dcfff;
  --proj-left-bg: #1a1b26;
  --proj-left-fg: #a9b1d6;
  --proj-left-title: #7aa2f7;
  --proj-left-sub: #7dcfff;
  --proj-left-desc: #787c99;
  --proj-right-bg: #24283b;
  --proj-right-title: #f7768e;
  --proj-btn-border: #7aa2f7;
  --proj-btn-fg: #7aa2f7;
  --proj-btn-hover-bg: #7aa2f7;
  --proj-btn-hover-fg: #1a1b26;
  --proj-img-bg: #2f3549;
  --proj-img-border: #414868;
  --wiu-bg: #1a1b26;
  --wiu-fg: #a9b1d6;
  --wiu-title: #7aa2f7;
  --wiu-sub: #565f89;
  --wiu-chip-bg: #24283b;
  --wiu-chip-fg: #a9b1d6;
  --wiu-chip-border: #2f3549;
  --wiu-chip-active-bg: #7aa2f7;
  --wiu-chip-active-fg: #1a1b26;
  --wiu-box-bg: #24283b;
  --wiu-box-fg: #a9b1d6;
  --wiu-box-border: #2f3549;
  --wiu-box-title: #7dcfff;
  --contact-bg: #1a1b26;
  --contact-fg: #a9b1d6;
  --contact-accent: #7aa2f7;
  --contact-input-bg: #24283b;
  --contact-input-fg: #a9b1d6;
  --contact-input-border: #2f3549;
  --contact-btn-border: #7aa2f7;
  --contact-btn-fg: #7aa2f7;
  --contact-btn-hover-bg: #7aa2f7;
  --contact-btn-hover-fg: #1a1b26;
}

/* Original Theme (Black & White split layout with Coral accents) */
[data-theme="original"] {
  --app-bg: #fcfcfc;
  --intro-bg: #212121;
  --intro-fg: #D1D1D1;
  --intro-accent: #FF7F50;
  --exp-bg: #ffffff;
  --exp-fg: #212121;
  --exp-title: #6c757d;
  --exp-card-bg: #ffffff;
  --exp-card-fg: #212121;
  --exp-card-border: #e2e8f0;
  --exp-sub: #6c757d;
  --exp-tab-active-border: #FF7F50;
  --exp-tab-active-bg: #ccc2;
  --exp-tag-bg: #f8f9fa;
  --exp-tag-fg: #6c757d;
  --proj-left-bg: #212121;
  --proj-left-fg: #ffffff;
  --proj-left-title: #ffffff;
  --proj-left-sub: #cccccc;
  --proj-left-desc: #f8f8f2;
  --proj-right-bg: #ffffff;
  --proj-right-title: #212121;
  --proj-btn-border: #ffffff;
  --proj-btn-fg: #ffffff;
  --proj-btn-hover-bg: #FF7F50;
  --proj-btn-hover-fg: #ffffff;
  --proj-img-bg: #E4E6F9;
  --proj-img-border: transparent;
  --wiu-bg: #ffffff;
  --wiu-fg: #212121;
  --wiu-title: #6c757d;
  --wiu-sub: #6c757d;
  --wiu-chip-bg: #f8f9fa;
  --wiu-chip-fg: #6c757d;
  --wiu-chip-border: #e2e8f0;
  --wiu-chip-active-bg: #FF7F50;
  --wiu-chip-active-fg: #ffffff;
  --wiu-box-bg: #ffffff;
  --wiu-box-fg: #6c757d;
  --wiu-box-border: #e2e8f0;
  --wiu-box-title: #212121;
  --contact-bg: #212121;
  --contact-fg: #D1D1D1;
  --contact-accent: #FF7F50;
  --contact-input-bg: #fff1;
  --contact-input-fg: #ffffff;
  --contact-input-border: transparent;
  --contact-btn-border: #E1E1E1;
  --contact-btn-fg: #E1E1E1;
  --contact-btn-hover-bg: #FF7F50;
  --contact-btn-hover-fg: #ffffff;
}

/* Dracula Theme (Full immersive slate dark) */
[data-theme="dracula"] {
  --app-bg: #282a36;
  --intro-bg: #282a36;
  --intro-fg: #f8f8f2;
  --intro-accent: #bd93f9;
  --exp-bg: #282a36;
  --exp-fg: #f8f8f2;
  --exp-title: #bd93f9;
  --exp-card-bg: #343746;
  --exp-card-fg: #f8f8f2;
  --exp-card-border: #44475a;
  --exp-sub: #6272a4;
  --exp-tab-active-border: #ff79c6;
  --exp-tab-active-bg: #44475a;
  --exp-tag-bg: #44475a;
  --exp-tag-fg: #8be9fd;
  --proj-left-bg: #282a36;
  --proj-left-fg: #f8f8f2;
  --proj-left-title: #bd93f9;
  --proj-left-sub: #8be9fd;
  --proj-left-desc: #6272a4;
  --proj-right-bg: #343746;
  --proj-right-title: #ff79c6;
  --proj-btn-border: #ff79c6;
  --proj-btn-fg: #ff79c6;
  --proj-btn-hover-bg: #ff79c6;
  --proj-btn-hover-fg: #282a36;
  --proj-img-bg: #44475a;
  --proj-img-border: #6272a4;
  --wiu-bg: #282a36;
  --wiu-fg: #f8f8f2;
  --wiu-title: #bd93f9;
  --wiu-sub: #6272a4;
  --wiu-chip-bg: #343746;
  --wiu-chip-fg: #f8f8f2;
  --wiu-chip-border: #44475a;
  --wiu-chip-active-bg: #ff79c6;
  --wiu-chip-active-fg: #282a36;
  --wiu-box-bg: #343746;
  --wiu-box-fg: #f8f8f2;
  --wiu-box-border: #44475a;
  --wiu-box-title: #8be9fd;
  --contact-bg: #282a36;
  --contact-fg: #f8f8f2;
  --contact-accent: #bd93f9;
  --contact-input-bg: #343746;
  --contact-input-fg: #f8f8f2;
  --contact-input-border: #44475a;
  --contact-btn-border: #ff79c6;
  --contact-btn-fg: #ff79c6;
  --contact-btn-hover-bg: #ff79c6;
  --contact-btn-hover-fg: #282a36;
}

/* Tokyo Night Theme (Authentic Tokyo Night Elixir syntax palette: Electric Blue #7aa2f7, Ice Cyan #7dcfff, Steel #a9b1d6, Neon Rose #f7768e) */
[data-theme="tokyo-night"] {
  --app-bg: #1a1b26;
  --intro-bg: #1a1b26;
  --intro-fg: #a9b1d6;
  --intro-accent: #7aa2f7;
  --exp-bg: #1a1b26;
  --exp-fg: #a9b1d6;
  --exp-title: #7aa2f7;
  --exp-card-bg: #24283b;
  --exp-card-fg: #a9b1d6;
  --exp-card-border: #2f3549;
  --exp-sub: #565f89;
  --exp-tab-active-border: #7aa2f7;
  --exp-tab-active-bg: #2f3549;
  --exp-tag-bg: #2f3549;
  --exp-tag-fg: #7dcfff;
  --proj-left-bg: #1a1b26;
  --proj-left-fg: #a9b1d6;
  --proj-left-title: #7aa2f7;
  --proj-left-sub: #7dcfff;
  --proj-left-desc: #787c99;
  --proj-right-bg: #24283b;
  --proj-right-title: #f7768e;
  --proj-btn-border: #7aa2f7;
  --proj-btn-fg: #7aa2f7;
  --proj-btn-hover-bg: #7aa2f7;
  --proj-btn-hover-fg: #1a1b26;
  --proj-img-bg: #2f3549;
  --proj-img-border: #414868;
  --wiu-bg: #1a1b26;
  --wiu-fg: #a9b1d6;
  --wiu-title: #7aa2f7;
  --wiu-sub: #565f89;
  --wiu-chip-bg: #24283b;
  --wiu-chip-fg: #a9b1d6;
  --wiu-chip-border: #2f3549;
  --wiu-chip-active-bg: #7aa2f7;
  --wiu-chip-active-fg: #1a1b26;
  --wiu-box-bg: #24283b;
  --wiu-box-fg: #a9b1d6;
  --wiu-box-border: #2f3549;
  --wiu-box-title: #7dcfff;
  --contact-bg: #1a1b26;
  --contact-fg: #a9b1d6;
  --contact-accent: #7aa2f7;
  --contact-input-bg: #24283b;
  --contact-input-fg: #a9b1d6;
  --contact-input-border: #2f3549;
  --contact-btn-border: #7aa2f7;
  --contact-btn-fg: #7aa2f7;
  --contact-btn-hover-bg: #7aa2f7;
  --contact-btn-hover-fg: #1a1b26;
}

#app {
  font-family: 'Source Sans Pro', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: var(--app-bg);
  color: var(--intro-fg);
  text-align: center;
  max-width: 100vw;
  overflow: hidden;
  transition: background-color 0.3s ease, color 0.3s ease;
}
.text-custome-light {
    color: var(--intro-fg);
}
.section {
  min-height: 100vh;
  max-width: 100vw;
  overflow-x: hidden;
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) { 

}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) {

}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {

}

/* Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {

}
</style>
