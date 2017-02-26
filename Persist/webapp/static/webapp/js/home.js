var test;

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
  var daySeconds = 86400;
  for (var i in barIDs){
    var curBar= barIDs[i];
    var percent = timeSince(habits[parseInt(i)].last_clicked)/daySeconds * 100;
    $("#" + barIDs[i]).css("width", Math.round(percent).toString() +"%");
    console.log(Math.round(percent).toString()+"%");
  }
}

function loadHabits(habits){
  var parDiv = ".test";
  var barIDs = {};
  for (var i in habits){
    var curHabit = habits[i];
    var id = curHabit.id;
    var name = curHabit.name;
    var cost = curHabit.monetary_amount;
    var streak = Math.round(timeSince(curHabit.start_date)/(3600*24));
    $(parDiv).append("<div class=habitbar id=habit-"+id+"><div class=habitbartext><div class=habitbartextstreak><h1 id=streak-"+id+">"+streak+"</h1></div><div class=habitbartextname><h1 id=name-"+id+">"+name+"</h1></div><div class=habitbartextmoney><h1 id=cost-"+id+">$ "+cost+"</h1></div></div><div class=habitbartimeleftbackground> <div class=habitbartimeleftforeground id=timeleft-"+id+"></div> </div></div>");
    console.log(habits[i]);
    barIDs[id]= "timeleft-"+id;
  }
  return {"bar": barIDs};
}

$(document).ready(function(){
  get_all_habits(function(habits){
    habitDict = habits;
    habits = sort_timeSince(habits);
    Ids = loadHabits(habits);
    console.log(Ids);
    adjustBars(Ids.bar, habitDict);
  });
});
