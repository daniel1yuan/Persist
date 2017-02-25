//Main functions
function login(username, password, callback){
  $.ajax({
    type: "POST",
    url: "/login/",
    data: {
      "username": username,
      "password": password
    },
    success: function(res){
      if (res){
        //If Login is successful redirect to home page
        window.location="/home";
      }else{
        console.log("login failed")
      }
    }
  });
}

function logout(username, password, callback){
  $.ajax({
    type: "POST",
    url: "/logout/",
    data: {
      "username": username,
      "password": password
    },
    success: function(res){
      if (res){
        //If Login is successful redirect to landing page
        window.location="/";
      }else{
        console.log("logout failed")
      }
    }
  });
}
//Helper functions


//Main
$(document).ready(function(){
});
