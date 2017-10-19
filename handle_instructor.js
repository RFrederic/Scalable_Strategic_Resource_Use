$(window).load(function(){
	// get sections and buttons
	var NUMBER_OF_RSS_REQUIRED = 10;
	var NUMBER_OF_PlAN_REQUIRED = 2;
	var sections = document.getElementsByTagName('section');
	var next_buttons = document.getElementsByClassName('next_button');
	var previous_buttons = document.getElementsByClassName('previous_button');
	var placeholder = "COURSE_CODE";
	var placeholder2 = "SUBJECT_MATTER";
	var range_sliders = document.getElementsByClassName('slider');
	var range_displays = document.getElementsByClassName('range_display');
	var web_data = {};
	var finish_button = document.getElementById('finish');

	// Hide current and display next block
	function nextSection(current_section_index){
		sections[current_section_index].className="hidden";
		sections[current_section_index+1].className="normal";
	}

	// Hide current and display block indexed at [current+2]
	function skipNextSection(current_section_index){
		sections[current_section_index].className="hidden";
		sections[current_section_index+1].className="hidden";
		sections[current_section_index+2].className="normal";
	}

	// Construct and render the rss table
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

	// Listener for range sliders'(up to index 3) value change
	function handle_slider(slider_index){
		if(slider_index < 3){
			range_displays[slider_index].textContent = range_sliders[slider_index].value + " Years";
		}
		else{
			range_displays[slider_index].textContent = range_sliders[slider_index].value + " %";
		}
	}

	// Check if exam table has been filled in
	function isExamTableOk(){
		table_content = $("#exam_table tr");
		for (i=1; i<table_content.length;i++){
			if (table_content[i].cells[0].innerText == "Click to edit exam "+(i)+"'s name"){
				alert('Please give exam ' + i + " a name!");
				return false;
			}
			web_data["exam"+i+"name"] = table_content[i].cells[0].innerText;
			if(table_content[i].cells[1].children[0].value == ""){
				alert('Please fill in exam ' + i + "'s date!");
				return false;
			}
			web_data["exam"+i+"date"] = table_content[i].cells[1].children[0].value;
		}
		return true;
	}

	// Check if Rss table has been filled in
	function isRssTableOk(){
		table_content = $("#list_of_rss tr");
		for (i=1; i<table_content.length;i++){
			if(table_content[i].cells[1].innerText == "" && i <= NUMBER_OF_RSS_REQUIRED){
				alert('Please fill in the name for study resource #' + i +"!");
				return false;
			}
			if(table_content[i].cells[1].innerText != ""){
				web_data["rss"+i] = table_content[i].cells[1].innerText;
			}
		}
		return true;
	}

	// Check if list of study plans has been filled in
	function isStudyPlanOk(){
		table_content = $("#list_study_plan tr");
		for (i=1; i < table_content.length; i++){
			if(table_content[i].cells[1].innerText == "" && i <= NUMBER_OF_PlAN_REQUIRED){
				alert('Please fill in sample study plan #'+i+"!");
				return false;
			}
			if(table_content[i].cells[1].innerText != ""){
				web_data["study_plan"+i] = table_content[i].cells[1].innerText;
			}
		}
		return true;
	}

	// Lisener for Next buttons
	// Each case index corresponds to one specific button
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
					var subject_matter = $('input[name=class_subject]').val();
					var message_div = document.getElementById('course_code_message');
					var message_div2 = document.getElementById('subject_matter_message');
					var message = message_div.textContent;
					var message2 = message_div2.textContent;
					message = message.replace(placeholder, class_code);
					message_div.textContent = message;
					placeholder = class_code;
					message2 = message2.replace(placeholder2, subject_matter);
					message_div2.textContent = message2;
					placeholder2 = subject_matter;
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
				else if(!isExamTableOk()){
				}
				else{
					web_data.sample_reminder = $('textarea[name=sample_reminder]').val();
					console.log(web_data);
					nextSection(button_index);
				}
				break;
			case 4:
				if (!isRssTableOk()){
				}
				else{
					console.log(web_data);
					nextSection(button_index);
				}
				break;
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
					web_data.sample_example = $('textarea[name=sample_example]').val();
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
			case 8:
				if(!isStudyPlanOk()){
				}
				else{
					console.log(web_data);
					nextSection(button_index);
				}
				break;
			case 9:
				if(!$('textarea[name=incentive]').val()){
					alert('Please enter extra credit information in the textarea!');
				}
				else{
					web_data.incentive = $('textarea[name=incentive]').val();
					console.log(web_data);
					nextSection(button_index);
				}
				break;
			case 10:
				console.log($('input[name=fileToUpload]').val());
				if(!$('input[name=fileToUpload]').val()){
					alert('Please select to upload your current class syllabus!');
				}
				else{
					upload_syllabus();
					web_data.syllabus_name = $('input[name=fileToUpload]').val();
					console.log(web_data);
					nextSection(button_index);
				}
				break;
			case 11:
				if(!$('input[name=teacher_gender]:checked').val()){
					alert('Please select your gender!');
				}
				else if(!$('input[name=teacher_age]').val()){
					alert('Please fill in your age!');
				}
				else if(!$('input[name=teacher_race]:checked').val()){
					alert('Please check at least one ethnicity that apply!');
				}
				else if(!$('input[name=school_type]:checked').val()){
					alert('Please select the type of school in which you are teaching!');
				}
				else if(!$('input[name=teaching_subject]:checked').val()){
					alert('Please check at least one subject that you teach!');
				}
				else if(!$('input[name=teaching_years]').val()){
					alert('Please indicate the number of years you have been teaching!');
				}
				else if(!$('input[name=class_years]').val()){
					alert('Please indicate the number of years you have been teaching this particular class!');
				}
				else if(!$('input[name=teacher_degree]:checked').val()){
					alert('Please select your highest degree you have received!');
				}
				else{
					web_data.teacher_gender = $('input[name=teacher_gender]:checked').val();
					web_data.teacher_age = $('input[name=teacher_age]').val();
					web_data.teacher_race = [];
					for (var i = 0; i < $('input[name=teacher_race]:checked').length; i++) {
						web_data.teacher_race.push($('input[name=teacher_race]:checked')[i].value);
					}
					web_data.school_type = $('input[name=school_type]:checked').val();
					web_data.teaching_subject = [];
					for (var i = 0; i < $('input[name=teaching_subject]:checked').length; i++) {
						web_data.teaching_subject.push($('input[name=teaching_subject]:checked')[i].value); 
					}
					web_data.teaching_years = $('input[name=teaching_years]').val();
					web_data.class_years = $('input[name=class_years]').val();
					web_data.teacher_degree = $('input[name=teacher_degree]:checked').val();
					console.log(web_data);
					nextSection(button_index);
				}
				break;
			case 12:
				if(!$('input[name=num_students]').val()){
					alert('Please indicate the number of students in your class!');
				}
				else if(!$('input[name=avg_age]').val()){
					alert('Please indicate the average age of your students in this class!');
				}
				else if(!$('input[name=male_pct]').val() || 
					!$('input[name=female_pct]').val() || 
					!$('input[name=total_gen]').val()){
					alert('Please indicate the gender percentages in your class!');
				}
				else if(!$('input[name=white_pct]').val() || 
					!$('input[name=black_pct]').val() || 
					!$('input[name=asian_pct]').val() ||
					!$('input[name=na_pct]').val() ||
					!$('input[name=latino_pct]').val() ||
					!$('input[name=other_race_pct]').val() ||
					!$('input[name=total_race]').val()){
					alert('Please indicate the race percentages in your class!');
				}
				else if(!$('input[name=freshman_pct]').val() ||
					!$('input[name=sophomore_pct]').val() ||
					!$('input[name=junior_pct]').val() ||
					!$('input[name=senior_pct]').val() ||
					!$('input[name=other_standing_pct]').val() ||
					!$('input[name=total_standing]').val()){
					alert('Please indicate the standing percentages in your class!');
				}
				else if(!$('input[name=humanities_pct]').val() ||
					!$('input[name=social_pct]').val() ||
					!$('input[name=natural_pct]').val() ||
					!$('input[name=business_pct]').val() ||
					!$('input[name=premed_pct]').val() ||
					!$('input[name=prelaw_pct]').val() ||
					!$('input[name=eng_pct]').val() ||
					!$('input[name=other_major_pct]').val() ||
					!$('input[name=total_major]').val()){
					alert('Please indicate the major percentages in your class!');
				}
				//else if(!$('select[name=GPA]:selected').text()){
					//alert('Please select the average incoming GPA of your class!');
				//}
				else if(!$('input[name=first_gen]').val()){
					alert('Please indicate the percentage of first generation students in your class!');
				}
				else if(!$('input[name=num_semester]:checked').val()){
					alert('Please select the aveage number of semesters your students have spent taking classes in ' +subject_matter+"!");
				}
				else if(!$('input[name=major_pct]').val()){
					alert('Please indicate the percentage of students who have already declared a major!');
				}
				else{
					web_data.num_students = $('input[name=num_students]').val();
					web_data.avg_age = $('input[name=avg_age]').val();
					web_data.male_pct = $('input[name=male_pct]').val();
					web_data.female_pct = $('input[name=female_pct]').val();
					web_data.total_gen = $('input[name=total_gen]').val();
					web_data.white_pct = $('input[name=white_pct]').val();
					web_data.black_pct = $('input[name=black_pct]').val();
					web_data.asian_pct = $('input[name=asian_pct]').val();
					web_data.na_pct = $('input[name=na_pct]').val();
					web_data.latino_pct = $('input[name=latino_pct]').val();
					web_data.other_race_pct = $('input[name=other_race_pct]').val();
					web_data.total_race = $('input[name=total_race]').val();
					web_data.freshman_pct = $('input[name=freshman_pct]').val();
					web_data.sophomore_pct = $('input[name=sophomore_pct]').val();
					web_data.junior_pct = $('input[name=junior_pct]').val();
					web_data.senior_pct = $('input[name=senior_pct]').val();
					web_data.total_standing = $('input[name=total_standing]').val();
					web_data.humanities_pct = $('input[name=humanities_pct]').val();
					web_data.social_pct = $('input[name=social_pct]').val();
					web_data.natural_pct = $('input[name=natural_pct]').val();
					web_data.business_pct = $('input[name=business_pct]').val();
					web_data.premed_pct = $('input[name=premed_pct]').val();
					web_data.prelaw_pct = $('input[name=prelaw_pct]').val();
					web_data.eng_pct = $('input[name=eng_pct]').val();
					web_data.other_major_pct = $('input[name=other_major_pct]').val();
					web_data.total_major = $('input[name=total_major]').val();
					web_data.GPA = $('#GPA').find(":selected").text();
					web_data.first_gen = $('input[name=first_gen]').val();
					web_data.num_semester = $('input[name=num_semester]:checked').val();
					web_data.major_pct = $('input[name=major_pct]').val();
					console.log(web_data);
					nextSection(button_index);
				}
				break;
			default:
				console.log(button_index);
				nextSection(button_index);
		}
	}

	// Listener for Previous buttons
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

	// Listener for the Finish button
	function handle_finish(){
		// submit recorded data to the server
		try{
			$.post("https://web.stanford.edu/~fren/cgi-bin/handle_data.php",
				{data:JSON.stringify(web_data)});
		} catch(err){
      	console.log(err);
      }
	}

	function upload_syllabus(){
		// submit selected syllabus to be stored on server
		try{
			$.post("https://web.stanford.edu/~fren/cgi-bin/handle_upload.php",
				{data:TODO_file});
		} catch(err){
      	console.log(err);
      }
	}

	// Initialize the page and setting up section display properties 
	// as well as event listeners for button clicks
	// Consider simplifying code with JQuerry
	function initialize(){
		for (var i = 0; i < sections.length; i++) {
			sections[i].className = "hidden"; 
		}
		// display the first section
		sections[0].className = "normal";
		// using closure to make sure all buttons are properly set up
		// For all Next buttons
		for (var i = 0; i < next_buttons.length; i++) {
			(function (i){
				next_buttons[i].addEventListener('click', function(){
					handle_nextB_click(i);
				}, false);
			})(i);
		}
		// For all previous buttons
		for (var i = 0; i < previous_buttons.length; i++) {
			(function (i){
				previous_buttons[i].addEventListener('click', function(){
					handle_previousB_click(i);
			}, false);
			})(i);
		}
		// For all range sliders
		for (var i = 0; i < range_sliders.length; i++) {
			(function (i){
				range_sliders[i].addEventListener('change', function(){
					handle_slider(i);
				}, false);
			})(i);
		}
		// Setup Finish button to submit recorded data
		finish_button.addEventListener('click', function(){
			handle_finish();
			alert('Thank you for submitting your response! All data has been recorded and you can now close this page.');
		}, false);
	}

	initialize();
})
