export default
{
    name: "UserLogin",

    data()
    {
        return {
            emailInput: "",
            passwordInput: "",
            errorAlert: "",
            successAlert: "",
            formDisabled: false
        }
    },




    methods: {
        async userCreateButtonOnClick(event)
        {
            this.formDisabled = true;

            let requestBody = {email: this.emailInput, password: this.passwordInput,};
            let requestUrl = "/api/userLoginTokenRead";
            let requestHeaders = {"Content-Type": "application/json"};

            const response = await fetch(requestUrl, {method: "POST", headers: requestHeaders, body: JSON.stringify(requestBody)});
            const data = await response.json();

            if(data.errors)
            {
                this.successAlert = "";
                this.errorAlert = data.errors[0].msg;
            }
            else if(data.token)
            {
                localStorage.setItem("token", data.token);

                this.errorAlert = "";
                this.successAlert = (this.emailInput + " successfully logged in")
                this.emailInput = "";
                this.passwordInput = "";
                this.emitter.emit("updateNav");
                this.$router.push("/");
            }
            else
            {
                console.log("Unexpected response");
                console.log(data);
            }
            this.formDisabled = false;

        },


    },





    template: `
    <div class="card text-white bg-primary">
        <div class="card-header"><i class="fas fa-sign-in-alt"></i> User Login</div>
        <div class="card-body">


        <form>


          <div class="form-group input-group">
            <div class="input-group-prepend">
              <span class="input-group-text"> <i class="fa fa-envelope"></i> </span>
            </div>
            <input v-model="emailInput" name="email" class="form-control" placeholder="Email address" type="email">
          </div> <!-- form-group// -->


          <div class="form-group input-group">
            <div class="input-group-prepend">
              <span class="input-group-text"> <i class="fa fa-lock"></i> </span>
            </div>
            <input v-model="passwordInput" v-on:keyup.enter="userCreateButtonOnClick" class="form-control" placeholder="Create password" type="password">
          </div> <!-- form-group// -->


          <div v-if="errorAlert" class="alert alert-danger" role="alert">
            {{ errorAlert }}
          </div>

          <div v-if="successAlert" class="alert alert-success" role="alert">
            {{ successAlert }}
          </div>


          <div class="form-group">
            <button v-on:click="userCreateButtonOnClick" :disabled="this.formDisabled" type="button" onclick="" class="btn btn-dark btn-block"> Login</button>
          </div> <!-- form-group// -->



        </form>
        </div>
    </div>
  `,
};