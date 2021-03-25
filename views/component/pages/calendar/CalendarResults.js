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

            tableDataFull: [["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""], ["", "", "", "", "", "", ""]],
            goalDataFull: [],




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


                    //Sort dates by ascending so new cells are added to last row
                    currentWeekAchievements.sort((a, b) => (new Date(a.inputDate)) - (new Date(b.inputDate)) )





                    //get achievements for each day of the week
                    let currentMonAchievements = currentWeekAchievements.filter(achievement => new Date(achievement.date).getTime() === currentMonDate.getTime());
                    let currentTueAchievements = currentWeekAchievements.filter(achievement => new Date(achievement.date).getTime() === currentTueDate.getTime());
                    let currentWedAchievements = currentWeekAchievements.filter(achievement => new Date(achievement.date).getTime() === currentWedDate.getTime());
                    let currentThuAchievements = currentWeekAchievements.filter(achievement => new Date(achievement.date).getTime() === currentThuDate.getTime());
                    let currentFriAchievements = currentWeekAchievements.filter(achievement => new Date(achievement.date).getTime() === currentFriDate.getTime());
                    let currentSatAchievements = currentWeekAchievements.filter(achievement => new Date(achievement.date).getTime() === currentSatDate.getTime());
                    let currentSunAchievements = currentWeekAchievements.filter(achievement => new Date(achievement.date).getTime() === currentSunDate.getTime());




                    //Create an week array containing all day arrays
                    let weekAchievements = [currentMonAchievements, currentTueAchievements, currentWedAchievements, currentThuAchievements, currentFriAchievements, currentSatAchievements, currentSunAchievements];


                    //get max amount of table rows from the longest dayAchievements in week
                    let tableMaxRows = 0;
                    for (let dayAchievements of weekAchievements)
                    {
                        if(dayAchievements.length > tableMaxRows)
                        {
                            tableMaxRows = dayAchievements.length;
                        }
                    }



                    //Convert weekAchievements into table formatted tableDataFull with Rows and Cells
                    let tableDataFull = [];
                    for(let rowIndex = 0; rowIndex < tableMaxRows; rowIndex++)
                    {
                        //create row to the max amount and fill unneeded with blanks
                        let tableDataRow = [];

                        for(let dayAchievements of weekAchievements)
                        {
                            let tableDataCell = {text: "", typeIconClass: ""};

                            if(dayAchievements[rowIndex])
                            {

                                //set data cell content
                                if(dayAchievements[rowIndex].type === "running")
                                {
                                    tableDataCell.text = "Running " + dayAchievements[rowIndex].achieved + "km";
                                    tableDataCell.typeIconClass = "fas fa-running";
                                }
                                else if(dayAchievements[rowIndex].type === "walking")
                                {
                                    tableDataCell.text = "Walking " + dayAchievements[rowIndex].achieved + "km";
                                    tableDataCell.typeIconClass = "fas fa-hiking";
                                }
                                else if(dayAchievements[rowIndex].type === "swimming")
                                {
                                    tableDataCell.text = "Swimming " + dayAchievements[rowIndex].achieved + "m";
                                    tableDataCell.typeIconClass = "fas fa-swimmer";
                                }
                                else if(dayAchievements[rowIndex].type === "weights")
                                {
                                    tableDataCell.text = "Weights " + dayAchievements[rowIndex].achieved + " sets";
                                    tableDataCell.typeIconClass = "fas fa-dumbbell";
                                }
                                else if(dayAchievements[rowIndex].type === "yoga")
                                {
                                    tableDataCell.text = "Yoga " + dayAchievements[rowIndex].achieved + " hours";
                                    tableDataCell.typeIconClass = "fas fa-pray";
                                }
                                else
                                {
                                    tableDataCell.text = (dayAchievements[rowIndex].type + " " + dayAchievements[rowIndex].achieved)
                                    tableDataCell.typeIconClass = "";
                                }

                            }
                            else
                            {
                                tableDataCell.text = " ";
                                tableDataCell.typeIconClass = "";
                            }

                            tableDataRow.push(tableDataCell);
                        }

                        tableDataFull.push(tableDataRow);
                    }
                    this.tableDataFull = tableDataFull;



                    //Format Goals Table
                    let goalDataFull = [];

                    for(let goal of lastMondayAssigment.schedule.goals)
                    {
                        let goalRow = {type: "", typeIconClass: "", target: 0, achieved: 0, progress: 0, progressClass: "bg-info", complete: false}

                        let goalTypeAchievements = currentWeekAchievements.filter(achievement => achievement.type === goal.type);

                        if(!(goalTypeAchievements.length === 0)) //if achievements for this goal are logged
                        {

                            let type = goal.type;
                            let target = goal.target;
                            let achieved = goalTypeAchievements.reduce((a, b) => a + b.achieved, 0);

                            let progress = Math.round((achieved / target) * 100)
                            if(progress > 100)
                            {
                                progress = 100;
                            }

                            let progressClass = "bg-info";

                            let complete = false;
                            if(progress === 100)
                            {
                                complete = true;
                                progressClass = "bg-success";
                            }

                            goalRow.type = type;
                            goalRow.target = target;
                            goalRow.achieved = achieved;
                            goalRow.progress = progress;
                            goalRow.progressClass = progressClass;
                            goalRow.complete = complete;

                        }
                        else //if this goal has no logged achievements
                        {
                            goalRow = {type: goal.type, typeIconClass: "", target: goal.target, achieved: 0, progress: 0, progressClass: "bg-info", complete: false}
                        }


                        //set typeIconClass
                        if(goal.type === "running")
                        {
                            goalRow.typeIconClass = "fas fa-running";
                        }
                        else if(goal.type === "walking")
                        {
                            goalRow.typeIconClass = "fas fa-hiking";
                        }
                        else if(goal.type === "swimming")
                        {
                            goalRow.typeIconClass = "fas fa-swimmer";
                        }
                        else if(goal.type === "weights")
                        {
                            goalRow.typeIconClass = "fas fa-dumbbell";
                        }
                        else if(goal.type === "yoga")
                        {
                            goalRow.typeIconClass = "fas fa-pray";
                        }
                        else
                        {
                            goalRow.typeIconClass = "";
                        }

                        goalDataFull.push(goalRow);
                    }
                    this.goalDataFull = goalDataFull;

                    // console.log(goalDataFull);




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
                else
                {
                    this.currentAssignmentDate = "None";
                    this.currentAssignmentScheduleTitle = "";
                    this.currentAssignmentGoalNumber = "";
                    this.currentAssignmentAchievementNumber = "";
                    // this.tableDataFull = [];


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

        
        <!----------- week table start ---------------->


        <div class="table-responsive">

          <table class="table table-sm table-hover table-dark borderless rounded">

            <thead>
              <tr class="table-active">
                <th class="text-center" colspan="4">Current Assignment</th>
              </tr>

              <tr class="table-active">
                <th scope="col">Schedule Title</th>
                <th scope="col">Week Starting</th>
                <th scope="col">Goals Number</th>
                <th scope="col">Achievement Number</th>
              </tr>

            </thead>

            <tbody>
              <tr>
                
                <td>{{ this.currentAssignmentScheduleTitle }}</td>
                <td>{{ this.currentAssignmentDate }}</td>
                <td>{{ this.currentAssignmentGoalNumber }}</td>
                <td>{{ this.currentAssignmentAchievementNumber }}</td>

              </tr>
            </tbody>

          </table>
        
        </div>
        


        <!----------- week table start ---------------->




        <!----------- Goal Progress table start ---------------->

        <div class="table-responsive">

          <table class="table table-sm table-hover table-dark borderless rounded">

            <thead>
              <tr class="table-active">
                <th class="text-center" colspan="4">Goal Progress</th>
              </tr>

              <tr class="table-active">
                <th scope="col">Type</th>
                <th scope="col">Target</th>
                <th scope="col">Achieved</th>
                <th scope="col">Progress</th>
                <!--              <th scope="col">Complete</th>-->

              </tr>

            </thead>

            <tbody>

              <tr v-for="goalRow in goalDataFull">
                <td><i :class="goalRow.typeIconClass"></i> {{ goalRow.type.charAt(0).toUpperCase() + goalRow.type.slice(1)  }}</td>
                <td>{{ goalRow.target }}</td>
                <td>{{ goalRow.achieved }}</td>
                <td :width="800">
                  <div class="progress">
                    <div :class="goalRow.progressClass" class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"  :style="{width: goalRow.progress + '%'}"> {{goalRow.progress + "%"}}</div>
                  </div>
                </td>
                <!--              <td>{{ goalRow.complete }}</td>            -->
              </tr>


            </tbody>

          </table>
          
        </div>
        
        <!----------- Goal Progress end start ---------------->



        <!----------- current table start ---------------->
        <div class="table-responsive">

          <table class="table table-sm table-hover table-dark borderless rounded">

            <thead>
              <tr class="table-active">
                <th class="text-center" colspan="7">Weekly Achievements</th>
              </tr>

              <tr class="table-active">
                <th scope="col" class="text-center" >Monday</th>
                <th scope="col" class="text-center" >Tuesday</th>
                <th scope="col" class="text-center" >Wednesday</th>
                <th scope="col" class="text-center" >Thursday</th>
                <th scope="col" class="text-center" >Friday</th>
                <th scope="col" class="text-center" >Saturday</th>
                <th scope="col" class="text-center" >Sunday</th>
              </tr>

              <tr class="table-active">
                <th scope="col" class="text-center" >{{ this.currentMonDateText }}</th>
                <th scope="col" class="text-center" >{{ this.currentTueDateText }}</th>
                <th scope="col" class="text-center" >{{ this.currentWedDateText }}</th>
                <th scope="col" class="text-center" >{{ this.currentThuDateText }}</th>
                <th scope="col" class="text-center" >{{ this.currentFriDateText }}</th>
                <th scope="col" class="text-center" >{{ this.currentSatDateText }}</th>
                <th scope="col" class="text-center" >{{ this.currentSunDateText }}</th>
              </tr>

            </thead>

            <tbody>

              <tr v-for="tableDataRow in tableDataFull">
                <td v-for="tableDataCell in tableDataRow" class="text-center"> <i :class="tableDataCell.typeIconClass"></i> {{ tableDataCell.text}}</td>
              </tr>

            </tbody>

          </table>

        </div>
        <!----------- current table end ---------------->
        
        


      </div>
      </div>
    `,
};