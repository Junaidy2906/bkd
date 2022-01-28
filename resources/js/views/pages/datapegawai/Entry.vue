<template>
<div class="animated fadeIn">
    <div class="mt-4">
        <b-card>
            <div slot="header">
                Entry Data Data Pegawai
                <div class="card-header-actions" style="height: 21px;">
                    <router-link :to="'/data-pegawai'" class="btn btn-sm btn-warning text-white"><i class="fa fa-arrow-left" /> Kembali</router-link>
                </div>
            </div>
            <form @submit.prevent="submit">

                <b-form-row class="mb-1">
                    <b-col md="2">
                        <label class="mt-1">Nama</label>
                    </b-col>
                    <b-col md="10">
                        <b-form-input v-model="form.nama" type="text" placeholder="Masukkan Nama"></b-form-input>
                        <div class="text-danger mt-1" v-if="errors != null">
                            <ul>
                                <li v-for="(item, index) in errors.nama" :key="index"> {{ item }} </li>
                            </ul>
                        </div>
                    </b-col>
                </b-form-row>

                <b-form-row class="mb-1">
                    <b-col md="2">
                        <label class="mt-1">Usia</label>
                    </b-col>
                    <b-col md="10">
                        <b-form-input v-model="form.usia" type="number" placeholder="Masukkan usia"></b-form-input>
                        <div class="text-danger mt-1" v-if="errors != null">
                            <ul>
                                <li v-for="(item, index) in errors.usia" :key="index"> {{ item }} </li>
                            </ul>
                        </div>
                    </b-col>
                </b-form-row>

                <b-form-row>

                    <b-col md="2">
                        <label class="mt-1">Jenis Kelamin</label>
                    </b-col>
                    <b-col md="10">
                        <b-form-group label="" v-slot="{ ariaDescribedby }">
                            <b-form-radio v-model="form.jenis_kelamin" :aria-describedby="ariaDescribedby" name="some-radios" value="L">L</b-form-radio>
                            <b-form-radio v-model="form.jenis_kelamin" :aria-describedby="ariaDescribedby" name="some-radios" value="P">P</b-form-radio>
                        </b-form-group>

                        <div class="text-danger mt-1" v-if="errors != null">
                            <ul>
                                <li v-for="(item, index) in errors.jenis_kelamin" :key="index"> {{ item }} </li>
                            </ul>
                        </div>
                    </b-col>
                </b-form-row>

                <b-form-row>

                    <b-col md="2">
                        <label class="mt-1">Pangkat/Golongan</label>
                    </b-col>
                    <b-col md="10" v-if="options">
                        <b-form-select v-model="form.pangkat_golongan_id" :options="options"></b-form-select>
                        <div class="text-danger mt-1" v-if="errors != null">
                            <ul>
                                <li v-for="(item, index) in errors.pangkat_golongan_id" :key="index"> {{ item }} </li>
                            </ul>
                        </div>
                    </b-col>
                </b-form-row>

                <b-form-row class="mt-1">
                    <b-col md="12" class="text-center mt-1">
                        <b-button type="submit" variant="primary">Simpan</b-button>
                    </b-col>
                </b-form-row>
            </form>
        </b-card>
    </div>
</div>
</template>

<script>
// import helpers from '../../helpers/helpers';
export default {
    name: "EntryUser",
    data() {
        return {
            form: {
                nama: '',
                usia: '',
                jenis_kelamin: 'L',
                pangkat_golongan_id: '',
            },
            //   options: [{
            //       item: 'Y',
            //       name: 'Y'
            //     },
            //     {
            //       item: 'N',
            //       name: 'N'
            //     },
            //   ],
            errors: "",
            // pangkat_golongan: null,
            options: [],
            edit: false,
        }
    },
    created() {
        let act = this.$route.params.act;
        this.getkategori();
        if (act != 'add') {
            this.petchData(act);
        }
    },
    methods: {
        getkategori() {
            axios.get('/api/pangkat-golongan/getoption').then((response) => {
                this.$swal.close();
                let data = response.data.rows;
                for (let index = 0; index < data.length; index++) {
                    const element = data[index];
                    this.options.push({
                        "value": element.id,
                        "text": element.nama + ":" + element.keterangan
                    });
                }
            }).catch((error) => {
                this.$swal.close();
            });
        },
        petchData(id) {
            this.$swal({
                title: 'Silahkan Tunggu . . .',
                showConfirmButton: false,
                allowOutsideClick: false,
                onBeforeOpen: () => {
                    this.$swal.showLoading();
                },
            });
            axios.get('/api/data-pegawai/' + id).then((response) => {
                // console.log(response.data);
                this.$swal.close();
                let data = response.data.rows;
                // this.urutan = data.urutan;
                this.form.nama = data.nama;
                this.form.usia = data.usia;
                this.form.jenis_kelamin = data.jenis_kelamin;
                this.form.pangkat_golongan_id = data.pangkat_golongan_id;
                this.edit = true;
            }).catch((error) => {
                this.$swal.close();
            });
        },
        submit(e) {
            e.preventDefault();

            const self = this;
            self.errors = null;

            //   var formData = self.getherFormData();

            //   const config = {
            //     headers: {
            //       'content-type': 'multipart/form-data'
            //     }
            //   }

            self.$swal({
                title: 'Silahkan Tunggu . . .',
                showConfirmButton: false,
                allowOutsideClick: false,
                onBeforeOpen: () => {
                    self.$swal.showLoading();
                },
            });

            let url = '/api/data-pegawai';
            let act = this.$route.params.act;
            let dataRequest = null;
            if (act == 'add') {
                dataRequest = axios.post(url, this.form);
            } else {
                dataRequest = axios.put(url + "/" + act, this.form);
            }
            dataRequest
                .then(function (response) {
                    self.$swal.close();
                    self.$swal({
                        title: 'Data Berhasil Disimpan',
                        icon: 'success',
                        confirmButtonColor: '#3085d6',
                        allowOutsideClick: false,
                    }).then((result) => {
                        if (result.value) {
                            // self.$route
                            self.$router.push('/data-pegawai');
                        }
                    });
                })
                .catch(function (error) {
                    self.$swal.close();
                    console.log(error.response);
                    if (error.response.status == 422) {
                        self.errors = error.response.data;
                    } else {
                        self.$swal({
                            icon: 'error',
                            title: 'Periksa kembali form anda',
                            allowOutsideClick: false,
                        });
                    }

                    //   if (error.response) {
                    //     self.$swal.close();
                    //     self.$swal({
                    //       icon: 'error',
                    //       title: 'Periksa kembali form anda',
                    //       allowOutsideClick: false,
                    //     });
                    //     if (error.response.data.errors) {
                    //       self.errors = error.response.data.errors;
                    //     }
                    //   }
                });
        },
        getherFormData() {

            let formData = new FormData();

            let status = this.$route.params.status;
            if (status != 'add') {
                formData.append('id', status);
            }
            formData.append('nama', this.nama);
            formData.append('keterangan', this.keterangan);

            return formData;
        },
        onImageChange(e) {
            const image = e.target.files[0];
            if (image.size > 1024 * 512) {
                e.preventDefault();
                this.$swal({
                    type: 'warning',
                    title: 'Terjadi kesalahan',
                    text: 'ukuran gambar melebihi 500Kb',
                })
                this.$refs.imgupload.value = null;
                this.urlImage = null;
                return;
            }

            this.gambar = image;
            this.urlImage = URL.createObjectURL(image);
        },
    }

}
</script>
