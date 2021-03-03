import Navbar from '../../Navbar.js'
import ContainerLayout from '../../containers/ContainerLayout.js'
import ContainerContent from '../../containers/ContainerContent.js';
import ContainerContentRow from '../../containers/ContainerContentRow.js';

import HomeWelcome from "./HomeWelcome.js";


export default
{
    name: "HomePage",

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

    components: {Navbar, ContainerLayout, ContainerContent, ContainerContentRow, HomeWelcome},

    template: `
<!--    <Navbar></Navbar>-->
    
    <ContainerLayout>
        <ContainerContentRow>
            <ContainerContent desktop="col-xl-12"><HomeWelcome></HomeWelcome></ContainerContent>
        </ContainerContentRow>
    </ContainerLayout>
    `,
};