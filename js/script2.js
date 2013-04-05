// input field
function showResults(str) {
	if (str.length==0) { 
		$("#results").empty();
		return;
	}
	$.ajax({
		dataType: "jsonp",
		url: "http://search.twitter.com/search.json?q="+encodeURIComponent(str),
		success: function(result) {
			$("#results").empty();
			for (var i = 0; i < result.results.length; i++){
				var thisTweet = replaceWithData($("#tweet-template").html(), result.results[i]);
				$("#results").append(thisTweet);
			}
		},
		fail: function() {
			return false;
		}
	});
}

// Replace the {{XXX}} with the corresponding property
function replaceWithData(template, data) {
	var html_template = template, 
		prop;
	for (prop in data) {
		if (data.hasOwnProperty(prop)) {
			html_template = html_template.replace('{{' + prop + '}}', data[prop]);
		}
	}
	return html_template;
}
$(document).ready(function() {
	$("#go").click(function(){
		showResults($("#search").val());
	})
});




