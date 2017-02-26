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
      if (callback) {
        id = JSON.parse(res).pk;
        var parsed = JSON.parse(res).fields;
        parsed["id"] = id;
        parsed.start_date = new Date(parsed.start_date*1000);
        parsed.end_date = new Date(parsed.end_date*1000);
        parsed.last_clicked = new Date(parsed.last_clicked*1000);
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
      "end_date": params.end_date.getTime(),
      "success_status": params.success_status,
      "charity": params.charity
    },
    success: function(res) {
      res = JSON.parse(res);
      if (res.success) {
        if (callback){
          callback(res.pk);
        }
      }else{
        if (callback){
          callback(-1);
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
        parsed[idx] = tmp.fields;
        parsed[idx].id = tmp.pk;
        parsed[idx].start_date = new Date(parsed[idx].start_date*1000);
        parsed[idx].end_date = new Date(parsed[idx].end_date*1000);
        parsed[idx].last_clicked = new Date(parsed[idx].last_clicked*1000);
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
      "last_clicked": params.last_clicked,
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
