$(window).load(function(){
	// get sections and buttons
	var sections = document.getElementsByTagName('section');
	var next_buttons = document.getElementsByClassName('next_button');
	var previous_buttons = document.getElementsByClassName('previous_button');
	var placeholder = "COURSE_CODE";
	var range_sliders = document.getElementsByClassName('slider');
	var range_displays = document.getElementsByClassName('range_display');
	var web_data = {};

	function nextSection(current_section_index){
		sections[current_section_index].className="hidden";
		sections[current_section_index+1].className="normal";
	}
	function skipNextSection(current_section_index){
		sections[current_section_index].className="hidden";
		sections[current_section_index+1].className="hidden";
		sections[current_section_index+2].className="normal";
	}

	function buildRssTable(){
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
					alert('Please fill in the study semester!');
				}
				else if(!$('input[name=date]').val()){
					alert('Please fill in the date!');
				}
				else{
					web_data.instructor_name = $('input[name=instructor_name]').val();
					web_data.school_name = $('input[name=school_name]').val();
					web_data.study_semester = $('input[name=study_semester]').val();
					web_data.survey_date = $('input[name=date]').val();
					console.log(web_data);
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
					web_data.class_title = $('input[name=class_title]').val();
					web_data.class_subject = $('input[name=class_subject]').val();
					web_data.num_instructors = $('input[name=num_instructors]:checked').val();
					console.log(web_data);
					nextSection(button_index);
				}
				break;
			case 2:
				var check_syllabus = document.getElementById('syllabus_check');
				if (check_syllabus.className == "hidden"){
					if(!$('input[name=num_exams]').val()){
						alert('Please enter the number of exams in your class!');
					}
					else{
						buildRssTable();
						web_data.num_exams = $('input[name=num_exams]').val();
						console.log(web_data);
						nextSection(button_index);
					}
				}
				else if(check_syllabus.className == "normal"){
					if(!$('input[name=same_syllabus]:checked').val()){
						alert('Please indicate if all instructors of this class use the same syllabus!');
					}
					else if(!$('input[name=num_exams]').val()){
						alert('Please enter the number of exams in your class!');
					}
					else{
						buildRssTable();
						web_data.num_exams = $('input[name=num_exams]').val();
						web_data.same_syllabus = $('input[name=same_syllabus]:checked').val();
						console.log(web_data);
						nextSection(button_index);
					}
				}
				break;
			case 3:
				if (!$('textarea[name=sample_reminder]').val()){
					alert('Please enter your own exam reminder in the textbox!');
				}
				else{
					web_data.sample_reminder = $('textarea[name=sample_reminder]').val();
					//TODO record list of exam info
					console.log(web_data);
					nextSection(button_index);
				}
				break;
			//TODO: case 4
			// record list of resources
			case 5:
				if($('input[name=model_example]:checked').val() == "No"){
					web_data.model_example = $('input[name=model_example]:checked').val();
					console.log(web_data);
					skipNextSection(button_index);
				}
				else if($('input[name=model_example]:checked').val() == "Yes"){
					web_data.model_example = $('input[name=model_example]:checked').val();
					console.log(web_data);
					nextSection(button_index);
				}
				else{
					alert('Please make a selection!');
				}
				break;
			case 6:
				if(!$('textarea[name=sample_example]').val()){
					alert('Please enter your own model example in the textbox!');
				}
				else{
					web_data.sample_example = $('input[name=sample_example]').val();
					console.log(web_data);
					nextSection(button_index);
				}
				break;
			case 7:
				if($('input[name=model_study_plan]:checked').val() == "No"){
					web_data.model_study_plan = $('input[name=model_study_plan]:checked').val();
					console.log(web_data);
					skipNextSection(button_index);
				}
				else if($('input[name=model_study_plan]:checked').val() == "Yes"){
					web_data.model_study_plan = $('input[name=model_study_plan]:checked').val();
					console.log(web_data);
					nextSection(button_index);
				}
				else{
					alert('Please make a selection!');
				}
				break;
			//TODO: case 8
			case 9:
				if(!$('textarea[name=incentive]').val()){
					alert('Please enter extra credit information in the textarea!');
				}
				else{
					web_data.incentive = $('input[name=incentive]').val();
					console.log(web_data);
					nextSection(button_index);
				}
				break;
			default:
				nextSection(button_index);
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
	// Consider simplifying code with JQuerry
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
