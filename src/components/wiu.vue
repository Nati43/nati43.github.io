<template>
    <div class="p-0 m-0 d-flex flex-row align-items-stretch section">

        <b-card
            overlay
            class="border-0 p-0 m-0 rounded-0 flex-grow-1 d-flex align-items-center justify-content-center text-muted text-left list"
            no-body >
            <div v-for="(group, idx) in groups" :key="idx">
                <h4 class="title text-custome-light">{{group.title}}</h4>
                <div class="pl-3" v-for="(subgroup, idx2) in group.items" :key="idx2">
                    <h5 class="subtitle text-custome-light">{{subgroup.subtitle}}</h5>
                    <ul>
                        <li v-for="(item, idx3) in subgroup.items" :key="idx3" @click="changeSelected(item)" :class="{'active': selected==item}"> {{item.name}} </li>
                    </ul>
                </div>
            </div>
        </b-card>

        <b-card
            class="border-0 p-0 m-0 rounded-0 flex-grow-1 d-flex align-items-start justify-content-center d-none d-md-flex"
            no-body >
            
            <transition name="bounce" >
                <div class="text-left d-flex flex-column align-items-start text-muted details" v-if="selected">
                    <h3 class="name">{{selected.name}}</h3>
                    <p class="description">{{selected.description}}</p>
                    <ul>
                        <li v-for="(point, idx) in selected.points" :key="idx"> {{point}} </li>
                    </ul>
                    <b-img :src="selected.icon" class="align-self-end my-3"></b-img>
                </div>
            </transition>
            
        </b-card>

    </div>
</template>

<script>
export default {
    name:"wiu",
    data: ()=>{
        return {
            groups: [
                {
                    title: "Frontend",
                    items: [
                        {
                            subtitle: "Frameworks / Library",
                            items: [
                                {
                                    name: "Vue",
                                    icon: "/logos/vue.svg",
                                    description: "Vue is an open-source model–view–viewmodel JavaScript framework for building user interfaces and single-page applications.",
                                    points: ["Approachable", "Versatile", "Performant"],
                                },
                                {
                                    name: "Angular",
                                    icon: "/logos/angular.svg",
                                    description: "Angular is a JavaScript-based open-source front-end web framework mainly maintained by Google and by a community of individuals and corporations to address many of the challenges encountered in developing single-page applications.",
                                    points: ["Develop across all platforms", "Speed & performance", "Incredible tooling", "Loved by millions"],
                                },
                                {
                                    name: "Bootstrap",
                                    icon: "/logos/bootstrap.svg",
                                    description: "Bootstrap is a free and open-source CSS framework directed at responsive, mobile-first front-end web development. It contains CSS- and JavaScript-based design templates for typography, forms, buttons, navigation, and other interface components.",
                                    points: ["Fast", "Responsive", "Open source", "Extensive prebuilt components"],
                                },
                                {
                                    name: "Electron",
                                    icon: "/logos/electron.svg",
                                    description: "Electron is an open-source software framework developed and maintained by GitHub. It allows for the development of desktop GUI applications using web technologies: it combines the Chromium rendering engine and the Node.js runtime.",
                                    points: ["Used to build many popular desktop apps", "Cross platform", "Open source" ],
                                },
                                {
                                    name: "JQuery",
                                    icon: "",
                                    description: "jQuery is a JavaScript library designed to simplify HTML DOM tree traversal and manipulation, as well as event handling, CSS animation, and Ajax.",
                                    points: ["Write Less, Do More", "Free & Open source", "Lightweight", "Cross-Browser"],
                                },
                            ]
                        },
                        {
                            subtitle: "Languages",
                            items: [
                                {
                                    name: "HTML5",
                                    icon: "",
                                    description: "HTML5 is a markup language used for structuring and presenting content on the World Wide Web. It was the fifth and last major version of HTML that is a World Wide Web Consortium recommendation.",
                                    points: [],
                                },
                                {
                                    name: "CSS3",
                                    icon: "",
                                    description: "CSS3 is the latest evolution of the Cascading Style Sheets language and aims at extending CSS2.1",
                                    points: ["Rounded corners", "Shadows", "Gradients", "Transitions or Animations", "Multi-columns, Flexible box or Grid layouts" ],
                                },
                                {
                                    name: "JavaScript",
                                    icon: "",
                                    description: "JavaScript (JS) is a lightweight, interpreted, or just-in-time compiled programming language with first-class functions.",
                                    points: ["Prototype-based", "Multi-paradigm", "Single-threaded", "supports object-oriented, imperative, and declarative styles"],
                                },
                                {
                                    name: "TypeScript",
                                    icon: "",
                                    description: "TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.",
                                    points: ["Open source"],
                                },
                            ]
                        },
                    ]
                },
                {
                    title: "Backend",
                    items: [
                        {
                            subtitle: "Languages",
                            items: [
                                {
                                    name: "Go",
                                    icon: "/logos/gopher.svg",
                                    description: "Go is a statically typed, compiled programming language designed at Google by Robert Griesemer, Rob Pike, and Ken Thompson. Go is syntactically similar to C, but with memory safety, garbage collection, structural typing, and CSP-style concurrency.",
                                    points: ["Open source", "Simple", "Reliable", "Efficient", "Concurrent by design"],
                                },
                                {
                                    name: "PHP",
                                    icon: "",
                                    description: "PHP is a popular general-purpose scripting language that is especially suited to web development.",
                                    points: ["Fast", "Flexible", "Pragmatic"],
                                },
                            ]
                        },
                        {
                            subtitle: "Frameworks / Library",
                            items: [
                                {
                                    name: "Echo",
                                    icon: "",
                                    description: "Echo is a High performance, extensible, minimalist Go web framework created by the company NextApp.",
                                    points: ["High performance", "Minimalist", "Optimized Router", "Scalable", "Extensible"],
                                },
                                {
                                    name: "Laravel",
                                    icon: "/logos/laravel.svg",
                                    description: "Laravel is a free, open-source PHP web framework, created by Taylor Otwell and intended for the development of web applications following the model–view–controller architectural pattern and based on Symfony.",
                                    points: ["Free & Open source", "Elegant syntax", "Eloquent ORM support", "MVC framework"],
                                },
                            ]
                        },
                    ]
                },
            ],
            selected: null,
        }
    },
    methods: {
        changeSelected(obj) {
            this.selected = null;
            setTimeout(()=>{
                this.selected = obj;
            }, 500);
        }
    }
}
</script>

<style scoped>
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
.title,
.subtitle {
    font-weight: 300;
}
.details
.details * {
    transition: all .25s;
}
.details {
    max-width: 500px;
    overflow: hidden;
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

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
    .details {
        font-size: 1.25rem;
    }
    .details .name {
        font-size: 2.25rem;
    }
}
</style>