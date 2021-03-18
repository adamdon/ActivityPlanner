export default {
    name: "ScheduleGoalSetter",

    data()
    {
        return {
            selectedSchedule: null,
            selectedScheduleTitle: "",

            newGoalType: "",
            newGoalNumber: null,

            goals: [],

            errorAlert: "",
            successAlert: "",
        };
    },

    methods: {
        async updateScheduleGoalSetterList()
        {
            const token = localStorage.getItem("token");
            const schedule_id = this.selectedSchedule._id;

            if (token)
            {
                let requestBody = {token: token, schedule_id: schedule_id};
                let requestUrl = "/api/goalScheduleAllRead";
                let requestHeaders = {"Content-Type": "application/json"};

                const response = await fetch(requestUrl, {method: "POST", headers: requestHeaders, body: JSON.stringify(requestBody)});
                const data = await response.json();
                if ((data) && (!data.errors))
                {
                    this.goals = data;
                }
                else
                {
                    console.log(data);
                    this.errorAlert = "Error: " + data.errors[0].msg;
                }
            }else
            {
                this.$router.push("/user");
            }

        },

        async setScheduleGoalSetter(selectedSchedule)
        {
            if(selectedSchedule)
            {
                this.selectedSchedule = selectedSchedule;
                this.selectedScheduleTitle = selectedSchedule.title;
                await this.updateScheduleGoalSetterList();
            }
            else
            {
                this.selectedSchedule = null;
                this.selectedScheduleTitle = "";
                this.goals = [];
            }

        },


        async createGoal()
        {
            const token = localStorage.getItem("token");
            const schedule_id = this.selectedSchedule._id;
            const type = this.newGoalType;
            const target = this.newGoalNumber;


            if (token)
            {
                let requestBody = {token: token, schedule_id: schedule_id, type: type, target: target};
                let requestUrl = "/api/goalCreate";
                let requestHeaders = {"Content-Type": "application/json"};

                const response = await fetch(requestUrl, {method: "POST", headers: requestHeaders, body: JSON.stringify(requestBody)});
                const data = await response.json();
                if ((data) && (!data.errors))
                {
                    this.successAlert = "Goal created successfully"
                    this.errorAlert = "";
                    await this.updateScheduleGoalSetterList();
                    this.emitter.emit("updateScheduleTemplateList");
                }
                else
                {

                    this.successAlert = "";
                    this.errorAlert = "Error: " + data.errors[0].msg;
                }
            } else
            {
                this.$router.push("/user");
            }
        },



        async deleteGoal(goal)
        {
            const token = localStorage.getItem("token");
            const schedule_id = this.selectedSchedule._id;
            const goal_id = goal._id;

            console.log(goal);

            if (token)
            {
                let requestBody = {token: token, schedule_id: schedule_id, goal_id: goal_id};
                let requestUrl = "/api/goalDelete";
                let requestHeaders = {"Content-Type": "application/json"};

                const response = await fetch(requestUrl, {method: "POST", headers: requestHeaders, body: JSON.stringify(requestBody)});
                const data = await response.json();
                if ((data) && (!data.errors))
                {
                    this.successAlert = "Goal deleted successfully"
                    this.errorAlert = "";
                    await this.updateScheduleGoalSetterList();
                    this.emitter.emit("updateScheduleTemplateList");
                }
                else
                {

                    this.successAlert = "";
                    this.errorAlert = "Error: " + data.errors[0].msg;
                }
            } else
            {
                this.$router.push("/user");
            }
        },

    },


    async mounted()
    {
        this.emitter.on("setScheduleGoalSetter", (schedule) => this.setScheduleGoalSetter(schedule));
        // await this.updateScheduleGoalSetterList();
    },




    template: `
      <div class="card text-white bg-primary">
      <div class="card-header"><i class="fas fa-crosshairs"></i> Schedule Goal Setter</div>
      <div class="card-body">



        <!----------- Selected Schedule start  ---------------->

        <div class="alert alert-primary" role="alert">
          <span class="alert dark  p-2 font-weight-bold"><span class="badge badge-secondary"> Title: </span> {{ selectedScheduleTitle }} </span>
        </div>
        <!----------- Selected Schedule end  ---------------->






        <div class="divider my-4 bg-dark"></div>


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



        
        
        
        


        <!----------- start of goal list scroll view  ---------------->

        <div data-simplebar data-simplebar-auto-hide="false" class="overflow-auto" style="max-height: 297px;">

          <ul class="list-group">
            <li v-for="goal in goals">

              <button  v-on:click=""  type="button"
                       class="list-group-item list-group-item-action bg-primary text-white border-dark shadow-lg rounded">
                <span class="alert primary  p-2"> <button v-on:click="deleteGoal(goal)" type="button" class="bg-dark text-white border-dark shadow-lg rounded"><i class="fas fa-trash-alt"></i></button> </span>
                <span class="alert primary  p-2"><span class="badge badge-secondary"> Target: </span> {{ goal.target.toLocaleString('en-US', {minimumIntegerDigits: 4, useGrouping: false} ) }} </span>
                <span class="alert primary  p-2"><span class="badge badge-secondary"> Type: </span> {{ goal.type }} </span>
              </button>

            </li>



          </ul>

        </div> <!-- scrollbar end -->


        <!----------- end of goal list scroll view  ---------------->
        
        
        
        
        
        
        
        
        
        
        
        

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