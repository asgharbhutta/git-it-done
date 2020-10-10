var issuesContainer = document.querySelector("#issues-container");
var limitWarningEl = document.querySelector("#limit-warning");

var getRepoIssues = function(repo){
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

    fetch(apiUrl).then(function(response) {
        // request was successful
        console.log(response)
        if (response.ok) {
          response.json().then(function(data) {
              //pass response data to the DOM function
            displayIssues(data);
            //check if api has paginated issues
            if(response.headers.get("Link")){
                displayWarning(repo)
            }
          });
        }
        else {
          alert("There was a problem with your request!");
        }
      });

    }

var displayIssues = function(issues){
    for(x in issues){
        if(issues.length === 0){
            issuesContainer.textContent = "This repo has no open issues"
            return;
        }

        var issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[x].html_url);
        issueEl.setAttribute("target", "blank");

        //create span to hold issue title
        var titleEl = document.createElement("span");
        titleEl.textContent = issues[x].title;

        //append to container

        issueEl.appendChild(titleEl);
        
        //create a type element
        var typeEL = document.createElement("span");

        //check to see if issue is an issue or pull request
        if(issues[x].pull_request){
            typeEL.textContent = "(Pull Request)";
        }else{
            typeEL.textContent = "(Issue)";
        }

        //append to container
        issueEl.appendChild(typeEL);

        issuesContainer.appendChild(issueEl);
    }
};

var displayWarning = function(repo){
    limitWarningEl.textContent = "To see more than 30 issues, visit ";
    var linkEl = document.createElement("a");
    linkEl.textContent = "See more issues on github";
    linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
    linkEl.setAttribute("target", "_blank");

    //append to warning container
    limitWarningEl.appendChild(linkEl);
}



getRepoIssues("facebook/react");