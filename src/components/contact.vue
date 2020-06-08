<template>
    <div id="contact" class="p-0 m-0 d-flex flex-row align-items-stretch section">

        <b-card
            overlay
            class="border-0 p-0 m-0 rounded-0 flex-grow-1 d-none d-md-flex left-card"
            no-body >
            <div class="flex-grow-1 d-flex flex-column align-items-center justify-content-top px-3 px-md-5 py-5 text-custome-light text-center">
                <div class="pt-5">
                    <p class="mt-5 pt-5 text text-left">
                        Have an <span class="title">IDEA</span> you want to work on <span class="title">?</span> <br>
                    </p>
                </div>
            </div>
        </b-card>

        <b-card
            class="border-0 p-0 m-0 rounded-0 flex-grow-1 right-card"
            no-body >
            <div class="flex-grow-1 d-flex flex-column align-items-center align-items-md-start justify-content-center  py-5 text-left">
                <P class="text"> Send me a message. </P>
                <form class="contact-form d-flex flex-column" action="https://formspree.io/natnael0meseret@gmail.com" method="POST">
                    <b-form-group id="input-group-1" label="Name:" label-for="input-1" >
                        <b-form-input id="input-1" name="name"  type="text" required placeholder="Name" class="border-0 input"> </b-form-input>
                    </b-form-group>
                    
                    <b-form-group id="input-group-2" label="Email address:" label-for="input-2" description="Please use your own email so that I can reach you.">
                        <b-form-input id="input-2" name="email"  type="email" required placeholder="Enter email" class="border-0 input"> </b-form-input>
                    </b-form-group>
                    
                    <b-form-group id="input-group-3" label="Message:" label-for="input-3">
                        <b-form-textarea id="input-3" name="message" placeholder="Message" rows="5" class="border-0 input"> </b-form-textarea>
                    </b-form-group>

                    <b-button type="submit" variant="outline-primary" class="align-self-center px-4 mb-5 mt-4">Send</b-button>
                </form>
            </div>
        </b-card>

    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
.left-card {
    background-image: url('../assets/idea_light.svg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: 30%;
    background-blend-mode:luminosity;
    mix-blend-mode: multiply;
}
.right-card {
    mix-blend-mode: multiply;
}
.title {
    margin: 0 10px;
    font-size: 35px;
    font-weight: 900;
}
.text {
    font-size: 25px;
    mix-blend-mode: multiply;
}

.input {
    background-color: #E1E1E1;
    color: #212121;
}

.btn-outline-primary {
    color: #212121;
    border-color: #E1E1E1;
    outline-color: #E1E1E1 !important;
}
.btn-outline-primary:hover,
.btn-outline-primary:active,
.btn-outline-primary:focus {
    color: #212121;
    background-color: #E1E1E1;
}

.contact-form {
    width: 85%;
    max-width: 400px;
}


/* Medium devices (tablets, 768px and down) */
@media (max-width: 768px) { 
    .contact-form {
        width: 85vw;
        max-width: 400px;
    }
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) { 
    .right-card {
        min-width: 400px;
    }
}
</style>