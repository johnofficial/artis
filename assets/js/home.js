$(document).ready(function() {
	$.each($(".step"), function (index, $step) {
		var $content = $(this).find("p");
		var contentText = $content.html();

		if ( contentText.length > 100 ) {
			$content.css("font-size", function () {
				return 10;
			});
		}
	});
	$.each($(".feature"), function (index, $feature) {
		var $content = $(this).find(".title");
		var contentText = $content.html();

		if ( contentText.length > 15 ) {
			$content.css("font-size", function () {
				return 16;
			});
		}
	});
});