// Function that calls login when button/enter is pressed
function login_click(){
  var email = $("#username").val();
  var password = $("#password").val();
  login(email, password);
}

function signup_click(){
  var email = $("#username").val();
  var password = $("#password").val();
  signup(email, password);
}

// Have event on enter keypress to call login function
$(document).keypress(function(e) {
  if(e.which == 13){
    login_click();
  }
});
