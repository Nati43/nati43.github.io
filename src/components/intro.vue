<template>
    <div class="p-0 m-0 d-flex flex-row align-items-stretch section">

        <b-card
            overlay
            class="border-0 p-0 m-0 rounded-0 flex-grow-1 d-flex left-card"
            no-body >
            <div class="flex-grow-1 d-flex flex-column justify-content-end px-3 px-md-5 py-5 text-custome-light text-left">
                <small class="my-2">mainly</small>
                <b-card-title class="title mb-3">Web <br> Developer</b-card-title>
                <p class="subtitle mb-md-5">
                    I have this habit of drinking coffee and then building
                    something great. I'm always on the learning process
                    to innovate and boost my game.
                </p>

                <div class="my-3 my-md-5 d-flex align-items-center justify-content-between">
                    <h5 class="name text-md-right">Natnael Meseret</h5>
                    <div class="avatar shadow-sm d-md-none"></div>
                </div>
                <div class="icons d-flex align-items-center justify-content-between mt-3">
                    <div class="left">
                        <b-link class="icon message" href="#contact"></b-link>
                    </div>
                    <div class="right d-flex">
                        <!-- <div class="icon tebta ml-3"></div> -->
                        <!-- <div class="icon github ml-3"></div> -->
                        <!-- <div class="icon twitter ml-3"></div> -->
                        <b-link class="icon github ml-3" target="_blank" href="https://github.com/Nati43"></b-link>
                        <b-link class="icon twitter ml-3" target="_blank" href="https://twitter.com/MeseretNatnael?s=09"></b-link>
                    </div>
                </div>
            </div>
        </b-card>

        <b-card
            class="border-0 p-0 m-0 rounded-0 flex-grow-1 right-card d-none d-md-flex"
            no-body >
        </b-card>

    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.left-card {
    background-color: #212121;
    background-image: url('../assets/lines.svg');
    background-repeat: no-repeat;
    background-size: cover;
}
.right-card {
    background-image: url('../assets/mugshot.jpeg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-blend-mode:luminosity;
    min-width: 400px;
}
.name {
    font-size: 48px;
}
.title {
    font-size: 48px;
    font-weight: 900;
}
.subtitle {
    font-size: 24px;
    font-weight: 400;
    max-width: 700px;
}
.icon {
    display: inline-block;
    width: 3rem;
    height: 2.5rem;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    transition: all .25s;
    cursor: pointer;
}
.icon:hover {
    transform: scale(1.25);
    background-blend-mode: saturation;
}
.icon.message {
    background-image: url('../assets/icons/message.svg');
}
.icon.twitter {
    background-image: url('../assets/icons/twitter.svg');
}
.icon.github {
    background-image: url('../assets/icons/github.svg');
}
.icon.tebta {
    background-image: url('../assets/icons/tebta.svg');
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 310px) {
    .avatar {
        min-width: 30vw;
        max-width: 30vw;
        min-height: 30vw;
        max-height: 30vw;
        border-radius: .5em;
        background-image: url('../assets/mugshot.jpeg');
        background-position: top;
        background-repeat: no-repeat;
        background-size: cover;
        background-blend-mode: luminosity;
        mix-blend-mode: luminosity;
    }
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) { 
    .name {
        width: 100%;
    }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
    .name,
    .title {
        font-size: 3.5rem;
    }
    .subtitle {
        font-size: 2rem;
    }
}
</style>