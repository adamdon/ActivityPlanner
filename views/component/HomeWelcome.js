


export default
{
    name: "HomeWelcome",

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





    template: `
    <div class="card text-white bg-primary">
        <div class="card-header"><i class="fas fa-home"></i> Welcome</div>
        <div class="card-body">
          <p class="card-text">
            test
            <router-link to="/user">user link</router-link>

          </p>
        </div>
    </div>
  `,
};