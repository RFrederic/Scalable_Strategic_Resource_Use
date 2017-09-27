$(window).load(function(){
	// get sections and buttons
	var sections = document.getElementsByTagName('section');
	var next_buttons = document.getElementsByClassName('next_button');
	var previous_buttons = document.getElementsByClassName('previous_button');

	// define handlers for button clicks
	function handle_nextB_click(button_index){
		sections[button_index].className = "hidden";
		sections[button_index+1].className = "normal";
	}

	function handle_previousB_click(button_index){
		sections[button_index].className = "normal";
		sections[button_index+1].className = "hidden";
	}

	// initialize the page and setting up section display properties 
	// as well as event listeners for button clicks
	function initialize(){
		for (var i = 0; i < sections.length; i++) {
			sections[i].className = "hidden"; 
		}
		// display the first section
		sections[0].className = "normal";
		// using closure to make sure all buttons are properly set up
		for (var i = 0; i < next_buttons.length; i++) {
			(function (i){
				next_buttons[i].addEventListener('click', function(){
					handle_nextB_click(i);
				}, false);
			})(i);
		}

		for (var i = 0; i < previous_buttons.length; i++) {
			(function (i){
				previous_buttons[i].addEventListener('click', function(){
					handle_previousB_click(i);
			}, false);
			})(i);
		}
	}

	initialize();
})
