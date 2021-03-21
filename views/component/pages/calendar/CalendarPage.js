import Navbar from '../../Navbar.js'
import ContainerLayout from '../../containers/ContainerLayout.js'
import ContainerContent from '../../containers/ContainerContent.js';
import ContainerContentRow from '../../containers/ContainerContentRow.js';

import CalendarResults from "./CalendarResults.js";
import CalendarAssignment from "./CalendarAssignment.js";
import CalendarAchievement from "./CalendarAchievement.js";




export default
{
    name: "CalendarPage",


    components: {Navbar, ContainerLayout, ContainerContent, ContainerContentRow, CalendarResults, CalendarAssignment, CalendarAchievement},
    template: `
    
    <ContainerLayout>
    <ContainerContentRow>
      <ContainerContent desktop="col-xl-12"><CalendarResults></CalendarResults></ContainerContent>
    </ContainerContentRow>
        <ContainerContentRow>
          <ContainerContent desktop="col-xl-6"><CalendarAssignment></CalendarAssignment></ContainerContent>
          <ContainerContent desktop="col-xl-6"><CalendarAchievement></CalendarAchievement></ContainerContent>
        </ContainerContentRow>
    </ContainerLayout>
    `,
};