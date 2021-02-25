import Navbar from './component/Navbar.js'
import ContainerLayout from './component/ContainerLayout.js'
import ContainerContent from './component/ContainerContent.js';

import UserCreate from "./component/UserCreate.js";
import UserLogin from "./component/UserLogin.js";




export default
{
    name: "vueApp",
    components: {Navbar, ContainerLayout, ContainerContent, UserCreate, UserLogin},
    data()
    {
        return {
            count: 0,
        };
    },

    template: `
        <Navbar></Navbar>
        <ContainerLayout>
            <ContainerContent><UserCreate></UserCreate></ContainerContent>
            <ContainerContent><UserLogin></UserLogin></ContainerContent>
        </ContainerLayout>
  `,
};