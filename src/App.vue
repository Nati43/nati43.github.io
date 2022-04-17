<template>
  <div id="app">
    <Intro />
    <Experience />
    <Projects />
    <Wiu />
    <Contact />
  </div>
</template>

<script>
/* eslint-disable */
import Intro from './components/intro.vue'
import Experience from './components/experience.vue'
import Wiu from './components/wiu.vue'
import Contact from './components/contact.vue'
import Projects from './components/projects.vue'
export default {
  name: 'App',
  components: {
    Intro,
    Wiu,
    Experience,
    Contact,
    Projects,
  },
  mounted() {}
}
</script>

<style>
html {
  scroll-behavior: smooth;
}
#app {
  font-family: 'Lato', Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #fcfcfc;
  text-align: center;
  max-width: 100vw;
  overflow: hidden;
}
.text-custome-light {
    color: #D1D1D1;
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
