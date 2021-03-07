export default {
    name: "ScheduleGoalSetter",

    data()
    {
        return {
            selectedSchedule: null,
            selectedScheduleTitle: "",

            newGoalType: "",
            newGoalNumber: null,

            errorAlert: "",
            successAlert: "",
        };
    },

    methods: {
        async updateScheduleGoalSetter(event)
        {
            const token = localStorage.getItem("token");


            if (token)
            {
                let requestBody = {token: token,};
                let requestUrl = "/api/scheduleTemplateUserAllRead";
                let requestHeaders = {"Content-Type": "application/json"};

                const response = await fetch(requestUrl, {method: "POST", headers: requestHeaders, body: JSON.stringify(requestBody)});
                const data = await response.json();
                if ((data) && (!data.errors))
                {
                    console.log(data);
                    // this.schedules = data;
                }
                else
                {
                    console.log(data);
                    this.errorAlert = "Error: " + data.errors[0].msg;
                }
            } else
            {
                this.$router.push("/user");
            }

        },


        async createGoal()
        {
            const token = localStorage.getItem("token");


            if (token)
            {
                let requestBody = {token: token,};
                let requestUrl = "/api/scheduleTemplateUserAllRead";
                let requestHeaders = {"Content-Type": "application/json"};

                const response = await fetch(requestUrl, {method: "POST", headers: requestHeaders, body: JSON.stringify(requestBody)});
                const data = await response.json();
                if ((data) && (!data.errors))
                {
                    console.log(data);
                    // this.schedules = data;
                }
                else
                {
                    console.log(data);
                    this.errorAlert = "Error: " + data.errors[0].msg;
                }
            } else
            {
                this.$router.push("/user");
            }
        }




    },


    async mounted()
    {
        // await this.updateScheduleGoalSetter();
    },




    template: `
      <div class="card text-white bg-primary">
      <div class="card-header"><i class="fas fa-crosshairs"></i> Schedule Goal Setter</div>
      <div class="card-body">




        <!----------- start of new goal  ---------------->
        <div class="form-group input-group">
          
          <div class="input-group-prepend">
            <button v-on:click="createGoal" onclick="" class="btn btn-dark shadow" type="button"><i class="far fa-save"></i> Create Goal</button>
          </div>
          
          <div class="input-group-prepend">
            <select  v-model="newGoalType" class="custom-select" id="inputGroupSelect01">
              <option value="" selected>Type...</option>
              <option value="running">Running (km)</option>
              <option value="walking">Walking (km)</option>
              <option value="swimming">Swimming (m)</option>
              <option value="weights">Weights (sets)</option>
              <option value="yoga">Yoga (hours)</option>
            </select>
          </div>
          
          <input v-model="newGoalNumber" v-on:keyup.enter="createGoal"  onsubmit="return false" class="form-control shadow"
                 placeholder="Number to achieve" type="number">

        </div> <!-- form-group// -->


        <!----------- end of new goal  ---------------->



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