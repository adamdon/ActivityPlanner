import ContainerLayout from '../../containers/ContainerLayout.js'
import ContainerContent from '../../containers/ContainerContent.js';
import ContainerContentRow from '../../containers/ContainerContentRow.js';

import ScheduleTemplateList from "./ScheduleTemplateList.js";


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

    components: {ContainerLayout, ContainerContent, ContainerContentRow, ScheduleTemplateList},
    template: `
    <ContainerLayout>
        <ContainerContentRow>
            <ContainerContent desktop="col-xl-12"><ScheduleTemplateList></ScheduleTemplateList></ContainerContent>
        </ContainerContentRow>
    </ContainerLayout>
    `,
};