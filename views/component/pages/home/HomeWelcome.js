


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
            user <router-link to="/user" class="text-decoration-none font-weight-bold text-white">link</router-link>
          </p>
          <p class="card-text">
            schedule <router-link to="/schedule" class="text-decoration-none font-weight-bold text-white">link</router-link>
          </p>
          <p class="card-text">
            calendar <router-link to="/calendar" class="text-decoration-none font-weight-bold text-white">link</router-link>
          </p>
        </div>
    </div>
  `,
};