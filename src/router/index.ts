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

router.beforeEach(async (to) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const store = useStore();
  
  if (authRequired && !store.loggedIn) {
      return '/login';
  }
  else if (!authRequired && store.loggedIn) {
      return '/';
  }
});

export default router
