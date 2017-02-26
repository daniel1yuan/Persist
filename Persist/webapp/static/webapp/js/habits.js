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
  
function create_habit(params, callback) {
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

function get_all_habits(callback) {
  var csrftoken = getCookie('csrftoken');
  $.ajax({
    type: "POST",
    url: "/_get_all_habits/",
    data: {
      "csrfmiddlewaretoken": csrftoken,
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

function delete_habit(id, callback){
  var csrftoken = getCookie('csrftoken');
  $.ajax({
    type: "POST",
    url: "/_delete_habit/",
    data: {
      "csrfmiddlewaretoken": csrftoken,
      "id": id
    },
    success: function(res) {
      var res = JSON.parse(res);
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
