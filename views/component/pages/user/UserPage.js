import Navbar from '../../Navbar.js'
import ContainerLayout from '../../containers/ContainerLayout.js'
import ContainerContent from '../../containers/ContainerContent.js';
import ContainerContentRow from '../../containers/ContainerContentRow.js';


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