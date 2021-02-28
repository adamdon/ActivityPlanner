import vueApp from "./vueApp.js";
import UserPage from './component/UserPage.js';
import HomePage from "./component/HomePage.js";
import NotFoundPage from "./component/NotFoundPage.js";



// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
    { path: '/', component: HomePage },
    { path: '/user', component: UserPage },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundPage },
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.

const router = VueRouter.createRouter(
    {
        history: VueRouter.createWebHistory(),
        routes: routes, // short for `routes: routes`
    }
);

const app = Vue.createApp({render: () => Vue.h(vueApp)});
app.use(router)
app.mount("#vueApp");