

export default {
    name: "CalendarAssignment",

    data()
    {
        return {
            schedules: [],
            scheduleTitle: "",
            selectedSchedule: "",
            selectedDateString: "",
            errorAlert: "",
            successAlert: "",
        };
    },

    methods:
    {
        async setupPicker()
        {
            let newDate;


            function setPickerDate(selectedDates, dateStr, instance)
            {
                let weekNumber = this.config.getWeek(this.selectedDates[0]);
                let newDate = new Date(this.selectedDates[0]).getTime();
                let momentDate = window.moment(newDate);
                let momentUtcDate = momentDate.utc(true);
                let momentUtcDateText = momentUtcDate.toISOString();

                window.momentUtcDateText = momentUtcDateText;

                // console.log(newDate);
                // console.log(momentDate);
                // console.log(momentUtcDate);
                // console.log(momentUtcDateText);
                // console.log(newDate);

            }

            const config =
                {
                    // plugins: [new weekSelect()],
                    altInput: true,
                    altFormat: "\\Week W \\S\\e\\l\\e\\c\\t\\e\\d",
                    dateFormat: "Z",
                    locale: {"firstDayOfWeek": 1 },
                    weekNumbers: true,

                    disable: [
                        function(date) {
                            // return true to disable
                            return (!(date.getDay() === 1));


                        }
                    ],


                    onChange: setPickerDate,


                };


            const datepicker = document.getElementById("datepicker");
            const fp = window.flatpickr(datepicker, config);  // flatpickr



        },

        async assignSchedule()
        {
            const token = localStorage.getItem("token");
            const schedule_id = this.selectedSchedule._id;
            const date = window.momentUtcDateText;

            this.successAlert = "";
            this.errorAlert = "";



            console.log(date);


            if(this.selectedSchedule === "")
            {
                this.errorAlert = "Schedule not selected";
                return;
            }

            if(typeof date === "undefined")
            {
                this.errorAlert = "date not selected";
                return;
            }

            if(date === "")
            {
                this.errorAlert = "date not selected4";
                return;
            }


            if (token)
            {
                let requestBody = {token: token, schedule_id: schedule_id, date: date.toString()};
                let requestUrl = "/api/assignmentCreate";
                let requestHeaders = {"Content-Type": "application/json"};

                const response = await fetch(requestUrl, {method: "POST", headers: requestHeaders, body: JSON.stringify(requestBody)});
                const data = await response.json();
                if ((data) && (!data.errors))
                {
                    // console.log(data);
                    this.successAlert = (this.selectedSchedule.title + " assigned to week starting " + date.substring(0, 10));

                }
                else
                {
                    // console.log(data);
                    this.errorAlert = "Error: " + data.errors[0].msg;
                }
            }
            else
            {
                this.$router.push("/user");
            }
        },

        async updateSchedules()
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

        onChangeSelector(event)
        {
            this.selectedSchedule = this.schedules.find(schedule => schedule.title === this.scheduleTitle);

            // console.log(event.target.value);
            // console.log(this.selectedSchedule)
            // console.log(this.scheduleTitle)

        },


    },


    async mounted()
    {
        await this.updateSchedules();
        await this.setupPicker();
        window.gobalDate = 0;
    },




    template: `
      <div class="card text-white bg-primary">
      <div class="card-header"><i class="far fa-calendar-alt"></i> Schedule Assignment</div>
      <div class="card-body">


        <!----------- start of assign schedule ---------------->
        <div class="form-group input-group">

          <div class="input-group-apppend">
            <button v-on:click="assignSchedule" onclick="" class="btn btn-dark shadow" type="button"><i class="fas fa-file-signature"></i> Assign Schedule</button>
          </div>

          <div class="input-group-prepend">

            <!----------- end of select schedule ---------------->
            <!----------- end of select schedule ---------------->



            <select v-model="scheduleTitle" @change="onChangeSelector($event)" class="custom-select" id="inputGroupSelect01">
              <option value="" selected disabled>Schedule Title</option>
              <option v-for="schedule in schedules">{{ schedule.title }}</option>
            </select>

            <!----------- end of select schedule ---------------->
            <!----------- end of select schedule ---------------->

          </div>


          <input type="date" id="datepicker" placeholder="Pick Week" autocomplete="off" class="form-control shadow"/>


        </div> <!-- form-group// -->


        <!----------- end of assign schedule ---------------->




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