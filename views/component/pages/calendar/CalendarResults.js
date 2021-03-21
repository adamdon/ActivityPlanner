export default {
    name: "CalendarResults",

    data()
    {
        return {
            calendar: null,
        };
    },

    methods:
        {

            async updateResults()
            {
                const token = localStorage.getItem("token");


                if (token)
                {
                    let requestBody = {token: token,};
                    let requestUrl = "/api/scheduleUserAllRead";
                    let requestHeaders = {"Content-Type": "application/json"};

                    const response = await fetch(requestUrl, {method: "POST", headers: requestHeaders, body: JSON.stringify(requestBody)});
                    const data = await response.json();
                    if ((data) && (!data.errors))
                    {
                        // console.log(data);
                        this.calendar = data;
                        // this.schedules = data;
                    } else
                    {
                        console.log(data);
                        // this.errorAlert = "Error: " + data.errors[0].msg;
                    }
                } else
                {
                    this.$router.push("/user");
                }


            },



        },




    async mounted()
    {
        await this.updateResults();

    },




    template: `
      <div class="card text-white bg-primary">
          <div class="card-header"><i class="fas fa-poll-h"></i> Calendar Results</div>
          <div class="card-body">


            <!----------- content start ---------------->
            
            test

            <!----------- content end ---------------->



          </div>
      </div>
    `,
};