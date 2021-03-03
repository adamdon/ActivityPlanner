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
        async method(event)
        {


        },


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