export default {
    name: "ScheduleTemplateList",

    data()
    {
        return {
            schedules: [],
            selectedSchedule: null,
            newScheduleTitle: "",
            newInputDisabled: false,
            listDisabled: false,
            errorAlert: "",
            successAlert: "",
        };
    },

    methods: {
        async updateScheduleTemplateList(event)
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
                    // console.log(data);
                    this.schedules = data;
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



        async onClickSelectedSchedule(schedule)
        {
            this.selectedSchedule = schedule;
            this.newInputDisabled = true;
            // this.selectedTitle = schedule.title;
            console.log(schedule);

        },


        async onClickNewSchedule()
        {
            this.newInputDisabled = true;
            this.errorAlert = "";

            const token = localStorage.getItem("token");
            if (token)
            {
                let requestBody = {token: token, title: this.newScheduleTitle};
                let requestUrl = "/api/scheduleTemplateCreate";
                let requestHeaders = {"Content-Type": "application/json"};

                const response = await fetch(requestUrl, {method: "POST", headers: requestHeaders, body: JSON.stringify(requestBody)});
                const data = await response.json();


                if ((data) && (!data.errors))
                {
                    // console.log(data);
                    this.selectedSchedule = data;
                    this.newScheduleTitle = "";
                    this.newInputDisabled = false;
                    await this.updateScheduleTemplateList();
                }
                else
                {
                    console.log(data);
                    this.errorAlert = "Error: " + data.errors[0].msg;
                    this.newScheduleTitle = "";
                    this.newInputDisabled = false;
                    await this.updateScheduleTemplateList();
                }

            } else
            {
                this.$router.push("/user");
            }

        },




    },


    async mounted()
    {
        await this.updateScheduleTemplateList();
    },




    template: `
      <div class="card text-white bg-primary">
      <div class="card-header"><i class="fas fa-clipboard-list"></i> Schedule Template List</div>
      <div class="card-body">





        <form v-on:submit.prevent>


          <div class="form-group input-group">
            <div class="input-group-prepend">
              <span class="input-group-text"> <i class="fas fa-align-left"></i> </span>
              <div class="input-group-append">

                <button v-on:click="onClickNewSchedule" :disabled="this.newInputDisabled" onclick="" class="btn btn-dark btn-block shadow-lg" type="button">New Schedule</button>

              </div>
              
            </div>

            <input v-model="newScheduleTitle" v-on:keyup.enter="onClickNewSchedule" :disabled="this.newInputDisabled"  onsubmit="return false" class="form-control shadow" placeholder="New Schedule Title" type="text">

          </div> <!-- form-group// -->


        </form>



        <div class="divider my-4 bg-dark"></div>



        <!--        end           -->
        
        
        
        
        
        
        
        
        
        
        
        <div data-simplebar data-simplebar-auto-hide="false" class="overflow-auto" style="max-height: 297px;">

          <ul class="list-group">

            <button v-for="schedule in schedules" v-on:click="onClickSelectedSchedule(schedule)" :disabled="this.listDisabled" type="button"
                    class="list-group-item list-group-item-action bg-primary text-white border-dark shadow-lg rounded">

              <span class="alert primary  p-2"><span class="badge badge-secondary"> Created: </span> {{ new Date(schedule.date).toLocaleDateString("en-GB") }} </span>
              <span class="alert primary  p-2"><span class="badge badge-secondary"> Goals: </span> {{ schedule.goals.length }} </span>
              <span class="alert primary  p-2 font-weight-bold"><span class="badge badge-secondary"> Title: </span> {{ schedule.title }} </span>

            </button>

          </ul>

        </div> <!-- scrollbar end -->





        <div class="divider my-4 bg-dark"></div>


        <div v-if="errorAlert" class="alert alert-danger" role="alert">
          {{ errorAlert }}
        </div>

        <div v-if="successAlert" class="alert alert-success" role="alert">
          {{ successAlert }}
        </div>





      </div>
      </div>
    `,
};