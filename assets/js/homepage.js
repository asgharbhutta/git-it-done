//reference to user search elements
var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
//reference to displaying the call data
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

var getUserRepos = function(user) {
            //format the github API URL wit variables
            var apiURL = "https://api.github.com/users/" + user + "/repos";

            //make request to the URL
            fetch(apiURL)
            .then(function(response){
                if(response.ok){
                    response.json()
                    .then(function(data){
                        displayRepos(data, user);
                    });
                }else{
                    alert("Error: " + response.statusText);
                }
            }).catch(function(error) {
                // Notice this `.catch()` getting chained onto the end of the `.then()` method
                alert("Unable to connect to GitHub");
              });
  };

  //this executes after the submit happens
  var formSubmitHandler = function(event){
      event.preventDefault();
      var username = nameInputEl.value.trim();
      if (username){
          getUserRepos(username);
          nameInputEl.value = "";
      }else{
        alert('Enter a correct github user name!')
      }
  }

  var displayRepos = function(repos, searchTerm){
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;

    //check if api returned any repos
    if(repos.length === 0){
        repoContainerEl.textContent = "No repos found, try again";
        return;
    }

    for(var x in repos){
        //format repo name
        var repoName = repos[x].owner.login + "/" + repos[x].name;

        //create container for each repo
        var repoEl = document.createElement("div");
        repoEl.classList = "list-item flex-row justify-space-between align-center";

        //create span ele to hold repo name
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        //append to container
        repoEl.appendChild(titleEl);

        //create status element
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        //check if repo has outstanding issues
        if(repos[x].open_issues_count > 0){
            statusEl.innerHTML = "<i class='fas fa-times status-icon icon-danger'></i>" + repos[x].open_issues_count + " issue(s)";
        }else{
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }

        //append to container
        repoEl.appendChild(statusEl);

        //append container back to dom
        repoContainerEl.appendChild(repoEl);
    }
  };

userFormEl.addEventListener("submit", formSubmitHandler);

//$(userFormEl).on("submit", function(){
//    formSubmitHandler();
//});