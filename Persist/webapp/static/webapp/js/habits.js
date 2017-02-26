function test() {
  console.log('habitjs included');
}
function get_habit(id, callback) {
  console.log("sending get_habit post");
  var csrftoken = getCookie('csrftoken');
  $.ajax({
		type: "POST",
		url: "/_get_habit/",
		data: { 
		  "csrfmiddlewaretoken": csrftoken,
      "habit_id": id
		},
		success: function(res) {
			console.log("got response");
      var parsed = JSON.parse(res);
      debugger;
				return parsed;
		}
	});
}

function create_habit(params, callback){
  var csrftoken = getCookie('csrftoken');
  $.ajax({
    type: "POST",
    url: "/_create_habit/",
    data: {
      "csrfmiddlewaretoken": csrftoken,
      "name": params.name,
      "description": params.description,
      "monetary_amount": params.monetary_amount,
      "end_date": params.end_date,
      "success_status": params.success_status,
      "charity": params.charity
    },
    success: function(res) {
      res = JSON.parse(res);
      if (res.success) {
        if (callback){
          callback(true);
        }
      }else{
        if (callback){
          callback(false);
        }
      }
    }
  });
}

function change_habit(id, params, callback){
  var csrftoken = getCookie('csrftoken');
  $.ajax({
    type: "POST",
    url: "/_change_habit/",
    data: {
      "csrfmiddlewaretoken": csrftoken,
      "id": id,
      "name": params.name,
      "description": params.description,
      "monetary_amount": params.monetary_amount,
      "end_date": params.end_date,
      "success_status": params.success_status,
      "charity": params.charity
    },
    success: function(res) {
      res = JSON.parse(res);
      if (res.success) {
        if (callback){
          callback(true);
        }
      }else{
        if (callback){
          callback(false);
        }
      }
    }
  });
}
