<template>
  <div id="app">
    <Intro />
    <Wiu />
    <Contact />
  </div>
</template>

<script>
/* eslint-disable */
import Intro from './components/intro.vue'
import Wiu from './components/wiu.vue'
import Contact from './components/contact.vue'
export default {
  name: 'App',
  components: {
    Intro,
    Wiu,
    Contact,
  },
  mounted() {
      var nodesjs = new NodesJs({
        ids: ['nodes', 'nodes-intro'], // container ID
        width: window.innerWidth, // width
        height: window.innerHeight, // height
        particleColor: [255, 255, 255, 0.3], // Particle color
        lineColor: [255, 255, 255], // Line color
        // background transition and color options
        backgroundFrom: [10, 25, 100],
        backgroundTo: [25, 50, 150],
        backgroundDuration: 4000,
        backgroundColor: 'rgba(0,0,0,0)',
        // the number of particles
        number: window.hasOwnProperty('orientation') ? 30: 100,
        // animation speed
        speed: 20
    });
  }
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
