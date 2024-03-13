// Composables
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Test from '@/views/Test.vue'
import Login from '@/views/Login.vue'
import { useStore } from '@/store/app'; 

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/test',
    name: 'Test',
    component: Test
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

// router.beforeEach((to, from, next) => {
//   const authStore = useStore(); // Assign the useAuthStore function to the authStore variable

//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     if (!authStore.loggedIn) {
//       next({ name: 'login' });
//     } else {
//       next();
//     }
//   } else {
//     next();
//   }
// });

export default router
