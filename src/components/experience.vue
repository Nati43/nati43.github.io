<template>
    <div class="p-0 pb-5 m-0 d-flex flex-column exp-section vw-100 overflow-hidden">

        <div class="mx-auto flex-grow-1 d-flex flex-column">
            <h1 class="title-large pt-3 pt-md-5 mt-3 mt-md-5 text-muted text-center"> Experience </h1>

            <div v-if="!loadingExperiences" class="my-5 my-auto d-flex flex-column flex-md-row align-items-stretch">

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
                        <div v-if="selected != null">
                            <div class="role-container"
                                v-for="(role, idx) in experiences[selected].roles"
                                :key="idx" >
                                
                                <div class="text-left card shadow-sm p-4 my-3 border-0">
                                    <div>
                                        <p class="title"> {{role.title}} </p>
                                        <p class="font-weight-bold text-muted small"> {{role.start}} - {{role.end}} </p>
                                        <p class="text-muted small" v-if="experiences[selected].fullCompanyName"> {{experiences[selected].companyName}} ({{experiences[selected].fullCompanyName}}) </p>
                                    </div>
                                    <ul>
                                        <li v-for="(point, idx2) in role.points" :key="idx2"> {{point}} </li>
                                    </ul>
                                    <div class="my-3 d-flex flex-wrap">
                                        <span class="bg-light highlights py-2 px-3 m-2 text-muted font-weight-bold" v-for="(highlight, idx2) in role.highlights" :key="idx2"> {{highlight}} </span>
                                    </div>
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
import { db } from '../firebase/index';
export default {
    name:'experience',
    data: ()=>{
        return {
            loadingExperiences: false,
            experiences: [],
            selected: 0,
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
                if(window.innerWidth > 768)
                    self.selected = self.experiences[0];
            }, 250);
        });
    },
    methods: {
        setSelected(idx) {
            if(this.selected != idx){
                this.selected = null;
                setTimeout(()=>{
                    this.selected = idx;
                }, 50);
            }
        }
        
    }
}
</script>

<style scoped>
.company-tabs {
    white-space: nowrap !important;
    min-width: 180px !important;
    border-radius: 0;
    cursor: pointer;
}
.company-tabs.active {
    border: 0;
    border-bottom: 3px solid #FF7F50;
    background-color: #ccc2;
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
.role-container ul {
  list-style: none;
}

.role-container ul li {
    position: relative;
    line-height: 1.75em;
}
.role-container ul li::before {
    content: "\2022";
    color: #6c757d;
    position: absolute;
    left: -1.5em;
}
.highlights {
    border-radius: 2em;
}

.exp-section {
    max-width: 100vw;
    overflow: hidden;
    background-color: #fff;
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
/* Small devices (landscape phones, 576px and up) */
@media (min-width: 310px) {
    
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) { 
    .company-tabs.active {
        border: 0;
        border-left: 3px solid #FF7F50;
    }
    .details-container {
        max-width: 40vw;
    }

}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
    
}
</style>