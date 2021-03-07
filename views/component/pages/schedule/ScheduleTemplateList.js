export default {
    name: "ScheduleTemplateList",

    data()
    {
        return {
            schedules: [],
            selectedSchedule: null,
            selectedTitle: "",
            editInputDisabled: true,
            newScheduleTitle: "",
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


        async onClickNewSchedule()
        {
            // this.editInputDisabled = false;
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
                    // this.editInputDisabled = false;
                    await this.updateScheduleTemplateList();
                }
                else
                {
                    console.log(data);
                    this.errorAlert = "Error: " + data.errors[0].msg;
                    this.newScheduleTitle = "";
                    // this.editInputDisabled = false;
                    await this.updateScheduleTemplateList();
                }

            } else
            {
                this.$router.push("/user");
            }

        },

        async onClickSelectedSchedule(schedule)
        {
            this.selectedSchedule = schedule;
            this.selectedTitle = schedule.title;
            this.editInputDisabled = false;
            this.emitter.emit("setScheduleGoalSetter", schedule)
            // console.log(schedule);

        },


        async onClickDelete()
        {
            const token = localStorage.getItem("token");
            const _id = this.selectedSchedule._id;


            if (token)
            {
                let requestBody = {token: token, _id: _id};
                let requestUrl = "/api/scheduleTemplateDelete";
                let requestHeaders = {"Content-Type": "application/json"};

                const response = await fetch(requestUrl, {method: "POST", headers: requestHeaders, body: JSON.stringify(requestBody)});
                const data = await response.json();
                if ((data) && (!data.errors))
                {
                    // console.log("onClickDelete " + JSON.stringify(data));
                    this.selectedTitle = "";
                    this.editInputDisabled = true;
                    await this.updateScheduleTemplateList();
                    this.emitter.emit("setScheduleGoalSetter", null)
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


        async onClickUpdate()
        {
            // console.log("onClickUpdate");

            const token = localStorage.getItem("token");
            const _id = this.selectedSchedule._id;
            const title = this.selectedTitle;


            if (token)
            {
                let requestBody = {token: token, _id: _id, title: title};
                let requestUrl = "/api/scheduleTemplateUpdate";
                let requestHeaders = {"Content-Type": "application/json"};

                const response = await fetch(requestUrl, {method: "POST", headers: requestHeaders, body: JSON.stringify(requestBody)});
                const data = await response.json();
                if ((data) && (!data.errors))
                {
                    // console.log("onClickUpdate " + JSON.stringify(data));
                    this.selectedTitle = "";
                    this.editInputDisabled = true;
                    this.selectedSchedule = data;
                    await this.updateScheduleTemplateList();
                    this.emitter.emit("setScheduleGoalSetter", this.selectedSchedule)
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


    },


    async mounted()
    {
        await this.updateScheduleTemplateList();
        this.emitter.on("updateScheduleTemplateList", () => this.updateScheduleTemplateList());
    },




    template: `
      <div class="card text-white bg-primary">
      <div class="card-header"><i class="fas fa-clipboard-list"></i> Schedule Template List</div>
      <div class="card-body">


        <!----------- start of new schedule input box ---------------->


        <div class="form-group input-group">
          <div class="input-group-prepend">
            <span class="input-group-text"> <i class="fas fa-align-left"></i> </span>
            <button v-on:click="onClickNewSchedule" onclick="" class="btn btn-dark shadow" type="button"><i class="far fa-save"></i> Create Schedule</button>
          </div>

          <input v-model="newScheduleTitle" v-on:keyup.enter="onClickNewSchedule"  onsubmit="return false" class="form-control shadow"
                 placeholder="New Schedule Title" type="text">

        </div> <!-- form-group// -->

                
        <!----------- end of new schedule input box ---------------->

        
        
        
        
        
        <div class="divider my-4 bg-dark"></div>

        
        
        
        
        
        
        <!----------- start of schedule list scroll view  ---------------->

        <div data-simplebar data-simplebar-auto-hide="false" class="overflow-auto" style="max-height: 297px;">

          <ul class="list-group">
            <li v-for="schedule in schedules">

              <button  v-on:click="onClickSelectedSchedule(schedule)" :disabled="this.listDisabled" type="button"
                       class="list-group-item list-group-item-action bg-primary text-white border-dark shadow-lg rounded">

                <span class="alert primary  p-2"><span class="badge badge-secondary"> Created: </span> {{ new Date(schedule.date).toLocaleDateString("en-GB") }} </span>
                <span class="alert primary  p-2"><span class="badge badge-secondary"> Goals: </span> {{ schedule.goals.length }} </span>
                <span class="alert primary  p-2 font-weight-bold"><span class="badge badge-secondary"> Title: </span> {{ schedule.title }} </span>

              </button>
            
            </li>



          </ul>

        </div> <!-- scrollbar end -->


        <!----------- end of schedule list scroll view  ---------------->




        
        


        <div class="divider my-4 bg-dark"></div>








        <!----------- start of edit schedule box  ---------------->




        <div class="input-group">
          <input v-model="selectedTitle" v-on:keyup.enter="onClickUpdate" :disabled="this.editInputDisabled" type="text" class="form-control" placeholder="Selected Schedule">
          <div class="input-group-append">
            <button :disabled="this.editInputDisabled" v-on:click="onClickUpdate" class="btn btn-dark shadow" type="button"><i class="fas fa-cloud-upload-alt"></i> Update</button>
            <button :disabled="this.editInputDisabled" v-on:click="onClickDelete" class="btn btn-dark shadow" type="button"><i class="fas fa-trash-alt"></i> Delete</button>
          </div>
        </div>



        <!----------- end of edit schedule box  ---------------->



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