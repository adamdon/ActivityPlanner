export default
{
    name: "Navbar",

    data()
    {
        return {
            nameFirst: "",
            gravatarUrl: "",
            loggedIn: "unknown"
        }
    },


    async mounted()
    {
        await this.updateNav();
        this.emitter.on("updateNav", () => this.updateNav());
    },




    methods: {
        async logout(event)
        {
            window.localStorage.clear();
            this.emitter.emit("updateNav");
            this.$router.push("/user");
        },

        async updateNav(event)
        {
            const token = localStorage.getItem("token")

            if(token)
            {
                let requestBody = {token: token,};
                let requestUrl = "/api/userDetailsRead";
                let requestHeaders = {"Content-Type": "application/json"};

                const response = await fetch(requestUrl, {method: "POST", headers: requestHeaders, body: JSON.stringify(requestBody)});
                const data = await response.json();
                if(data)
                {
                    this.nameFirst = data.name.split(' ')[0];
                    this.gravatarUrl = ("http:" + data.avatar);
                    this.loggedIn = "yes";
                }
            }
            else
            {
                this.loggedIn = "no";
            }
        },


    },


    template: `
      
<nav class="navbar navbar-dark bg-primary p-0">
    <router-link class="navbar-brand" to="/">
      &nbsp<img src="/image/logo.svg" width="30" height="30" class="d-inline-block align-top" alt="logo">
      ActivityPlanner
    </router-link>
    
    
    <div v-if="this.loggedIn === 'yes'">
      <a class="nav-link dropdown-toggle btn btn-primary" href="" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        {{nameFirst}} &nbsp <img :src="gravatarUrl"  width="30" height="30" class="rounded-circle " alt="icon">
      </a>

      <div class="dropdown-menu dropdown-menu-right animate slideIn" aria-labelledby="navbarDropdownMenuLink">
        <a class="dropdown-item text-center" href="">Achievement Calendar</a>
        <a class="dropdown-item text-center" href="">Schedule Creator</a>
        <a v-on:click="logout" class="dropdown-item text-center" href="">Log Out</a>
      </div>
    </div>

    <div v-else-if="this.loggedIn === 'no'">
      <router-link to="/user">
        <button class="btn btn-primary" href="" id="navbarDropdownMenuLink" role="button">
          Login/Signup &nbsp <img src="/image/users.svg" width="34" height="34" class="rounded-circle " alt="icon">
        </button>
      </router-link>


    </div>

    <div v-else-if="this.loggedIn === 'unknown'">
      <img src="/image/blank.svg" width="34" height="48" class="rounded-circle " alt="icon">&nbsp
    </div>


</nav>

  `,
};