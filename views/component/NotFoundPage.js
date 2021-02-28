import Navbar from './Navbar.js'
import ContainerLayout from './ContainerLayout.js'
import ContainerContent from './ContainerContent.js';
import ContainerContentRow from './ContainerContentRow.js';


export default
{
    name: "NotFoundPage",

    data()
    {
        return {
            formDisabled: false
        }
    },




    methods: {
        async method(event)
        {

        },


    },




    components: {Navbar, ContainerLayout, ContainerContent, ContainerContentRow},

    template: `
      <ContainerLayout>
      <ContainerContentRow>
        <ContainerContent desktop="col-xl-12">


          <div class="card text-white bg-primary">
            <div class="card-header"><i class="fas fa-home"></i> Welcome</div>
            <div class="card-body">
              <p class="card-text">
                Not Found
                <router-link to="/user">user link</router-link>

              </p>
            </div>
          </div>
          
          
        </ContainerContent>
      </ContainerContentRow>
      </ContainerLayout>
      
      

  `,
};