const searchBtn = document.getElementById("search-btn");
const formValue = document.getElementById("input").value;
const input = document.getElementById("input");

input.addEventListener("keydown", function(event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    console.log("hey");
    event.preventDefault();
    // Trigger the button element with a click
    searchBtn.click();
    input.value = "";
  }
});
searchBtn.addEventListener("click", getTeams);

function getTeams() {
  //GET INPUT TEXt
  const formValue = document.getElementById("input").value;
  // console.log(formValue);

  if (formValue === "") {
    results.innerHTML = "";
    const div = document.createElement("div");
    div.className = "alert alert-danger";
    div.innerHTML = "Please write something";
    document.getElementById("giphy").style.display = "block";
    results.appendChild(div);
    setTimeout(() => document.querySelector(".alert").remove(), 2000);
    return;
  } else {
    fetch(
      `https://www.thesportsdb.com/api/v1/json/1/searchteams.php?t=${formValue}`
    )
      .then(res => res.json())
      // .then(data => console.log(data.teams))
      .then(data => showTeams(data.teams))
      .catch(err => console.log(err));
  }
}

//Show teams

function showTeams(teams) {
  const results = document.getElementById("results");

  //Clear first
  results.innerHTML = "";

  //Loop throught teams
  teams.forEach(team => {
    console.log(team);
    document.getElementById("giphy").style.display = "none";
    const div = document.createElement("div");
    div.classList.add("card", "card-body", "mb-3");
    div.innerHTML = `
      <div class="row">
        <div class="col-md-3 bg-gray">
          <h5 class="text-center"> ${team.strTeam} </h5>
         <center> <img class="img-fluid mb-2" src="${team.strTeamBadge}" width="150px"> </center>
          <ul class="list-group" style="margin: 8px"> 
            <li class="list-group-item"> <strong>Country:</strong> ${team.strCountry}</li>
            <li class="list-group-item"> <strong>Founded:</strong> ${team.intFormedYear}</li>
            <li class="list-group-item"><strong> League: </strong> ${team.strLeague}</li>
            <li class="list-group-item"><strong> Capacity: </strong> ${team.intStadiumCapacity}</li>
          </ul>
         <a class="btn btn-primary btn-block my-4" href="https://${team.strWebsite}" target="_blank"> Website </a>
           </div>
       <div class="col-md-6">
         <span class="badge badge-primary"> ${team.strSport}</span> 
          <div>
          <center>
          
            <p class="mt-4" style="text-align: left;line-height: 1.7;"> ${team.strDescriptionEN} </p>
             <img src=${team.strTeamFanart1} style="max-width: 50%"> 
          </center>
        </div>
    
        </div>
        <div class="col-md-3" style="margin-top: 50px;">
               <p class="mb-3">${team.strStadium}, ${team.strStadiumLocation} <p> 
               <img src="${team.strStadiumThumb}" style="max-width: 100%; border-radius: 40px"> 
                
         <ul class="list-inline mt-3" style="float: right; font-size: 25px">
                <li class="list-inline-item"> <a href="http://${team.strFacebook}" target=_blank> <i class="fab fa-facebook"></i></a>  </li>
                 <li class="list-inline-item">  <a href="http://${team.strInstagram}" target=_blank><img src="/img/Instagram.png" width="32" style="margin-top: -7px;"> </a>  </li>
                  <li class="list-inline-item"> <a href="http://${team.strTwitter}" target=_blank> <i class="fab fa-twitter"></i></a>  </li>
                
            </ul>
        </div>
        </div>
    `;
    results.appendChild(div);
  });
}

// message when doesnt exist results
//if description = nul
