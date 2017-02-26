//Given a habit object, return time remaining in seconds
function timeSince(reference){
  var now = new Date();
  var timeSince = now.getTime() - reference.getTime();
  return timeSince/1000;
}

//Return an array that sorts habits by decreasing timeSince
function sort_timeSince(habits){
  var sortedArray = [];
  for (var i in habits){
    sortedArray.push(habits[i]);
  }
  sortedArray.sort(function(a, b){
    aTime = timeSince(a.last_clicked);
    bTime = timeSince(b.last_clicked);
    return bTime-aTime;
  });
  return sortedArray;
}

function adjustBars(barIDs, habits){
  if (!barIDs || !habits){
    return;
  }
  var daySeconds = 86400;
  for (var i in barIDs){
    var curBar= barIDs[i];
    var percent = timeSince(habits[parseInt(i)].last_clicked)/daySeconds * 100;
    $("#" + barIDs[i]).css("width", Math.round(percent).toString() +"%");
  }
}

function loadHabits(habits){
  var parDiv = "#habit-container";
  var barIDs = {};
  var habitIDs = {};
  for (var i in habits){
    var curHabit = habits[i];
    var id = curHabit.id;
    var name = curHabit.name;
    var cost = curHabit.monetary_amount;
    var streak = Math.round(timeSince(curHabit.start_date)/(3600*24));
    $(parDiv).append("<div class=section-container id=section-"+id+"><div class=habitbar id=habit-"+id+"><div class=id-container>"+id+"</div><div class=habitbartext><div class=habitbartextstreak><h1 id=streak-"+id+">"+streak+"</h1></div><div class=habitbartextname><h1 id=name-"+id+">"+name+"</h1></div><div class=habitbartextmoney><h1 id=cost-"+id+">$ "+cost+"</h1></div></div><div class=habitbartimeleftbackground> <div class=habitbartimeleftforeground id=timeleft-"+id+"></div> </div></div></div>");
    console.log(habits[i]);
    barIDs[id]= "timeleft-"+id;
    habitIDs[id] = "habit-"+id;
  }
  return {"bar": barIDs, "habit": habitIDs};
}

function loadUser(){
  get_user(function(username){
    $("#username").html(username);
  });
}

function loadStreak(streak){
  $("#beststreak").html(streak); 
}

function clickSetter(ids){
  for (var i in ids){
    $("#"+ids[i]).on('click', function(res){
      updateLastClick(parseInt(this.children[0].innerText));
    });
  }
}

function updateLastClick(id){
  params = {"last_clicked": new Date().getTime()};
  change_habit(id, params, function(res){
    window.location = "/home";
  });
}
var delete_mode = false;

$(document).ready(function(){
  var barID;
  var habitDict;
  get_all_habits(function(habits){
    habitDict = habits;
    habits = sort_timeSince(habits);
    Ids = loadHabits(habits);
    adjustBars(Ids.bar, habitDict);
    loadUser();
    clickSetter(Ids.habit);
    loadStreak(Math.round(timeSince(habits[0].start_date)/84600));
    setInterval(function(){
      adjustBars(Ids.bar, habitDict);  
    }, 1000);
  });
  
  $("#deletebutton").click(function () {
    if (delete_mode==false) delete_mode = true;
    else delete_mode = false;
    alert(delete_mode);
  });

  $("div[id^='habit']").click(function () {
    if (delete_mode==true && confirm("Are you sure you want to delete this?")) {
      var pk = this.id;
      pk = pk.substring(6); 
      delete_habit(pk,function(x){
        if(x==false) alert("An error has occurred, please reload the page.");
        else this.remove();
      });
    }
    else {
      return false;
    }
  });
});
