var test;

//Given a habit object, return time remaining in seconds
function timeSince(last_clicked){
  var now = new Date();
  var timeSince = now.getTime() - last_clicked.getTime();
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

var delete_mode = false;

var params = {};

$(document).ready(function(){
  get_all_habits(function(habits){
    test = sort_timeSince(habits);
  });

  $("#new_habit").click(function () {
    params["name"] = $("#name").val();
    params["description"] = $("#desc").val();
    params["end_date"]=new Date($("#date").val());
    params["monetary_amount"] = Number($("#pledge_amount").val());
    params["success_status"] = 0;
    params["charity"] = Number($("#charity").val());
    create_habit(params,function(x){console.log(x)});
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
