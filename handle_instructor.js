$(window).load(function(){
	var s1 = document.getElementById("s1");
	var s2 = document.getElementById("s2");
	var s3 = document.getElementById("s3");
	var s4 = document.getElementById("s4");
	var s5 = document.getElementById("s5");
	var n1 = document.getElementById("n1");
	var n2 = document.getElementById("n2");
	var n3 = document.getElementById("n3");
	var n4 = document.getElementById("n4");
	var b1 = document.getElementById("b1");
	var b2 = document.getElementById("b2");
	var b3 = document.getElementById("b3");
	n1.onclick = function(){
		s1.className = "hidden";
		s2.className = "normal";
	}
	n2.onclick = function(){
		s2.className = "hidden";
		s3.className = "normal";
	}
	n3.onclick = function(){
		s3.className = "hidden";
		s4.className = "normal";
	}
	n4.onclick = function(){
		s4.className = "hidden";
		s5.className = "normal";
	}
	b1.onclick = function(){
		s2.className = "hidden";
		s1.className = "normal";
	}
	b2.onclick = function(){
		s3.className = "hidden";
		s2.className = "normal";
	}
	b3.onclick = function(){
		s4.className = "hidden";
		s3.className = "normal";
	}
})
