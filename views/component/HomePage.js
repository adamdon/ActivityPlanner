import Navbar from './Navbar.js'
import ContainerLayout from './ContainerLayout.js'
import ContainerContent from './ContainerContent.js';
import ContainerContentRow from './ContainerContentRow.js';

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
    <Navbar></Navbar>
    
    <ContainerLayout>
        <ContainerContentRow>
            <ContainerContent desktop="col-xl-12"><HomeWelcome></HomeWelcome></ContainerContent>
        </ContainerContentRow>
    </ContainerLayout>
    `,
};