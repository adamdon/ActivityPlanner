export default {
    name: "CalendarResults",

    data()
    {
        return {
            calendar: null,
            currentAssignmentDate: "None",
            currentAssignmentScheduleTitle: "None",
            currentAssignmentGoalNumber: "None",
            currentAssignmentAchievementNumber: "None",

        };
    },

    methods:
        {

            async fetchCalendar()
            {
                const token = localStorage.getItem("token");


                if (token)
                {
                    let requestBody = {token: token,};
                    let requestUrl = "/api/calendarRead";
                    let requestHeaders = {"Content-Type": "application/json"};

                    const response = await fetch(requestUrl, {method: "POST", headers: requestHeaders, body: JSON.stringify(requestBody)});
                    const data = await response.json();
                    if ((data) && (!data.errors))
                    {
                        // console.log(data);
                        this.calendar = data;
                        this.populateCalendar();

                    }
                    else
                    {
                        console.log(data);
                        this.$router.push("/user");

                        // this.errorAlert = "Error: " + data.errors[0].msg;
                    }
                } else
                {
                    this.$router.push("/user");
                }

            },


            populateCalendar()
            {
                let currentMondayStartDate = new Date();
                currentMondayStartDate.setHours(0,0,0,0)
                currentMondayStartDate.setDate(currentMondayStartDate.getDate() + 1 - (currentMondayStartDate.getDay() || 7));

                let sundayEndDate = new Date(currentMondayStartDate);
                sundayEndDate.setDate(sundayEndDate.getDate() + 7);
                sundayEndDate = new Date(sundayEndDate - 1);


                let lastMondayAssigment = this.calendar.assignments.find(assignment => assignment.date === currentMondayStartDate.toISOString());

                if(lastMondayAssigment)
                {
                    this.currentAssignmentDate = lastMondayAssigment.date.substring(0, 10);
                    this.currentAssignmentScheduleTitle = lastMondayAssigment.schedule.title;
                    this.currentAssignmentGoalNumber = lastMondayAssigment.schedule.goals.length;
                    this.currentAssignmentAchievementNumber = sundayEndDate;

                    let currentWeekAchievements  = this.calendar.achievements.filter(achievement =>
                    {

                        console.log("currentWeekAchievements");
                        console.log(currentMondayStartDate.toISOString())
                        console.log(sundayEndDate.toISOString())
                        console.log(achievement.date);
                        console.log("currentWeekAchievements");
                    })



                }


            },



        },




    async mounted()
    {
        await this.fetchCalendar();

    },




    template: `
      <div class="card text-white bg-primary">
      <div class="card-header"><i class="fas fa-poll-h"></i> Calendar Results</div>
      <div class="card-body">


        <!----------- content start ---------------->

        <table class="table table-sm table-hover table-dark table-bordered rounded">

          <thead>
            <tr>
              <th class="text-center" colspan="4">Current Assignment</th>
            </tr>

            <tr>
              <th scope="col">Week Starting</th>
              <th scope="col">Schedule Title</th>
              <th scope="col">Goals Number</th>
              <th scope="col">Achievement Number</th>
            </tr>
            
          </thead>
          
          <tbody>
            <tr>
              
              <td>{{ this.currentAssignmentDate }}</td>
              <td>{{ this.currentAssignmentScheduleTitle  }}</td>
              <td>{{ this.currentAssignmentGoalNumber }}</td>
              <td>{{ this.currentAssignmentAchievementNumber }}</td>

            </tr>
          </tbody>
          
        </table>

        <!----------- content end ---------------->



      </div>
      </div>
    `,
};