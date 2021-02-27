import Navbar from './component/Navbar.js'
import ContainerLayout from './component/ContainerLayout.js'
import ContainerContent from './component/ContainerContent.js';
import ContainerContentRow from './component/ContainerContentRow.js';


import UserCreate from "./component/UserCreate.js";
import UserLogin from "./component/UserLogin.js";




export default
{
    name: "vueApp",
    components: {Navbar, ContainerLayout, ContainerContent, ContainerContentRow, UserCreate, UserLogin},
    data()
    {
        return {
            count: 0,
        };
    },

    template: `
        <Navbar></Navbar>
        
        <ContainerLayout>
            
            <ContainerContentRow>
              <ContainerContent desktop="col-xl-6"><UserCreate></UserCreate></ContainerContent>
              <ContainerContent desktop="col-xl-6"><UserLogin></UserLogin></ContainerContent>
            </ContainerContentRow>

        </ContainerLayout>
  `,
};