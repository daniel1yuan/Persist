// Changes login button to logout button
function assignFunction(){
  $('#header-login').off()
  auth(function(res){
    if (res){
      //Someone is logged in, attach logout button
      $("#header-login").on('click', function(){
        logout();
      });
      $('#header-login').text("Logout"); 
    }else{
      $("#header-login").on('click', function(){
        window.location = '/login';
      });
      $('#header-login').text("Login"); 
    }
  });
}

$(document).ready(function(){
  assignFunction();
});
