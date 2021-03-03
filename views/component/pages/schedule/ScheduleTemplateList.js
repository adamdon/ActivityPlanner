export default
{
    name: "ScheduleTemplateList",

    data()
    {
        return {
            data: false
        }
    },

    methods: {
        async updateScheduleTemplateList(event)
        {
            const token = localStorage.getItem("token")

            if(token)
            {
                // let requestBody = {token: token,};
                // let requestUrl = "/api/userDetailsRead";
                // let requestHeaders = {"Content-Type": "application/json"};
                //
                // const response = await fetch(requestUrl, {method: "POST", headers: requestHeaders, body: JSON.stringify(requestBody)});
                // const data = await response.json();
                // if(data)
                // {
                //     this.nameFirst = data.name.split(' ')[0];
                //     this.gravatarUrl = ("http:" + data.avatar);
                //     this.loggedIn = "yes";
                // }
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

          <div data-simplebar data-simplebar-auto-hide="false" class="overflow-auto" style="max-height: 270px;">
            <ul class="list-group ">
              <li class="list-group-item bg-secondary">Content</li>
              <li class="list-group-item bg-secondary">Content</li>
              <li class="list-group-item bg-secondary">Content</li>
              <li class="list-group-item bg-secondary">Content</li>
              <li class="list-group-item bg-secondary">Content</li>
              <li class="list-group-item bg-secondary">Content</li>
              <li class="list-group-item bg-secondary">Content</li>
              <li class="list-group-item bg-secondary">Content</li>
            </ul>
          </div>


          
        </div>
    </div>
  `,
};