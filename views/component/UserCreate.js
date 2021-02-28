export default {
    name: "UserCreate",


    data()
    {
        return {
            nameInput: "",
            emailInput: "",
            password1Input: "",
            password2Input: "",
            errorAlert: "",
            successAlert: "",
            formDisabled: false
        }
    },

    // data:
    // {
    //     nameInput: "",
    //     emailInput: "",
    //     password1Input: "",
    //     password2Input: "",
    //     errorAlert: "",
    //     successAlert: "",
    //     formDisabled: false
    // },


    methods: {
        async userCreateButtonOnClick(event)
        {
            this.formDisabled = true;

            //client-side validation
            if(this.password1Input !== this.password2Input)
            {
                this.errorAlert = "Passwords do not match"
            }
            else
            {
                let requestBody = {name: this.nameInput, email: this.emailInput, password: this.password1Input,};
                let requestUrl = "/api/userCreate";
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
                    this.successAlert = (this.emailInput + " successfully registered")
                    this.nameInput = "";
                    this.emailInput = "";
                    this.password1Input = "";
                    this.password2Input = "";
                    this.emitter.emit("updateNav");
                    this.$router.push("/");
                }
                else
                {
                    console.log("Unexpected response");
                    console.log(data);
                }
            }
            this.formDisabled = false;
        }
    },


    template: `
      <div class="card text-white bg-primary">
      <div class="card-header"><i class="fas fa-user-plus"></i> Create User</div>
      <div class="card-body">

        <form>

          <div class="form-group input-group">
            <div class="input-group-prepend">
              <span class="input-group-text"> <i class="fa fa-user"></i> </span>
            </div>
            <input v-model="nameInput" name="name" class="form-control" placeholder="Full name" type="text">
          </div> <!-- form-group// -->


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
            <input v-model="password1Input" class="form-control" placeholder="Create password" type="password">
          </div> <!-- form-group// -->


          <div class="form-group input-group">
            <div class="input-group-prepend">
              <span class="input-group-text"> <i class="fa fa-lock"></i> </span>
            </div>
            <input v-model="password2Input" v-on:keyup.enter="userCreateButtonOnClick" class="form-control" placeholder="Repeat password" type="password">
          </div> <!-- form-group// -->


          <div v-if="errorAlert" class="alert alert-danger" role="alert">
            {{ errorAlert }}
          </div>

          <div v-if="successAlert" class="alert alert-success" role="alert">
            {{ successAlert }}
          </div>


          <div class="form-group">
            <button v-on:click="userCreateButtonOnClick" :disabled="this.formDisabled" type="button" onclick="" class="btn btn-dark btn-block"> Create User</button>
          </div> <!-- form-group// -->



        </form>
      </div>
      </div>
    `,
};