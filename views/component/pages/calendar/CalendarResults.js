export default {
    name: "CalendarResults",

    data()
    {
        return {
            calendar: null,

            currentAssignmentDate: "None",
            currentAssignmentScheduleTitle: "",
            currentAssignmentGoalNumber: "",
            currentAssignmentAchievementNumber: "",

            currentMonDateText: "",
            currentTueDateText: "",
            currentWedDateText: "",
            currentThuDateText: "",
            currentFriDateText: "",
            currentSatDateText: "",
            currentSunDateText: "",



        };
    },

    methods:
        {

            async fetchCalendar()
            {
                this.calendar = null;
                this.currentAssignmentDate = "None";
                this.currentAssignmentScheduleTitle = "";
                this.currentAssignmentGoalNumber = "";
                this.currentAssignmentAchievementNumber = "";


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

                    } else
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
                //Get first day of current week
                let currentMondayStartDate = new Date();
                currentMondayStartDate.setHours(0, 0, 0, 0);
                currentMondayStartDate.setDate(currentMondayStartDate.getDate() + 1 - (currentMondayStartDate.getDay() || 7));

                //get last day of current week
                let sundayEndDate = new Date(currentMondayStartDate);
                sundayEndDate.setDate(sundayEndDate.getDate() + 7);
                sundayEndDate = new Date(sundayEndDate - 1);

                //Check to see if there is an Assigment set for this week
                let lastMondayAssigment = this.calendar.assignments.find(assignment => assignment.date === currentMondayStartDate.toISOString());

                if (lastMondayAssigment)
                {

                    //get dates for days of week
                    let currentMonDate = new Date(currentMondayStartDate);
                    currentMonDate.setDate(currentMondayStartDate.getDate() + 0);

                    let currentTueDate = new Date(currentMondayStartDate);
                    currentTueDate.setDate(currentMondayStartDate.getDate() + 1);

                    let currentWedDate = new Date(currentMondayStartDate);
                    currentWedDate.setDate(currentMondayStartDate.getDate() + 2);

                    let currentThuDate = new Date(currentMondayStartDate);
                    currentThuDate.setDate(currentMondayStartDate.getDate() + 3);

                    let currentFriDate = new Date(currentMondayStartDate);
                    currentFriDate.setDate(currentMondayStartDate.getDate() + 4);

                    let currentSatDate = new Date(currentMondayStartDate);
                    currentSatDate.setDate(currentMondayStartDate.getDate() + 5);

                    let currentSunDate = new Date(currentMondayStartDate);
                    currentSunDate.setDate(currentMondayStartDate.getDate() + 6);



                    //Get Achievements that take place for this week only
                    let currentWeekAchievements = this.calendar.achievements.filter(achievement => ((new Date(achievement.date).getTime()) >= currentMondayStartDate.getTime()) && ((new Date(achievement.date).getTime()) < sundayEndDate.getTime()));


                    //get achievements for each day of the week
                    let currentMonAchievements = currentWeekAchievements.filter(achievement => new Date(achievement.date).getTime() === currentMonDate.getTime());
                    let currentTueAchievements = currentWeekAchievements.filter(achievement => new Date(achievement.date).getTime() === currentTueDate.getTime());
                    let currentWedAchievements = currentWeekAchievements.filter(achievement => new Date(achievement.date).getTime() === currentWedDate.getTime());
                    let currentThuAchievements = currentWeekAchievements.filter(achievement => new Date(achievement.date).getTime() === currentThuDate.getTime());
                    let currentFriAchievements = currentWeekAchievements.filter(achievement => new Date(achievement.date).getTime() === currentFriDate.getTime());
                    let currentSatAchievements = currentWeekAchievements.filter(achievement => new Date(achievement.date).getTime() === currentSatDate.getTime());
                    let currentSunAchievements = currentWeekAchievements.filter(achievement => new Date(achievement.date).getTime() === currentSunDate.getTime());



                    console.log(currentMonAchievements);
                    console.log(currentTueAchievements);
                    console.log(currentWedAchievements);
                    console.log(currentThuAchievements);
                    console.log(currentFriAchievements);
                    console.log(currentSatAchievements);
                    console.log(currentSunAchievements);






                    //Set vars for UI component
                    this.currentMonDateText = currentMonDate.toISOString().substring(0, 10);
                    this.currentTueDateText = currentTueDate.toISOString().substring(0, 10);
                    this.currentWedDateText = currentWedDate.toISOString().substring(0, 10);
                    this.currentThuDateText = currentThuDate.toISOString().substring(0, 10);
                    this.currentFriDateText = currentFriDate.toISOString().substring(0, 10);
                    this.currentSatDateText = currentSatDate.toISOString().substring(0, 10);
                    this.currentSunDateText = currentSunDate.toISOString().substring(0, 10);


                    this.currentAssignmentDate = lastMondayAssigment.date.substring(0, 10);
                    this.currentAssignmentScheduleTitle = lastMondayAssigment.schedule.title;
                    this.currentAssignmentGoalNumber = lastMondayAssigment.schedule.goals.length;
                    this.currentAssignmentAchievementNumber = sundayEndDate;






                    this.currentAssignmentAchievementNumber = currentWeekAchievements.length;



                }


            },



        },




    async mounted()
    {
        await this.fetchCalendar();
        this.emitter.on("fetchCalendar", () => this.fetchCalendar());

    },




    template: `
      <div class="card text-white bg-primary">
      <div class="card-header"><i class="fas fa-poll-h"></i> Calendar Results</div>
      <div class="card-body">


        <!----------- current table start ---------------->
        <div class="table-responsive">

          <table class="table table-sm table-hover table-dark table-bordered rounded">

            <thead>
              <tr>
                <th class="text-center" colspan="7">Weekly Achievements</th>
              </tr>

              <tr>
                <th scope="col">Monday</th>
                <th scope="col">Tuesday</th>
                <th scope="col">Wednesday</th>
                <th scope="col">Thursday</th>
                <th scope="col">Friday</th>
                <th scope="col">Saturday</th>
                <th scope="col">Sunday</th>
              </tr>

              <tr>
                <th scope="col">{{ this.currentMonDateText }}</th>
                <th scope="col">{{ this.currentTueDateText }}</th>
                <th scope="col">{{ this.currentWedDateText }}</th>
                <th scope="col">{{ this.currentThuDateText }}</th>
                <th scope="col">{{ this.currentFriDateText }}</th>
                <th scope="col">{{ this.currentSatDateText }}</th>
                <th scope="col">{{ this.currentSunDateText }}</th>
              </tr>

            </thead>

            <tbody>
              <tr>

                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>

              </tr>
            </tbody>

          </table>

        </div>
        <!----------- current table end ---------------->




        <!----------- week table start ---------------->

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
              <td>{{ this.currentAssignmentScheduleTitle }}</td>
              <td>{{ this.currentAssignmentGoalNumber }}</td>
              <td>{{ this.currentAssignmentAchievementNumber }}</td>

            </tr>
          </tbody>

        </table>

        <!----------- week table start ---------------->



      </div>
      </div>
    `,
};