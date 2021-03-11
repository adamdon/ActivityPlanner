import Navbar from '../../Navbar.js'
import ContainerLayout from '../../containers/ContainerLayout.js'
import ContainerContent from '../../containers/ContainerContent.js';
import ContainerContentRow from '../../containers/ContainerContentRow.js';

import CalendarAssignment from "./CalendarAssignment.js";
import CalendarAchievement from "./CalendarAchievement.js";




export default
{

    components: {Navbar, ContainerLayout, ContainerContent, ContainerContentRow, CalendarAssignment, CalendarAchievement},

    template: `
    
    <ContainerLayout>
        <ContainerContentRow>
          <ContainerContent desktop="col-xl-6"><CalendarAssignment></CalendarAssignment></ContainerContent>
          <ContainerContent desktop="col-xl-6"><CalendarAchievement></CalendarAchievement></ContainerContent>
        </ContainerContentRow>
    </ContainerLayout>
    `,
};