import Navbar from './Navbar.js'
import ContainerLayout from './ContainerLayout.js'
import ContainerContent from './ContainerContent.js';
import ContainerContentRow from './ContainerContentRow.js';


import UserCreate from "./UserCreate.js";
import UserLogin from "./UserLogin.js";


export default
{
    name: "UserPage",

    data()
    {
        return {

            thisVar: false
        }
    },


    methods: {
        async method(event)
        {

        }
    },

    components: {Navbar, ContainerLayout, ContainerContent, ContainerContentRow, UserCreate, UserLogin},

    template: `
<!--    <Navbar></Navbar>-->
    
    <ContainerLayout>
        <ContainerContentRow>
            <ContainerContent desktop="col-xl-6"><UserCreate></UserCreate></ContainerContent>
            <ContainerContent desktop="col-xl-6"><UserLogin></UserLogin></ContainerContent>
        </ContainerContentRow>
    </ContainerLayout>
    `,
};