<template>
    <div class="p-0 pb-5 m-0 d-flex flex-column wiu-section vw-100 overflow-hidden">

        <div class="mx-auto">
            <h1 class="title-large pt-3 pt-md-5 mt-3 mt-md-5 text-muted text-center"> Experience </h1>

            <div class="my-5 d-flex flex-column flex-md-row align-items-stretch">

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
        </div>

    </div>
</template>

<script>
export default {
    name:'experience',
    data: ()=>{
        return {
            experiences: [
                {
                    companyName: 'Elnet Technologies',
                    roles: [
                        {
                            title: 'Senior Software Developer',
                            start: 'July 2021',
                            end: 'Present',
                            points: [
                                'Implemented multiple payment method integrations for the Taxiye ride hailing app using NodeJs.',
                                'Implemented backend for several payment related features using the above integrations for Taxiye.',
                                'Implemented backend for payment method related settings.',
                                'Implemented an automated lottery feature for Taxiye.',
                            ],
                            highlights: ['NodeJs', 'JavaScript']
                        }
                    ]
                },
                {
                    companyName: 'Derash Technologies',
                    roles: [
                        {
                            title: 'Senior Software Engineer',
                            start: 'April 2020',
                            end: 'February 2022',
                            points: [
                                'Built several UI components for the company website using VueJs and Bootstrap.',
                                'Worked on  a business process automation(BPA) SaaS platform called Mengede as a full stack developer. It automates the ticket sales process of intra-country bus companies and makes online reservation features available to customers.',
                                'Built RESTful API backend for several resource management features.',
                                'I implemented a real-time synchronization feature (between several ticket stations and online public  users) using websockets. It synchronizes both seat interactions and reservations.',
                                'Built a mobile first public portal for online seat reservations.',
                                'Used GitLab as a repository hub and also configured it as a container registry for the project using the GitLab CI service.',
                                'Used Docker to containerize the project environment (Go application + MySQL database + Nginx reverse proxy for possible future sub services).',
                                'Created a VM on AWS and configured it as a web server for the containerized project.',
                                'Generated Letsencrypt SSL certificates for the VM using certbot.',
                            ],
                            highlights: ['Golang', 'VueJs', 'Bootstrap', 'Web Sockets', 'MySQL', 'Docker', 'GitLab', 'CI', 'AWS', 'RESTful API', 'SaaS']
                        }
                    ]
                },
                {
                    companyName: 'MiltoLabs',
                    roles: [
                        {
                            title: 'Associate Software Engineer',
                            start: 'March 2020',
                            end: 'December 2020',
                            points: [
                                'Built microservices that follow the Command Query Responsibility Segregation(CQRS) and Event Sourcing patterns.',
                                'Utilized MongoDB as an eventstore for event sourcing pattern.',
                                'Wrote service functions that publish and consume events to and from the eventbus(RabbitMQ).',
                                'Used Docker to containerize the different microservices.',
                            ],
                            highlights: ['Golang', 'MongoDB', 'RabbitMQ', 'Docker', 'CQRS', 'Event Sourcing']
                        },
                        {
                            title: 'Software Engineer',
                            start: 'November 2019',
                            end: 'February 2020',
                            points: [
                                'Built Microservices for a payment solution using Golang.',
                                'Created and managed linux service files for different microservices.',
                                'Installed and configured Nginx as a reverse proxy for the microservices',
                                'Developed web services using REST architectural style',
                                'Built connector modules for two core banking systems(Temenos T24 and FlexCube) using Go.',
                                'Worked on  frontend portals that interact with REST APIs using VueJs.',
                                'Wrote JavaScript functions that utilize the firebase API for some of the features we had.',
                                'Built a websocket backend that serves updates using Golang and frontend components that interact with it using VueJs.',
                                'Created diagrams and mind maps  that illustrate system architectures and  interaction patterns.',
                            ],
                            highlights: ['Golang', 'VueJs', 'Microservices', 'Nginx', 'RESTful API', 'Firebase', 'Web Sockets', 'System Architecture']
                        },
                        {
                            title: 'Junior Software Engineer',
                            start: 'July 2019',
                            end: 'October 2019',
                            type: 'Internship',
                            points: [
                                'Got training on Overview of Software Engineering, Golang, Echo(Golang framework), and VueJs.',
                                'Introduced the team with a mind map tool called Coggle which is being used as a communication tool.',
                                'Configured firewall and DNS on google cloud platform',
                                'Setup a VM on GCP as an initial deployment environment by installing the Go environment and configuring environment variables.',
                                'Built some UI components for the company website using VueJs and Bootstrap.',
                            ],
                            highlights: ['Golang', 'VueJs', 'JavaScript', 'Bootstrap', 'CSS', 'GCP']
                        },
                    ]
                },
                {
                    companyName: 'SMTSE',
                    fullCompanyName: 'Sheger Mass Transport Service Enterprise',
                    roles: [
                        {
                            title: 'Software Developer',
                            start: 'June 2018',
                            end: 'August 2018',
                            type: 'Internship',
                            points: [
                                'Worked as a FullStack developer',
                                'Implemented several features for a web based ticket management system to track ticket sales.',
                                'Developed serveral endpoints to generate vairous ticket sales reports using PHP and SQL',
                                'Built some complex UI components using only HTML, CSS, and JavaScript for some of the reports'
                            ],
                            highlights: ['HTML', 'CSS', 'JavaScript', 'PHP', 'SQL']
                        }
                    ]
                },
            ],
            selected: 0,
        }
    },
    mounted(){
        
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
    font-size: clamp(38px, 3.25vw, 52px);
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