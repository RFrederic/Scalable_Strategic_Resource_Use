$(window).load(function(){
	var s1 = document.getElementById("s1");
	var s2 = document.getElementById("s2");
	var s3 = document.getElementById("s3");
	var s4 = document.getElementById("s4");
	var s5 = document.getElementById("s5");
	var s6 = document.getElementById("s6");
	var s7 = document.getElementById("s7");
	var sl = document.getElementById("sl");
	var n1 = document.getElementById("n1");
	var n2 = document.getElementById("n2");
	var n3 = document.getElementById("n3");
	var n4 = document.getElementById("n4");
	var n5 = document.getElementById("n5");
	var n6 = document.getElementById("n6");
	var n7 = document.getElementById("n7");
	var b1 = document.getElementById("b1");
	var b2 = document.getElementById("b2");
	var b3 = document.getElementById("b3");
	var b4 = document.getElementById("b4");
	var b5 = document.getElementById("b5");
	var b6 = document.getElementById("b6");
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
	n5.onclick = function(){
		s5.className = "hidden";
		s6.className = "normal";
	}
	n6.onclick = function(){
		s6.className = "hidden";
		s7.className = "normal";
	}
	n7.onclick = function(){
		s7.className = "hidden";
		sl.className = "normal";
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
	b4.onclick = function(){
		s5.className = "hidden";
		s4.className = "normal";
	}
	b5.onclick = function(){
		s6.className = "hidden";
		s5.className = "normal";
	}
	b6.onclick = function(){
		s7.className = "hidden";
		s6.className = "normal";
	}
})
