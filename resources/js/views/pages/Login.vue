<template>
<div class="app flex-row align-items-center">
    <div class="container">
        <b-row class="justify-content-center">
            <b-col md="8" lg="6">
                <b-card-group>
                    <b-card no-body class="p-4">
                        <b-card-body>
                            <b-form v-on:submit="prosesLogin">
                                <div class="text-center">
                                    <b-img src="/images/logo-pemko-medan.png" width="80" fluid></b-img>
                                    <h1>Login</h1>
                                    <p class="text-muted">Sign In to your account</p>
                                </div>
                                <div class="alert alert-danger fade show" v-if="errors != null && errors.message">
                                    <span class="close" data-dismiss="alert">×</span>
                                    <h5 class="font-size-18">{{ errors.message }}</h5>
                                </div>
                                <b-input-group class="mb-3">
                                    <b-input-group-prepend>
                                        <b-input-group-text><i class="icon-user"></i></b-input-group-text>
                                    </b-input-group-prepend>
                                    <b-form-input type="email" v-model="form.email" class="form-control" placeholder="Username" autocomplete="username email" />
                                </b-input-group>
                                <div class="text-danger mt-1" v-if="errors != null && errors.email">
                                    <ul>
                                        <li v-for="(item, index) in errors.email" :key="index"> {{ item }} </li>
                                    </ul>
                                </div>
                                <b-input-group class="mb-4">
                                    <b-input-group-prepend>
                                        <b-input-group-text><i class="icon-lock"></i></b-input-group-text>
                                    </b-input-group-prepend>
                                    <b-form-input type="password" v-model="form.password" class="form-control" placeholder="Password" autocomplete="current-password" />
                                </b-input-group>
                                <div class="text-danger mt-1" v-if="errors != null && errors.password">
                                    <ul>
                                        <li v-for="(item, index) in errors.password" :key="index"> {{ item }} </li>
                                    </ul>
                                </div>
                                <b-row>
                                    <b-col cols="12">
                                        <b-button type="submit" variant="primary" block class="px-4" v-html="textLogin"></b-button>
                                    </b-col>
                                    <b-col cols="12" class="text-center mt-2">
                                        <small class="text-center">BADAN KEPEGAWAIAN DAERAH DAN PENGEMBANGAN SDM KOTA MEDAN</small>
                                    </b-col>
                                </b-row>
                            </b-form>
                        </b-card-body>
                    </b-card>
                    <!-- <b-card no-body class="text-white bg-primary py-5 d-md-down-none" style="width:44%">
              <b-card-body class="text-center">
                <div>
                  <h2>Sign up</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  <b-button variant="primary" class="active mt-3">Register Now!</b-button>
                </div>
              </b-card-body>
            </b-card> -->
                </b-card-group>
            </b-col>
        </b-row>
    </div>
</div>
</template>

<script>
export default {
    name: 'Login',
    data() {
        return {
            csrf: document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
            textLogin: 'Masuk',
            form: {
                email: '',
                password: '',
            },
            errors: null,
        }
    },
    methods: {
        prosesLogin: function (e) {
            e.preventDefault();
            let self = this;
            self.errors = null;
            self.textLogin = '<i class="fa fa-spinner fa-spin"></i>';
            // window.axios.defaults.headers.common['X-CSRF-TOKEN'] = self.csrf;
            axios.post('/api/login', self.form)
                .then(response => {
                        let data = response.data.status.data;
                        // console.log(data.hash_role[0].name);
                        // if (data.hash_role[0].name == 'Customer Service') {
                        //   self.$router.push('/customer-service');
                        // } else if (data.hash_role[0].name == 'Tiket') {
                        //   self.$router.push('/tiket');
                        // } else if (data.hash_role[0].name == 'Antrian') {
                        //   self.$router.push('/antrian');
                        // } else {
                          self.$router.push('/data-pegawai');
                        // }
                        // window.location.href = '/dashboard';
                    },
                    error => {
                        // console.log(error.response);
                        if (error.response.status == 403) {
                            this.$swal({
                                title: "Warning",
                                text: error.response.data.message,
                                icon: "warning"
                            });
                        } else if (error.response.status == 422) {
                            // this.message = error.response.data.message;
                            self.textLogin = "Masuk";
                            self.errors = error.response.data.errors;
                        } else if (error.response.status == 404) {

                        } else if (error.response.status === 401) {
                            self.textLogin = "Masuk";
                            self.errors = error.response.data.status;
                            console.log(self.errors);
                        } else {
                            self.textLogin = "Masuk";
                            console.error(error);
                            this.$swal({
                                title: "Warning",
                                text: error.response.data.message,
                                icon: "warning"
                            });
                            // this.$snotify.error(
                            //   "Something went wrong try again later.",
                            //   "Error"
                            // );
                        }

                    }).catch(e => {
                    console.log(e);
                });
        }
    }
}
</script>
