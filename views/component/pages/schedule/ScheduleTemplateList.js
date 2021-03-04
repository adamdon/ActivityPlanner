export default
{
    name: "ScheduleTemplateList",

    data()
    {
        return {
            schedules: [],
        }
    },

    methods: {
        async updateScheduleTemplateList(event)
        {
            const token = localStorage.getItem("token")


            if(token)
            {
                let requestBody = {token: token,};
                let requestUrl = "/api/scheduleTemplateUserAllRead";
                let requestHeaders = {"Content-Type": "application/json"};

                const response = await fetch(requestUrl, {method: "POST", headers: requestHeaders, body: JSON.stringify(requestBody)});
                const data = await response.json();
                if(data)
                {
                    console.log(data);
                    this.schedules = data;
                }
            }
            else
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

          <div data-simplebar data-simplebar-auto-hide="false" class="overflow-auto" style="max-height: 470px;">
            
            <ul class="list-group ">
              <button v-for="schedule in schedules" type="button" class="list-group-item list-group-item-action bg-primary text-white border-white tex">
                <h6><span class="badge badge-secondary">Title: </span> {{ schedule.title }} </h6>
                <h6><span class="badge badge-secondary">Goals: </span> {{ schedule.goals.length }} </h6>
                <h6><span class="badge badge-secondary">Created: </span> {{ new Date(schedule.date).toLocaleDateString("en-GB") }} </h6>
              </button>
            </ul>
          </div>


          
        </div>
    </div>
  `,
};