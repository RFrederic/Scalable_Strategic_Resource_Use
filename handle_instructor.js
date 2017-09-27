$(window).load(function(){
	// get sections and buttons
	var sections = document.getElementsByTagName('section');
	var next_buttons = document.getElementsByClassName('next_button');
	var previous_buttons = document.getElementsByClassName('previous_button');

	// define handlers for button clicks
	function handle_nextB_click(button_index){
		sections[button_index].className = "hidden";
		sections[button_index+1].className = "normal";
		if(button_index == 1){
			var check_syllabus = document.getElementById('syllabus_check');
			if($('input[name=num_instructors]:checked').val() == "None"){
				check_syllabus.className = "hidden";
			}
			else{
				check_syllabus.className = "normal";
			}
		}
		if(button_index == 2){
			var exam_tableDiv = document.getElementById('exam_table');
			var exam_table = document.createElement("TABLE");
			var exam_tableBody = document.createElement("TBODY");
			exam_table.appendChild(exam_tableBody);
			exam_tableDiv.appendChild(exam_table);
			var num_exams = parseInt($('input[name=num_exams]').val(), 10);
			$("#exam_table tr").remove();
			var first_row = document.createElement("TR");
			var name_head = document.createElement("TH");
			var date_head = document.createElement("TH");
			exam_tableBody.appendChild(first_row);
			name_head.appendChild(document.createTextNode("exam name"));
			date_head.appendChild(document.createTextNode("exam date"));
			first_row.appendChild(name_head);
			first_row.appendChild(date_head);
			for (var i = 0; i < num_exams; i++) {
				var tr = document.createElement("TR");
				exam_tableBody.appendChild(tr);
				var td1 = document.createElement("TD");
				td1.appendChild(document.createTextNode("Click to edit exam "+(i+1)+"'s name"));
				td1.contentEditable = "true";
				tr.appendChild(td1);
				var td2 = document.createElement("TD");
				var date = document.createElement("INPUT");
				date.setAttribute("type", "date");
				td2.appendChild(date);
				tr.appendChild(td2);
			}
		}
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
