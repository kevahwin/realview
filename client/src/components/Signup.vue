<template>
    <div>
        First Name: <input type="text" v-model="firstName"/><br/>
        Last Name: <input type="text" v-model="lastName"/><br/>
        Email: <input type="text" v-model="email"/><br/>
        Password: <input type="password" v-model="password"/><br/>
        <button @click="signup">signup</button>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'Sign-up',
    data() {
        return {
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        }
    },
    methods: {
        signup() {
            let newUser = {
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
                password: this.password
            }
            axios.post('/api/signup', newUser)
                .then(res => {
                    console.log(res);
                }, err => {
                    console.log(err.response);
                })
        }
    }
}
</script>

<!-- <style>
input {
    display: block;
}
</style> -->