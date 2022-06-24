<template>
    <div class="p-0 pb-5 m-0 d-flex flex-column wiu-section vw-100 overflow-hidden">

        <div class="mx-auto">
            <h1 class="title-large pt-5 mt-5 pb-3 mb-3 pb-md-5 mb-md-5 text-muted text-center">Toolbox</h1>
        </div>

        <div class="d-flex flex-row align-items-start justify-content-center flex-grow-1 pb-3 p-md-0 mx-auto">
            <div v-if="!loadingToolbox" class="d-flex flex-column flex-md-row align-items-stretch">
                <div class="flex-grow-1 d-flex flex-row flex-md-column flex-wrap border-right mw-md-30">
                    <div class="flex-grow-1 d-flex flex-column algin-items-center p-4 border-bottom">
                        <!-- Frontend -->
                        <p class="font-weight-bold text-muted small mx-auto">Frontend</p>
                        <div class="d-flex flex-row flex-wrap justify-content-center" >
                            <div v-for="(item, idx) in items.filter(x => x.category == categories['Frontend'])"
                                :key="idx" @click="changeSelected(item)"  >
                                    <div 
                                        class="bg-light highlights py-2 px-3 m-2 text-muted btn" 
                                        :class="{'active-chip': selected==item}"
                                        style="border-radius: 2em;" >
                                        <span class="h6 font-weight-bold">
                                            {{ item.name }}
                                        </span>
                                    </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex-grow-1 d-flex flex-column algin-items-center p-4 border-bottom">
                        <!-- Backend -->
                        <p class="font-weight-bold text-muted small mx-auto">Backend</p>
                        <div class="d-flex flex-row flex-wrap justify-content-center" >
                            <div v-for="(item, idx) in items.filter(x => x.category == categories['Backend'])"
                                :key="idx" @click="changeSelected(item)"  >
                                    <div 
                                        class="bg-light highlights py-2 px-3 m-2 text-muted btn" 
                                        :class="{'active-chip': selected==item}"
                                        style="border-radius: 2em;" >
                                        <span class="h6 font-weight-bold">
                                            {{ item.name }}
                                        </span>
                                    </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex-grow-1 d-flex flex-column algin-items-center p-4 border-bottom border-md-0">
                        <!-- Database -->
                        <p class="font-weight-bold text-muted small mx-auto">Database</p>
                        <div class="d-flex flex-row flex-wrap justify-content-center" >
                            <div v-for="(item, idx) in items.filter(x => x.category == categories['Database'])"
                                :key="idx" @click="changeSelected(item)"  >
                                    <div 
                                        class="bg-light highlights py-2 px-3 m-2 text-muted btn" 
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
                <div class="flex-grow-1 d-flex flex-column align-items-center justify-content-center p-4 border-right">
                    <!-- Other -->
                    <p class="font-weight-bold text-muted small mx-auto">Other</p>
                    <div class="d-flex flex-md-column flex-wrap justify-content-center px-4" >
                        <div v-for="(item, idx) in items.filter(x => x.category == categories['Other'])"
                            :key="idx" @click="changeSelected(item)"  >
                                <div 
                                    class="bg-light highlights py-2 px-3 m-2 text-muted btn" 
                                    :class="{'active-chip': selected==item}"
                                    style="border-radius: 2em;" >
                                    <span class="h6 font-weight-bold">
                                        {{ item.name }}
                                    </span>
                                </div>
                        </div>
                    </div>
                </div>
                <transition name="bounce" >
                    <div id="description-box" class="text-left my-auto mx-auto mx-md-5 d-flex flex-column align-items-start text-muted details shadow py-3 px-5 position-relative" v-if="selected">
                        <span class="close-btn" @click="selected = null">x</span>
                        <h3 class="name">{{selected.name}}</h3>
                        <p class="description">{{selected.description}}</p>
                        <div class="d-flex align-items-center justify-content-between">
                            <b-img v-if="selected.icon" :src="selected.icon" class="text-muted" style="min-width:100px; min-height:100px;" alt="loading...">
                                <b-spinner />
                            </b-img>
                            <ul class="">
                                <li v-for="(point, idx) in selected.points" :key="idx"> {{point}} </li>
                            </ul>
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
.active-chip {
    color: #fff !important;
    background-color: #FF7F50 !important;
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