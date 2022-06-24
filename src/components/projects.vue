<template>
    <div class="p-0 m-0 d-flex flex-column align-items-stretch section overflow-hidden position-relative">

        <div class="d-flex flex-row flex-wrap"> 
            <div class="left-box d-flex flex-grow-1">
                <h1 class="pt-3 pt-md-5 mt-3 mt-md-5 ml-auto title-large text-white"> Pro </h1>
            </div>
            <div class="right-box d-flex flex-grow-1">
                <h1 class="pt-3 pt-md-5 mt-3 mt-md-5 mr-auto title-large text-white"> ject </h1>
            </div>
        </div>
        <div class="d-flex flex-row flex-wrap"> 
            <div class="left-box d-flex flex-grow-1">
                <h1 class="pb-3 pb-md-5 mb-3 mb-md-5 ml-auto title-large text-white"> high </h1>
            </div>
            <div class="right-box d-flex flex-grow-1">
                <h1 class="pb-3 pb-md-5 mb-3 mb-md-5 mr-auto title-large text-white"> lights </h1>
            </div>
        </div>

        <div v-for="(project, idx) in projects"
            :key="idx"
            class="d-flex flex-row flex-wrap flex-grow-1 project">
            
            <div class="left-box d-flex align-items-center justify-content-center text-white py-5">
                <div class="d-flex flex-row">
                    <div class="title px-4 d-none d-md-block"> 0{{idx+1}}. </div>
                    <div class="border-left pl-5  d-flex flex-column text-left">
                        <p class="title"> {{project.title}} </p>
                        <p class="title-2 mt-2"> {{project.subtitle}} </p>
                        <p class="description mt-2 w-75"> {{project.description}} </p>
                        <div class="project-img-container d-md-none" :class="{'mobile': project.type == 'mobile', 'desktop': project.type == 'desktop'}" >
                            <b-img-lazy
                                :src="project.images[0]" 
                                fluid 
                                alt="Project image" 
                                class="project-img" 
                                :class="{'mobile': project.type == 'mobile', 'desktop': project.type == 'desktop'}" ></b-img-lazy>
                        </div>
                        <b-link class="btn align-self-start py-2 px-5 font-weight-bold px-4 mt-4 text-white border-white" target="_blank" :href="project.link">Visit</b-link>
                    </div>
                </div>
            </div>

            <div class="right-box d-none d-md-flex align-items-center justify-content-center py-5">
                <div class="project-img-container" 
                    :class="{'mobile': project.type == 'mobile', 'desktop': project.type == 'desktop'}" >
                    <b-img-lazy
                        :src="project.images[0]" 
                        fluid 
                        alt="Project image" 
                        class="project-img" 
                        :class="{'mobile': project.type == 'mobile', 'desktop': project.type == 'desktop'}" ></b-img-lazy>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
/* eslint-disable */
export default {
    name:'projects',
    data: ()=>{
        return {
            projects: [
                {
                    title: 'Mengede',
                    subtitle: 'Online booking',
                    description: 'Worked as a FullStack developer. Implemented a mobile first portal for online reservations.',
                    type: 'mobile',
                    link: 'https://mengede.et/booking',
                    images: ['../projects/booking/01.png']
                },
                {
                    title: 'Mengede',
                    subtitle: 'Business Process Automation',
                    description: 'Worked as a FullStack developer on this business process automation(BPA) SaaS platform.',
                    type: 'desktop',
                    link: 'https://mengede.et',
                    images: ['../projects/bpa/01.png']
                },
                {
                    title: 'Derash Technologies',
                    subtitle: 'Company website',
                    description: 'Built several pages with responsive UI components for the company website.',
                    type: 'desktop',
                    link: 'https://derashtech.com',
                    images: ['../projects/derash/01.png']
                },
                {
                    title: 'Watchdog',
                    subtitle: 'My open-source contribution',
                    description: 'A real-time monitoring tool for your docker environment. Monitor the statuses and logs of your docker containers on your development and/or production servers in real-time.',
                    type: 'desktop',
                    link: 'https://hub.docker.com/r/nati43/watchdog',
                    images: ['../projects/watchdog/01.jpeg']
                },
            ]
        }
    },
    mounted() {

    }
}
</script>

<style scoped>

.btn-outline-primary {
    color: #E1E1E1;
    border-color: #E1E1E1;
    outline-color: #E1E1E1 !important;
}
.btn-outline-primary:hover,
.btn-outline-primary:active,
.btn-outline-primary:focus {
    color: #fff;
    background-color: #FF7F50;
}
.title-large {
    font-size: clamp(38px, 2.5vw, 52px);
    font-weight: 900;
}
.title {
    font-size: clamp(32px, 2.75vw, 48px);
    font-weight: 900;
}
.title-2 {
    color: #ccc;
    font-size: clamp(24px, 2vw, 30px);
    font-weight: 800;
}
.description {
    font-size: 24px;
    font-size: clamp(16px, 1vw, 24px);
    font-weight: 300;
    max-width: 500px;
}
.left-box,
.right-box {
    background-color: #212121;

}
.project-img-container {
    border-radius: .5em;
    padding: .25em;
    background-color: #E4E6F9;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
}
.project-img-container.mobile {
    max-width: 300px;
}
.project-img-container.desktop {
    max-width: 90%;
}
.project-img {
    border-radius: .5em;
}
/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) { 
    .left-box,
    .right-box {
        width: 50%;
    }
    .right-box {
        background-color: unset;
    }
    .right-box .title-large {
        color:#212121 !important;
    }
    .project {
        min-height: 80vh;
    }
    .project-img-container {
        border-radius: 1.25em;
        padding: .75em;
    }
    .project-img-container.mobile {
        max-width: 300px;
    }
    .project-img-container.desktop {
        max-width: 75%;
    }
    .project-img {
        border-radius: 1.25em;
    }
}
</style>