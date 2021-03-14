


export default
{
    name: "HomeWelcome",

    data()
    {
        return {
            formDisabled: false
        }
    },




    methods: {
        async method(event)
        {

        },


    },





    template: `
    <div class="card text-white bg-primary">
        <div class="card-header"><i class="fas fa-home"></i> Welcome</div>
        <div class="card-body">
<!--          <p class="card-text">-->
<!--            user <router-link to="/user" class="text-decoration-none font-weight-bold text-white">link</router-link>-->
<!--          </p>-->
<!--          <p class="card-text">-->
<!--            schedule <router-link to="/schedule" class="text-decoration-none font-weight-bold text-white">link</router-link>-->
<!--          </p>-->
<!--          <p class="card-text">-->
<!--            calendar <router-link to="/calendar" class="text-decoration-none font-weight-bold text-white">link</router-link>-->
<!--          </p>-->

<!--          <img src="/image/welcome.jpg" class="img-fluid rounded" alt="Fitness Image">-->







          <div id="welcomeCarousel"  class="carousel slide mx-auto " data-ride="carousel">
            
            
            
            <ol class="carousel-indicators">
              <li data-target="#welcomeCarousel" data-slide-to="0" class="active"></li>
              <li data-target="#welcomeCarousel" data-slide-to="1"></li>
              <li data-target="#welcomeCarousel" data-slide-to="2" class=" "></li>
            </ol>
            
            <div class="carousel-inner">
              
              <div class="carousel-item active">
                <div class="carousel-caption">
                  <p class="card-text">

                    1. Get your journey started,
                    
                    <router-link to="/user" class="text-decoration-none font-weight-bold text-white">Create an Account</router-link>.
                  </p>


                  <a class="carousel-control-prev" href="#welcomeCarousel" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                  </a>

                  <a class="carousel-control-next" href="#welcomeCarousel" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                  </a>
                  
                </div>

                <img class="d-block mw-100 rounded" src="/image/welcome1.jpg" alt="First slide">


              </div>
              
              
              
              
              <div class="carousel-item">

                <div class="carousel-caption">
                  <p class="card-text">
                    2. Create you plan with the 
                    
                    
                    <router-link to="/schedule" class="text-decoration-none font-weight-bold text-white">Schedule Creator</router-link>.
                  </p>

                  <a class="carousel-control-prev" href="#welcomeCarousel" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                  </a>

                  <a class="carousel-control-next" href="#welcomeCarousel" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                  </a>
                  
                </div>

                <img class="d-block mw-100 rounded" src="/image/welcome2.jpg" alt="Second slide">


              </div>
              

              
              <div class="carousel-item">



                <div class=" carousel-caption">
                    <p class="card-text">
                      3. Record progress with <router-link to="/calendar" class="text-decoration-none font-weight-bold text-white">Achievement Calendar</router-link>.
                    </p>

                  <a class="carousel-control-prev" href="#welcomeCarousel" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                  </a>

                  <a class="carousel-control-next" href="#welcomeCarousel" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                  </a>
                  </div>

                <div class="">
                  <img class="d-block mw-100 rounded" src="/image/welcome3.jpg" alt="Third slide">
                </div>
                

              </div>

              
            </div>
            
            
            
            
<!--        &lt;!&ndash; controls&ndash;&gt;-->
<!--            -->
<!--            <a class="carousel-control-prev" href="#welcomeCarousel" role="button" data-slide="prev">-->
<!--              <span class="carousel-control-prev-icon" aria-hidden="true"></span>-->
<!--              <span class="sr-only">Previous</span>-->
<!--            </a>-->
<!--            -->
<!--            <a class="carousel-control-next" href="#welcomeCarousel" role="button" data-slide="next">-->
<!--              <span class="carousel-control-next-icon" aria-hidden="true"></span>-->
<!--              <span class="sr-only">Next</span>-->
<!--            </a>-->
<!--        &lt;!&ndash; controls&ndash;&gt;-->



          </div>
          
          
          
          

        </div>
    </div>
  `,
};