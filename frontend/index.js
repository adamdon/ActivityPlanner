import vueApp from "./vueApp.js";


const app = Vue.createApp({render: () => Vue.h(vueApp)});
app.mount("#vueApp");