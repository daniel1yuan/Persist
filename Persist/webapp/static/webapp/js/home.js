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

$(document).ready(function(){
  get_all_habits(function(habits){
    test = sort_timeSince(habits);
  });
});
