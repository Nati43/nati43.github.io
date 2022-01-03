<template>
    <div class="p-0 pb-5 m-0 d-flex flex-column wiu-section vw-100 overflow-hidden">

        <div class="mx-auto">
            <h1 class="h4 pt-5 font-weight-bold text-muted text-center">My Toolbox</h1>

            <b-list-group class="mx-3 mx-md-5 my-4 d-flex flex-row justify-content-center flex-wrap">
                <b-list-group-item @click="selectedCategory=0; changeSelected(items[0]);" :active="selectedCategory==0" :class="{'bg-tomato': selectedCategory==0}" class="btn border-0 d-flex flex-row align-items-center my-1 mx-2" style="border-radius: 1em">
                    <span class="h5 font-weight-bold d-none d-lg-block" :class="{'text-muted': selectedCategory!=0}"> Frontend </span>
                    <div class="d-flex align-items-center ml-lg-3 bg-white" style="width:4em; height:4em; border-radius:50%;">
                        <div class="layer-icons" style="background-image: url('/front.svg');" ></div>
                    </div>
                </b-list-group-item>
                <span class="my-auto text-light font-weight-bold bg-light px-5 py-1 rounded"></span>
                <b-list-group-item @click="selectedCategory=1; changeSelected(items[9]);" :active="selectedCategory==1" :class="{'bg-tomato': selectedCategory==1}" class="btn border-0 d-flex flex-row align-items-center my-1 mx-2" style="border-radius: 1em">
                    <div class="d-flex align-items-center mr-lg-3 bg-white" style="width:4em; height:4em; border-radius:50%;">
                        <div class="layer-icons" style="background-image: url('/back.svg');" ></div>
                    </div>
                    <span class="h5 font-weight-bold d-none d-lg-block" :class="{'text-muted': selectedCategory!=1}">Backend</span>
                </b-list-group-item>
            </b-list-group>
        </div>

        <div class="d-flex flex-row align-items-stretch flex-grow-1 pb-3 p-md-0">
            <b-card
                no-body
                class="left border-0 px-5 py-3 m-0 rounded-0 flex-grow-1 d-flex align-items-center align-items-md-end mr-5 pr-5 justify-content-center text-muted text-left list"
                :class="{'w-hidden': selected}" >
                <div>
                    <div v-for="(item, idx) in items" :key="idx" @click="changeSelected(item)" :class="{'d-none d-md-block': selected}">
                        <ul v-if="selectedCategory==item.category" class="m-0">
                            <li :class="{'active': selected==item}">{{item.name}}</li>
                        </ul>
                    </div>
                </div>
            </b-card>

            <b-card class="right border-0 p-0 m-0 rounded-0 flex-grow-1 d-flex align-items-center align-items-md-start justify-content-center" body-class="d-flex align-items-center justify-content-center ml-5 pl-5" >
                
                <transition name="bounce" >
                    <div class="text-left d-flex flex-column align-items-start text-muted details shadow py-3 px-5 position-relative" v-if="selected">
                        <span class="close-btn" @click="selected = null">x</span>
                        <h3 class="name">{{selected.name}}</h3>
                        <p class="description">{{selected.description}}</p>
                        <div class="d-flex align-items-center justify-content-between">
                            <b-img :src="selected.icon"></b-img>
                            <ul class="">
                                <li v-for="(point, idx) in selected.points" :key="idx"> {{point}} </li>
                            </ul>
                        </div>
                    </div>
                </transition>
                
            </b-card>
        </div>

    </div>
</template>

<script>
export default {
    name:"wiu",
    data: ()=>{
        return {
            items: [
                {
                    name: "Vue",
                    category: 0,
                    icon: "/logos/vue.svg",
                    description: "Vue is an open-source model–view–viewmodel JavaScript framework for building user interfaces and single-page applications.",
                    points: ["Approachable", "Versatile", "Performant"],
                },
                {
                    name: "Angular",
                    category: 0,
                    icon: "/logos/angular.svg",
                    description: "Angular is a JavaScript-based open-source front-end web framework mainly maintained by Google and by a community of individuals and corporations to address many of the challenges encountered in developing single-page applications.",
                    points: ["Develop across all platforms", "Speed & performance", "Incredible tooling", "Loved by millions"],
                },
                {
                    name: "Bootstrap",
                    category: 0,
                    icon: "/logos/bootstrap.svg",
                    description: "Bootstrap is a free and open-source CSS framework directed at responsive, mobile-first front-end web development. It contains CSS- and JavaScript-based design templates for typography, forms, buttons, navigation, and other interface components.",
                    points: ["Fast", "Responsive", "Open source", "Extensive prebuilt components"],
                },
                {
                    name: "Electron",
                    category: 0,
                    icon: "/logos/electron.svg",
                    description: "Electron is an open-source software framework developed and maintained by GitHub. It allows for the development of desktop GUI applications using web technologies: it combines the Chromium rendering engine and the Node.js runtime.",
                    points: ["Used to build many popular desktop apps", "Cross platform", "Open source" ],
                },
                {
                    name: "JQuery",
                    category: 0,
                    icon: "/logos/jquery.svg",
                    description: "jQuery is a JavaScript library designed to simplify HTML DOM tree traversal and manipulation, as well as event handling, CSS animation, and Ajax.",
                    points: ["Write Less, Do More", "Free & Open source", "Lightweight", "Cross-Browser"],
                },
                {
                    name: "HTML5",
                    category: 0,
                    icon: "/logos/html.svg",
                    description: "HTML5 is a markup language used for structuring and presenting content on the World Wide Web. It was the fifth and last major version of HTML that is a World Wide Web Consortium recommendation.",
                    points: [],
                },
                {
                    name: "CSS3",
                    category: 0,
                    icon: "/logos/css.svg",
                    description: "CSS3 is the latest evolution of the Cascading Style Sheets language and aims at extending CSS2.1",
                    points: ["Rounded corners", "Shadows", "Gradients", "Transitions or Animations", "Multi-columns, Flexible box or Grid layouts" ],
                },
                {
                    name: "JavaScript",
                    category: 0,
                    icon: "/logos/js.svg",
                    description: "JavaScript (JS) is a lightweight, interpreted, or just-in-time compiled programming language with first-class functions.",
                    points: ["Prototype-based", "Multi-paradigm", "Single-threaded", "supports object-oriented, imperative, and declarative styles"],
                },
                {
                    name: "TypeScript",
                    category: 0,
                    icon: "/logos/ts.svg",
                    description: "TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.",
                    points: ["Open source"],
                },
                {
                    name: "Go",
                    category: 1,
                    icon: "/logos/gopher.svg",
                    description: "Go is a statically typed, compiled programming language designed at Google by Robert Griesemer, Rob Pike, and Ken Thompson. Go is syntactically similar to C, but with memory safety, garbage collection, structural typing, and CSP-style concurrency.",
                    points: ["Open source", "Simple", "Reliable", "Efficient", "Concurrent by design"],
                },
                {
                    name: "Node.js",
                    category: 1,
                    // icon: "/logos/gopher.svg",
                    description: "Node.js is an open-source, cross-platform, back-end JavaScript runtime environment that runs on the V8 engine and executes JavaScript code outside a web browser.",
                    points: ["Cross-platform compatibility", "Scalable", "Reliable", "Efficient"],
                },
                {
                    name: "PHP",
                    category: 1,
                    icon: "/logos/php.svg",
                    description: "PHP is a popular general-purpose scripting language that is especially suited to web development.",
                    points: ["Fast", "Flexible", "Pragmatic"],
                },
                {
                    name: "Echo",
                    category: 1,
                    icon: "/logos/echo.svg",
                    description: "Echo is a High performance, extensible, minimalist Go web framework created by the company NextApp.",
                    points: ["High performance", "Minimalist", "Optimized Router", "Scalable", "Extensible"],
                },
                {
                    name: "Express.js",
                    category: 1,
                    // icon: "/logos/echo.svg",
                    description: "Express.js, or simply Express, is a back end web application framework for Node.js, released as free and open-source software under the MIT License. It is designed for building web applications and APIs. It has been called the de facto standard server framework for Node.js.",
                    points: ["High performance", "Minimalist"],
                },
                {
                    name: "Laravel",
                    category: 1,
                    icon: "/logos/laravel.svg",
                    description: "Laravel is a free, open-source PHP web framework, created by Taylor Otwell and intended for the development of web applications following the model–view–controller architectural pattern and based on Symfony.",
                    points: ["Free & Open source", "Elegant syntax", "Eloquent ORM support", "MVC framework"],
                },
            ],
            selectedCategory: 0,
            selected: null,
        }
    },
    mounted(){
        if(window.innerWidth > 768)
            this.selected = this.items[0];
    },
    methods: {
        changeSelected(obj) {
            if(this.selected != obj){
                this.selected = null;
                setTimeout(()=>{
                    this.selected = obj;
                }, 250);
            }
        }
    }
}
</script>

<style scoped>
.bg-tomato {
    background-color: #FF7F50;
}
.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
.wiu-section {
    max-width: 100vw;
    overflow: hidden;
    background-color: #fff;
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
.close-btn {
    position: absolute;
    right: 2px;
    top: 0px;
    transform: scaleX(1.25);
    cursor: pointer;
    line-height: 20px;
    width: 20px;
    text-align: center;
}
.title,
.subtitle {
    font-weight: 300;
}
.details
.details * {
    transition: all .25s;
}
.details {
    transition: all .25s;
    max-width: 500px;
    overflow: hidden;
    width: 90vw;
}
.details .name {
    font-weight: 900;
}
li {
    list-style-type: circle;
    line-height: 1.75em;
}
.list li {
    font-weight: bold;
    color: #B9B9B9;
    cursor: pointer;
    transition: all .125s;
}
.list li:hover {
    transform: scale(1.25);
    color: unset;
    list-style:outside;
}
.list li.active {
    color: unset;
    list-style:outside;
    font-size: 1.35em;
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
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
    .details {
        font-size: 1.25rem;
    }
    .details .name {
        font-size: 2.25rem;
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