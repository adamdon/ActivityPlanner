import UserPage from './component/UserPage.js';
import HomePage from "./component/HomePage.js";





export default
{
    name: "vueApp",
    data()
    {
        return {
            count: 0,
        };
    },

    components: {UserPage, HomePage},
    template: `
      <router-view />
      
  `,
};