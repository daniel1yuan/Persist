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
        callback(parsed.fields);
      }
    }
	});
}
/*
function create_habit(name,description,monetary_amount,start_date,end_date,success_status,charity){
  var csrftoken = getCookie('csrftoken');
  $.ajax({
    type: "POST",
    url: "/_create_habit/",
    data: {
      "csrfmiddlewaretoken": csrftoken,
      "name": name,
      "description": description,
      "monetary_amount": monetary_amount,
      "start_date": start_date,
      "end_date": end_date,
      "success_status": success_status,
      "charity": charity
    },
    success: function(res) {
      res = JSON.parse(res);
      if (res.success) {
        return true;
      }
      return false;
    }
  }
}*/
