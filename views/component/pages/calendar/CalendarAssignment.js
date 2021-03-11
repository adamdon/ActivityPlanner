export default {
    name: "CalendarAssignment",

    data()
    {
        return {

            errorAlert: "",
            successAlert: "",
        };
    },

    methods:
    {
        async method1()
        {

        },

        async method2()
        {


        },


    },


    async mounted()
    {


    },




    template: `
      <div class="card text-white bg-primary">
          <div class="card-header"><i class="far fa-calendar-alt"></i> Schedule Assignment</div>
          <div class="card-body">   
            
            
            
            
            
            
        
            <div class="divider my-4 bg-dark"></div>
        
        
        
            <!----------- start of output dialog boxes  ---------------->
        
        
            <div v-if="errorAlert" class="alert alert-danger" role="alert">
              {{ errorAlert }}
            </div>
        
            <div v-if="successAlert" class="alert alert-success" role="alert">
              {{ successAlert }}
            </div>
        
            <!----------- end of output dialog boxes  ---------------->
        
        
        
          </div>
      </div>
    `,
};