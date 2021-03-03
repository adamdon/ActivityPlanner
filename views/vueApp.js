import UserPage from './component/pages/user/UserPage.js';
import HomePage from "./component/pages/home/HomePage.js";
import NotFoundPage from "./component/NotFoundPage.js";
import Navbar from "./component/Navbar.js";




const routes =
[
    { path: '/', component: HomePage },
    { path: '/user', component: UserPage },
    { path: '/:pathMatch(.*)*', name: 'NotFoundPage', component: NotFoundPage },
];



const router = window.VueRouter.createRouter({history: VueRouter.createWebHistory(), routes: routes, });



const rootComponent =
{
    name: "vueApp",
    components: {Navbar,},
    template: `
    <Navbar></Navbar>
    <router-view></router-view>
    `,
};


const app = Vue.createApp({render: () => Vue.h(rootComponent)});
app.use(router)
app.config.globalProperties.emitter = window.mitt();
app.mount("#vueApp");