function test(x) {
  console.log(x);
}
function get_habit(id, callback) {
  var csrftoken = getCookie('csrftoken');
  $.ajax({
		type: "POST",
		url: "/_get_habit/",
		data: { 
		  "csrfmiddlewaretoken": csrftoken,
      "habit_id": id
		},
		success: function(res) {
      var parsed = JSON.parse(res);
      if (callback) {
        callback(parsed);
      }
    }
	});
}

function get_all_habits(callback) {
  var csrftoken = getCookie('csrftoken');
  $.ajax({
    type: "POST",
    url: "/_get_all_habits/",
    data: {
      "csrfmiddlewaretoken": csrftoken
    },
    success: function(res) {
      var parsed = JSON.parse(res);
      for (var idx in parsed) {
        tmp = JSON.parse(parsed[idx])
        console.log(tmp)
        parsed[idx] = tmp
      }
      if (callback) {
        callback(parsed);
      }
    }
  });
}
