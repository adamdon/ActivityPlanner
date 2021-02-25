import Navbar from './component/Navbar.js'
import ContainerLayout from './component/ContainerLayout.js'
import ContainerContent from './component/ContainerContent.js';

import AccountCreate from "./component/AccountCreate.js";
import AccountLogin from "./component/AccountLogin.js";




export default
{
    name: "vueApp",
    components: {Navbar, ContainerLayout, ContainerContent, AccountCreate, AccountLogin},
    data()
    {
        return {
            count: 0,
        };
    },

    template: `
        <Navbar></Navbar>
        <ContainerLayout>
            <ContainerContent><AccountCreate></AccountCreate></ContainerContent>
            <ContainerContent><AccountLogin></AccountLogin></ContainerContent>
        </ContainerLayout>
  `,
};