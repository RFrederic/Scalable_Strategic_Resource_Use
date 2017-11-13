$(window).load(function(){
	var dataUrl = "http://web.stanford.edu/~fren/SSRU/Processed_data/Patricia_demo.json";
	var data = [];
  var web_data = {};
	function ajaxCall(){
    return $.ajax({
      url: dataUrl,
      dataType: "json",
      async:false,
    });
  }
  ajaxCall().done(function(result){
      data = result;
    }).fail(function(){
      alert("An error occured calling ajax!");
    });
  console.log(data);
  var rss_list = []
  var course_code = data["class_title"];
  var exam_name = data["exam1name"];
  // Collect all study resources
  for(var key in data){
    if(key.indexOf('rss') !== -1){
      rss_list.push(data[key]);
    }
  }
  var rss_sec = document.getElementById('s1');
  var message = document.createElement('h3');

  message.innerText = "Please select the "
  +course_code
  +" resources that you think will help you prepare for "
  +exam_name
  +" effectively.";
  rss_sec.appendChild(message);

  for(i = 0; i<rss_list.length;i++){
    var block = document.createElement('div');
    block.class = "block_wrap";
    block.id = "rss_block"+i;

    var checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.name = "rss_list";
    checkbox.value = rss_list[i];
    checkbox.id = "rss"+i;

    var label = document.createElement('label');
    label.htmlFor = "rss"+i;
    label.appendChild(document.createTextNode(rss_list[i]));

    block.appendChild(checkbox);
    block.appendChild(label);
    rss_sec.appendChild(block);
  }


  var display = document.getElementById("data_display");
  display.innerText = JSON.stringify(data);
})