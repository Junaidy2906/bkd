<template>
<div class="animated fadeIn">
  <b-card>
    <div slot="header">
      Main Data -  Agama
      <div class="card-header-actions" style="height: 21px;">
        <b-button variant="success" size="sm"> <i class="fa fa-refresh" @click="loadPostsData" /></b-button>
        <router-link :to="'/data-pegawai/add'" class="btn btn-sm btn-primary"><i class="fa fa-edit" /> Entry Data</router-link>
      </div>
    </div>
    <app-datatable v-if="fields" :editUrl="'/data-pegawai/'" :deleteData="deleteRow" :isBusy="isBusy" :items="items" :fields="fields" :meta="meta" @per_page="handlePerPage" @pagination="handlePagination" @search="handleSearch" @sort="handleSort" />
    <div class="text-center" v-else>
      <b-spinner variant="success" label="Spinning"></b-spinner>
      <br>
      <span>Silahkan Tunggu . . .</span>
    </div>
  </b-card>

</div>
</template>

<script>
import moment from 'moment'
import Datatable from './TableInfo.vue' //IMPORT COMPONENT DATATABLENYA
import axios from 'axios' //IMPORT AXIOS
export default {
    name: "info",
    components: {
        'app-datatable': Datatable //REGISTER COMPONENT DATATABLE
    },
    data: function () {
        return {
            //UNTUK VARIABLE FIELDS, DEFINISIKAN KEY UNTUK MASING-MASING DATA DAN SORTABLE BERNILAI TRUE JIKA INGIN MENAKTIFKAN FITUR SORTING DAN FALSE JIKA TIDAK INGIN MENGAKTIFKAN
            fields: [
                {
                    key: 'index',
                    label: 'No',
                    sortable: true
                },{
                    key: 'nama',
                    label: 'Nama',
                    sortable: true
                },{
                    key: 'usia',
                    label: 'Usia',
                    sortable: true
                },{
                    key: 'jenis_kelamin',
                    label: 'Jenis Kelamin',
                    sortable: true
                },{
                    key: 'pangkatgolongan',
                    label: 'Pangkat/Golongan',
                    sortable: true
                },
                // {
                //     key: 'aktif',
                //     label: 'Aktif',
                //     formatter: (value, key, item) => {
                //         return value == 'Y' ? '<i class="fa fa-eye text-success"></i>' : '<i class="fa fa-eye-slash text-danger"></i>'
                //     },
                //     sortable: true
                // },
                {
                    key: 'actions',
                    label: 'Actions'
                } //TAMBAHKAN CODE INI
            ],
            items: [], //DEFAULT VALUE DARI ITEMS ADALAH KOSONG
            meta: [], //JUGA BERLAKU UNTUK META
            current_page: 1, //DEFAULT PAGE YANG AKTIF ADA PAGE 1
            per_page: 10, //DEFAULT LOAD PERPAGE ADALAH 10
            search: '',
            sortBy: 'id', //DEFAULT SORTNYA ADALAH CREATED_AT
            sortByDesc: false, //ASCEDING
            isBusy: false,
        }
    },
    methods: {
        formatDate(value) {
            if (value) {
                return moment(String(value)).format('DD/MM/YYYY hh:mm')
            }
        },
        deleteRow(id) {
            this.$swal({
                title: 'Peringatan',
                icon: 'warning',
                text: 'Apakah anda yakin ingin menghapus data ini?',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                focusConfirm: false,
                confirmButtonText: 'Proses',
            }).then((result) => {
                if (result.value) {
                    // alert('Helo')
                    this.prosesDelete(id);
                }
            });
        },
        prosesDelete(id) {
            this.$swal({
                title: 'Silahkan Tunggu . . .',
                showConfirmButton: false,
                allowOutsideClick: false,
                onBeforeOpen: () => {
                    this.$swal.showLoading()
                },
            });

            axios.delete('/api/data-pegawai/' + id).then((response) => {
                this.$swal({
                    title: 'Data Berhasil Dihapus',
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                    allowOutsideClick: false,
                }).then((result) => {
                    if (result.value) {
                        this.loadPostsData();
                        // self.$route
                        // this.$router.go('/galery');
                    }
                });
            }).catch((error) => {
                this.$swal({
                    type: 'error',
                    title: 'Silahkan Coba Lagi!',
                    allowOutsideClick: false,
                });
            });
        },
        //METHOD INI AKAN MENGHANDLE REQUEST DATA KE API
        loadPostsData() {
            this.isBusy = true;
            let current_page = this.search == '' ? this.current_page : 1
            //LAKUKAN REQUEST KE API UNTUK MENGAMBIL DATA POSTINGAN
            axios.get(`/api/data-pegawai`, {
                    //KIRIMKAN PARAMETER BERUPA PAGE YANG SEDANG DILOAD, PENCARIAN, LOAD PERPAGE DAN SORTING.
                    params: {
                        page: current_page,
                        per_page: this.per_page,
                        q: this.search,
                        sortby: this.sortBy,
                        sortbydesc: this.sortByDesc ? 'DESC' : 'ASC'
                    }
                })
                .then((response) => {
                    this.isBusy = false;
                    //JIKA RESPONSENYA DITERIMA
                    let getData = response.data.data
                    this.items = getData.data //MAKA ASSIGN DATA POSTINGAN KE DALAM VARIABLE ITEMS
                    //DAN ASSIGN INFORMASI LAINNYA KE DALAM VARIABLE META
                    this.meta = {
                        total: getData.total,
                        current_page: getData.current_page,
                        per_page: getData.per_page,
                        from: getData.from,
                        to: getData.to
                    }
                })
        },

        //JIKA ADA EMIT TERKAIT LOAD PERPAGE, MAKA FUNGSI INI AKAN DIJALANKAN
        handlePerPage(val) {
            this.per_page = val //SET PER_PAGE DENGAN VALUE YANG DIKIRIM DARI EMIT
            this.loadPostsData() //DAN REQUEST DATA BARU KE SERVER
        },

        //JIKA ADA EMIT PAGINATION YANG DIKIRIM, MAKA FUNGSI INI AKAN DIEKSEKUSI
        handlePagination(val) {
            this.current_page = val //SET CURRENT PAGE YANG AKTIF
            this.loadPostsData()
        },
        //JIKA ADA DATA PENCARIAN
        handleSearch(val) {
            this.search = val //SET VALUE PENCARIAN KE VARIABLE SEARCH
            this.loadPostsData() //REQUEST DATA BARU
        },
        //JIKA ADA EMIT SORT
        handleSort(val) {
            //MAKA SET SORT-NYA
            this.sortBy = val.sortBy
            this.sortByDesc = val.sortDesc

            this.loadPostsData() //DAN LOAD DATA BARU BERDASARKAN SORT
        },
        reloadPage() {
            // alert('Hello');
            loadPostsData();
        }
    },
    mounted() {
        this.loadPostsData();
    },
}
</script>
