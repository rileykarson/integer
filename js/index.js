$( document ).ready(function() {

	$(".bit").click(function(event) {
		var counter = $("#result")[0];
		var id = event.target.id.slice(6);
		var target = event.target;
		console.log(counter.textContent);
		if (target.textContent == 0){
			target.textContent = 1;
			counter.textContent = parseInt(counter.textContent) + Math.pow(2,32-id);
		} else {
			target.textContent = 0;
			counter.textContent = parseInt(counter.textContent) - Math.pow(2,32-id);
		}
	});
});