import Navbar from '../../Navbar.js';
import ContainerLayout from '../../containers/ContainerLayout.js';
import ContainerContent from '../../containers/ContainerContent.js';
import ContainerContentRow from '../../containers/ContainerContentRow.js';

import ShareResults from "./ShareResults.js";






export default
{
    name: "SharePage",


    components: {Navbar, ContainerLayout, ContainerContent, ContainerContentRow, ShareResults},
    template: `
    
    <ContainerLayout>
        <ContainerContentRow>
          <ContainerContent desktop="col-xl-12"><ShareResults></ShareResults></ContainerContent>
        </ContainerContentRow>
    </ContainerLayout>
    `,
};