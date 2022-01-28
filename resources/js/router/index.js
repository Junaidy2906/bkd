import Vue from 'vue'
import Router from 'vue-router'

// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer.vue')

// Views
const DataPegawai = () => import('@/views/pages/datapegawai/Index')
const DataPegawaiEntry = () => import('@/views/pages/datapegawai/Entry')
const PangkatGolongan = () => import('@/views/pages/pangkat/Index')
const PangkatGolonganEntry = () => import('@/views/pages/pangkat/Entry')

// Views - Pages
const Page404 = () => import('@/views/pages/Page404')
const Page500 = () => import('@/views/pages/Page500')
const Login = () => import('@/views/pages/Login')
const Register = () => import('@/views/pages/Register')
Vue.use(Router)

export default new Router({
  mode: 'history', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/pages/login',
      name: 'Home',
      component: DefaultContainer,
      children: [
        // {
        //   path: 'dashboard',
        //   name: 'Dashboard',
        //   meta: {
        //       title: "Dashboard",
        //       auth: true,
        //   },
        //   component: Dashboard
        // },
        {
          path: 'data-pegawai',
          name: 'Data Pegawai',
          meta: {
              title: "Data Pegawai",
              auth: true,
          },
          component: DataPegawai
        },
        {
          path: 'data-pegawai/:act',
          name: 'Entry Data Pegawai',
          meta: {
              title: "Entry Data Pegawai",
              auth: true,
          },
          component: DataPegawaiEntry
        },
        {
          path: 'pangkat-golongan',
          name: 'Pangkat Golongan',
          meta: {
              title: "Pangkat Golongan",
              auth: true,
          },
          component: PangkatGolongan
        },
        {
          path: 'pangkat-golongan/:act',
          name: 'Entry Pangkat Golongan',
          meta: {
              title: "Entry Pangkat Golongan",
              auth: true,
          },
          component: PangkatGolonganEntry
        },
      ]
    },
    {
      path: '/pages',
      redirect: '/pages/404',
      name: 'Pages',
      component: {
        render (c) { return c('router-view') }
      },
      children: [
        {
          path: '404',
          name: 'Page404',
          component: Page404
        },
        {
          path: '500',
          name: 'Page500',
          component: Page500
        },
        {
          path: 'login',
          name: 'Login',
          component: Login,
          meta: {
            title : "Login"
          }
        },
        {
          path: 'register',
          name: 'Register',
          component: Register
        }
      ]
    }
  ]
})
