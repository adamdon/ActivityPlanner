export default {
    name: "CalendarAchievement",

    data()
    {
        return {

            assignmentWeek: ("No assignment in place for this week"),
            achievements: "",
            newAchievementType: "",
            newAchievementNumber: "",
            errorAlert: "",
            successAlert: "",
            isDisabled: false,
        };
    },

    methods:
        {

            async updateAchievements()
            {
                const token = localStorage.getItem("token");

                if (token)
                {
                    let requestBody = {token: token,};
                    let requestUrl = "/api/achievementAllRead";
                    let requestHeaders = {"Content-Type": "application/json"};

                    const response = await fetch(requestUrl, {method: "POST", headers: requestHeaders, body: JSON.stringify(requestBody)});
                    const data = await response.json();
                    if ((data) && (!data.errors))
                    {
                        // console.log(data);
                        this.achievements = data;
                        this.emitter.emit("fetchCalendar");
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


            async createAchievement()
            {
                this.isDisabled = true;

                const token = localStorage.getItem("token");
                const achieved = this.newAchievementNumber;
                const type = this.newAchievementType;
                let date = window.achievementUtcDateText;

                this.successAlert = "";
                this.errorAlert = "";


                if(typeof date === "undefined")
                {
                    let newDate = new Date();
                    let newDateZeroTime = newDate.setHours(0,0,0,0);
                    let momentDate = window.moment(newDateZeroTime);
                    let momentUtcDate = momentDate.utc(true);
                    let achievementUtcDateText = momentUtcDate.toISOString();

                    window.achievementUtcDateText = achievementUtcDateText;
                    date = window.achievementUtcDateText;
                }

                if(this.newAchievementNumber === "")
                {
                    this.errorAlert = "Achievement amount not entered";
                    this.isDisabled = false;
                    return;
                }

                if(this.newAchievementNumber === "")
                {
                    this.errorAlert = "Achievement amount not entered";
                    this.isDisabled = false;
                    return;
                }


                if(date === "")
                {
                    this.errorAlert = "date not selected";
                    this.isDisabled = false;
                    return;
                }


                if (token)
                {
                    let requestBody = {token: token, date: date.toString(), type: type, achieved: achieved};
                    let requestUrl = "/api/achievementCreate";
                    let requestHeaders = {"Content-Type": "application/json"};

                    const response = await fetch(requestUrl, {method: "POST", headers: requestHeaders, body: JSON.stringify(requestBody)});
                    const data = await response.json();
                    if ((data) && (!data.errors))
                    {
                        this.isDisabled = false;
                        this.successAlert = (" Saved Achievement of " + type + " for " + achieved);
                        await this.updateAchievements();
                    }
                    else
                    {
                        this.isDisabled = false;
                        // console.log(data);
                        this.errorAlert = "Error: " + data.errors[0].msg;
                    }
                }
                else
                {
                    this.$router.push("/user");
                }
            },




            async deleteAchievement(achievement)
            {
                this.isDisabled = true;

                const token = localStorage.getItem("token");
                const achievement_id = achievement._id;


                if (token)
                {
                    let requestBody = {token: token, achievement_id: achievement_id};
                    let requestUrl = "/api/achievementDelete";
                    let requestHeaders = {"Content-Type": "application/json"};

                    const response = await fetch(requestUrl, {method: "POST", headers: requestHeaders, body: JSON.stringify(requestBody)});
                    const data = await response.json();
                    if ((data) && (!data.errors))
                    {
                        // console.log(data);
                        this.isDisabled = false;
                        await this.updateAchievements();
                    }
                    else
                    {
                        this.isDisabled = false;
                        console.log(requestBody);
                        this.errorAlert = "Error: " + data.errors[0].msg;
                    }
                } else
                {
                    this.$router.push("/user");
                }
            },

            async setupPicker()
            {

                const config =
                    {
                        // plugins: [new weekSelect()],
                        altInput: true,
                        altFormat: "d-m-Y",
                        dateFormat: "Z",
                        locale: {"firstDayOfWeek": 1},
                        weekNumbers: true,
                        defaultDate: [new Date()],
                        // onChange: setPickerDate,
                        onChange: function (selectedDates, dateStr, instance)
                        {
                            let newDate = new Date(this.selectedDates[0]).getTime();
                            let momentDate = window.moment(newDate);
                            let momentUtcDate = momentDate.utc(true);
                            let achievementUtcDateText = momentUtcDate.toISOString();

                            window.achievementUtcDateText = achievementUtcDateText;
                        },
                    };


                const achievementDatepicker = document.getElementById("achievementDatepicker");
                const fp = window.flatpickr(achievementDatepicker, config);  // flatpickr
            }, //setupPicker end



        },//Methods end


    async mounted()
    {
        await this.updateAchievements();
        await this.setupPicker();
    },




    template: `
      <div class="card text-white bg-primary">
          <div class="card-header"><i class="fas fa-star"></i> Record Achievement</div>
          <div class="card-body">
            


            <!----------- start of new goal  ---------------->
            <div class="form-group input-group">

              <div class="input-group-prepend">
                <button v-bind:disabled="isDisabled" v-on:click="createAchievement" onclick="" class="btn btn-dark shadow" type="button"><i class="far fa-save"></i> Set Achievement</button>
              </div>

              <div class="input-group-prepend">
                <select v-bind:disabled="isDisabled" v-model="newAchievementType" class="custom-select" id="inputGroupSelect01">
                  <option value="" selected disabled>Type...</option>
                  <option value="running">Running (km)</option>
                  <option value="walking">Walking (km)</option>
                  <option value="swimming">Swimming (m)</option>
                  <option value="weights">Weights (sets)</option>
                  <option value="yoga">Yoga (hours)</option>
                </select>
              </div>

              <input v-bind:disabled="isDisabled" v-model="newAchievementNumber" v-on:keyup.enter="createAchievement"  onsubmit="return false" class="form-control shadow"
                     placeholder="Amount" type="number">

              <input v-bind:disabled="isDisabled" type="date" id="achievementDatepicker" placeholder="Date" autocomplete="off" class="form-control shadow"/>


            </div> <!-- form-group// -->


            <!----------- end of new goal  ---------------->




            <div class="divider my-4 bg-dark"></div>









            <!----------- start of goal list scroll view  ---------------->

            <div data-simplebar data-simplebar-auto-hide="false" class="overflow-auto" style="max-height: 297px;">

              <ul class="list-group">
                <li v-for="achievement in achievements">

                  <button v-bind:disabled="isDisabled"  v-on:click=""  type="button"
                           class="list-group-item list-group-item-action bg-primary text-white border-dark shadow-lg rounded">
                    <span class="alert primary  p-2"> <button v-on:click="deleteAchievement(achievement)" type="button" class="bg-dark text-white border-dark shadow-lg rounded"><i class="fas fa-trash-alt"></i></button> </span>
                    <span class="alert primary  p-2"><span class="badge badge-secondary"> Date: </span> {{ achievement.date.substring(0, 10) }} </span>
                    <span class="alert primary  p-2"><span class="badge badge-secondary"> Achieved: </span> {{ achievement.achieved }} </span>
                    <span class="alert primary  p-2"><span class="badge badge-secondary"> Type: </span> {{ achievement.type }} </span>

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