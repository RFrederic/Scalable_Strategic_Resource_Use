$(window).load(function(){
	// get sections and buttons
	var sections = document.getElementsByTagName('section');
	var next_buttons = document.getElementsByClassName('next_button');
	var previous_buttons = document.getElementsByClassName('previous_button');
	var placeholder = "COURSE_CODE";
	var range_sliders = document.getElementsByClassName('slider');
	var range_displays = document.getElementsByClassName('range_display');

	function nextSection(current_section_index){
		sections[current_section_index].className="hidden";
		sections[current_section_index+1].className="normal";
	}
	function skipNextSection(current_section_index){
		sections[current_section_index+1].className="hidden";
		sections[current_section_index+2].className="normal";
	}

	function handle_slider(slider_index){
		if(slider_index < 3){
			range_displays[slider_index].textContent = range_sliders[slider_index].value + " Years";
		}
		else{
			range_displays[slider_index].textContent = range_sliders[slider_index].value + " %";
		}
	}
	// define handlers for button clicks
	function handle_nextB_click(button_index){
		switch(button_index){
			case 0:
				if(!$('input[name=instructor_name]').val()){
					alert("Please fill in your name!");
				}
				else if(!$('input[name=school_name]').val()){
					alert('Please fill in your school name!');
				}
				else if(!$('input[name=study_semester]').val()){
					alert('Please fill in your semester!');
				}
				else if(!$('input[name=date]').val()){
					alert('Please fill in the date');
				}
				else{
					nextSection(button_index);
				}
				break;
			case 1:
				if(!$('input[name=class_title]').val()){
					alert('Please fill in the class title!');
				}
				else if(!$('input[name=class_subject]').val()){
					alert('Please fill in the class subject!');
				}
				else if(!$('input[name=num_instructors]:checked').val()){
					alert('Please select the number of other instructors teaching this course!');
				}
				else{
					nextSection(button_index);
				}
			case 2:
				if (check_syllabus.className != "hidden"){
					if (!$('input[name=same_syllabus]').val()){
						alert('Please indicate if all instructors of this class use the same syllabus!');
					}
				}
				else if(!$('input[name=num_exams]').val()){
					alert('Please enter the number of exams in your class!');
				}
				else{
					nextSection(button_index);
				}
			case 3:
				
			default:
		}
		nextSection(button_index);
		if(button_index == 1){
			var check_syllabus = document.getElementById('syllabus_check');
			if($('input[name=num_instructors]:checked').val() == "None"){
				check_syllabus.className = "hidden";
			}
			else{
				check_syllabus.className = "normal";
			}
			var class_code = $('input[name=class_title]').val();
			var message_div = document.getElementById('course_code_message');
			var message = message_div.textContent;
			message = message.replace(placeholder, class_code);
			message_div.textContent = message;
			placeholder = class_code;
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
		if(button_index == 5){
			if($('input[name=model_example]:checked').val() == "No"){
				skipNextSection(button_index);
			}
		}
		if(button_index == 7){
			if($('input[name=model_study_plan]:checked').val() == "No"){
				skipNextSection(button_index);
			}
		}
	}

	function handle_previousB_click(button_index){
		sections[button_index].className = "normal";
		sections[button_index+1].className = "hidden";
		if(button_index == 6){
			if($('input[name=model_example]:checked').val() == "No"){
				sections[button_index].className = "hidden";
				sections[button_index-1].className = "normal";
			}
		}
		if(button_index == 8){
			if($('input[name=model_study_plan]:checked').val() == "No"){
				sections[button_index].className = "hidden";
				sections[button_index-1].className = "normal";
			}
		}
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
		for (var i = 0; i < range_sliders.length; i++) {
			(function (i){
				range_sliders[i].addEventListener('change', function(){
					handle_slider(i);
				}, false);
			})(i);
		}
	}

	initialize();
})
