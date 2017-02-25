function test() {
  console.log('test');
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
			res = JSON.parse(res);
			if (res.success) {
				return res;
			}
			return null;
		}
	});
}

