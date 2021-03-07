import ContainerLayout from '../../containers/ContainerLayout.js'
import ContainerContent from '../../containers/ContainerContent.js';
import ContainerContentRow from '../../containers/ContainerContentRow.js';

import ScheduleTemplateList from "./ScheduleTemplateList.js";
import ScheduleGoalSetter from "./ScheduleGoalSetter.js";



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

    components: {ContainerLayout, ContainerContent, ContainerContentRow, ScheduleTemplateList, ScheduleGoalSetter},
    template: `
    <ContainerLayout>
        <ContainerContentRow>
            <ContainerContent desktop="col-xl-6"><ScheduleTemplateList></ScheduleTemplateList></ContainerContent>
            <ContainerContent desktop="col-xl-6"><ScheduleGoalSetter></ScheduleGoalSetter></ContainerContent>
        </ContainerContentRow>
    </ContainerLayout>
    `,
};