import Navbar from "./component/Navbar.js";
import UserPage from './component/pages/user/UserPage.js';
import HomePage from "./component/pages/home/HomePage.js";
import ScheduleTemplatePage from "./component/pages/schedule/ScheduleTemplatePage.js";
import CalendarPage from "./component/pages/calendar/CalendarPage.js"
import SharePage from "./component/pages/share/SharePage.js"
import NotFoundPage from "./component/NotFoundPage.js";


const rootComponent =
{
    name: "vueApp",


    components: {Navbar,},
    template: `
    <Navbar></Navbar>
  

    <router-view v-slot="slotProps">

        <transition
            name="test"
            enter-active-class="animate__animated animate__backInDown animate__faster"
            leave-active-class="animate__animated animate__backOutDown animate__faster"
        >
            <component :is="slotProps.Component"/>

        </transition>
    </router-view>

    `,
};


const routes =
    [
        { path: '/', component: HomePage },
        { path: '/user', component: UserPage },
        { path: '/schedule', component: ScheduleTemplatePage },
        { path: '/calendar', component: CalendarPage },
        { path: '/share/:assignment_id', component: SharePage },
        { path: '/:pathMatch(.*)*', name: 'NotFoundPage', component: NotFoundPage },
    ];

const router = window.VueRouter.createRouter({history: VueRouter.createWebHistory(), routes: routes, });




const app = Vue.createApp({render: () => Vue.h(rootComponent)});
app.use(router)
app.config.devtools = true;
app.config.globalProperties.emitter = window.mitt();
app.mount("#vueApp");