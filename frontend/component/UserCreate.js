export default {
    name: "UserCreate",

    async mounted()
    {

    },

    template: `
<div class="card text-white bg-primary">
    <div class="card-header"><i class="fas fa-user-plus"></i> User Create</div>
    <div class="card-body">

        <form>
        
        
            <div class="form-group input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text"> <i class="fa fa-user"></i> </span>
                </div>
                <input name="" class="form-control" placeholder="Full name" type="text">
            </div> <!-- form-group// -->
            

            <div class="form-group input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text"> <i class="fa fa-envelope"></i> </span>
                </div>
                <input name="" class="form-control" placeholder="Email address" type="email">
            </div> <!-- form-group// -->
            

            <div class="form-group input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text"> <i class="fa fa-lock"></i> </span>
                </div>
                <input class="form-control" placeholder="Create password" type="password">
            </div> <!-- form-group// -->
            
            
            <div class="form-group input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text"> <i class="fa fa-lock"></i> </span>
                </div>
                <input class="form-control" placeholder="Repeat password" type="password">
            </div> <!-- form-group// -->
            
            
            <div class="form-group">
                <button type="button" onclick="" class="btn btn-dark btn-block"> Create User</button>
            </div> <!-- form-group// -->
            
                        
            
        </form>
    </div>
</div>
  `,
};