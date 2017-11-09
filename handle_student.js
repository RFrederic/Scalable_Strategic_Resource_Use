$(window).load(function(){
	var dataUrl = "http://web.stanford.edu/~fren/SSRU/Processed_data/Test1.json";
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
  console.log(Object.keys(data).length);
})