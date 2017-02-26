//Main functions

//  Attempts to log in the user specified by username and password
//  If it is successful -> redirect to user home page
//  Otherwise: redirect to login (or stay on login page)
function login(username, password, callback){
  var csrftoken = getCookie('csrftoken');
  $.ajax({
    type: "POST",
    url: "/_login/",
    data: {
      "csrfmiddlewaretoken": csrftoken,
      "username": username,
      "password": password
    },
    success: function(res){
      res = JSON.parse(res);
      if (res.success){
        //If Login is successful redirect to home page
        if (callback){
          callback;
        } 
        window.location="/home";
      }else{
        console.log("login failed");
        if (!window.location.pathname == "/login/")
          window.location="/login/";
      }
    }
  });
}

//  Attempts to logout the current usera
//  Redirects to landing page if successful
function logout(callback){
  $.ajax({
    type: "GET",
    url: "/_logout/",
    success: function(res){
      res = JSON.parse(res);
      if (res.success){
        //If Logout is successful redirect to landing page
        if (callback){
          callback;
        } 
        window.location="/";
      }else{
        console.log("logout failed")
      }
    }
  });
}


//  Signs up a new user with the username and password specified
function signup(username, password, callback){
  var csrftoken = getCookie('csrftoken');
  $.ajax({
    type: "POST",
    url: "/_adduser/",
    data: {
      "csrfmiddlewaretoken": csrftoken,
      "username": username,
      "password": password
    },
    success: function(res){
      res = JSON.parse(res);
      if (res.success){
        //If signup is successful sign them in
        if (callback){
          callback();
        } 
        login(username, password);
      }else{
        //If signup fails
        console.log("Signup Failed");
      }
    }
  }); 
}

//  Deletes the current logged in user
function del_cur_user(callback){
  $.ajax({
    type: "GET",
    url: "/_del_cur_user/",
    success: function(res){
      res = JSON.parse(res);
      if (res.success){
        //User has been deleted, redirect to landing page
        if (callback){
          callback;
        }
        window.location = "/";
      }else{
        //User has not been deleted (probably not logged in)
        console.log("Delete current user failed");
      }
    }
  }); 
}

//  Deletes the user specified by username
function deluser(username, callback){
  var csrftoken = getCookie('csrftoken');
  $.ajax({
    type: "POST",
    url: "/_deluser/",
    data: {
      "csrfmiddlewaretoken": csrftoken,
      "username": username,
    },
    success: function(res){
      res = JSON.parse(res);
      if (res.success){
        //If signup is successful sign them in
        if (callback){
          callback;
        } 
      }else{
        //If deluser fails(probably because no superuser)
        console.log("Delete failed");
      }
    }
  }); 
}

//Returns true in callback if there is an authorized user currently using system
function auth(callback){
  $.ajax({
    type: "GET",
    url: "/_auth/",
    success: function(res){
      res = JSON.parse(res);
      if (res.success && res.logged_in){
        //Someone is logged in , return true
        if (callback){
          callback(true);
        }
      }else{
        //No one is logged in, return false
        if (callback){
          callback(false);
        }
      }
    }
  });  
}

