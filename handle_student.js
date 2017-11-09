$(window).load(function(){
	var dataUrl = "http://web.stanford.edu/~fren/SSRU/Processed_data/Test1.json";
	var data = [];
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
  var display = document.getElementById("data_display");
  display.innerText = JSON.stringify(data);
})