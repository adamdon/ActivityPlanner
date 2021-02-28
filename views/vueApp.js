import UserPage from './component/UserPage.js';
import HomePage from "./component/HomePage.js";
import NotFoundPage from "./component/NotFoundPage.js";




const routes =
[
    { path: '/', component: HomePage },
    { path: '/user', component: UserPage },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundPage },
];



const router = VueRouter.createRouter({history: VueRouter.createWebHistory(), routes: routes, });



const rootComponent =
{
    name: "vueApp",
    template: `<router-view></router-view>`,
};





const app = Vue.createApp({render: () => Vue.h(rootComponent)});
app.use(router)
app.mount("#vueApp");