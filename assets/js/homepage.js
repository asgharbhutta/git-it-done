//var createButton = function (){
  //  var buttonLoad = $('<Button>Load</Button>');
  //  $("#btn").after(buttonLoad);
  //  $("button").addClass("hero");
  //  $("button").click(function(){
  //      $("#btn").fadeToggle(1000);
  //  });
//}

var getUserRepos = function(user) {
    fetch("https://api.github.com/users/octocat/repos").then(function(response) {
        response.json().then(function(data){
            //format the github API URL
            var apiURL = "https://api.github.com/users/" + user + "/repos";

            //make request to the URL
            fetch(apiURL).then(function(response){
                response.json().then(function(data){
                    console.log(data);
                    
                });
            });
            
        
        });
    });
  };


  
  getUserRepos("microsoft");