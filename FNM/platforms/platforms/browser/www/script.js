$(document).ready(function(){
	
	$("#login_btn").click(function() {
				
		$("#login_btn").hide();
		$("#login_message").html("<img src='images/loader.gif'>");


		var user = $("#username").val();
		var pass = $("#password").val();
		//alert(user + " & " + pass);

		$.ajax({
		    	type       : "POST",
		    	url        : "http://www.glyfbuttons.com/test/login_ajax.php",
		        crossDomain: true,
		        beforeSend : function() {$.mobile.loading('show')},
		        complete   : function() {$.mobile.loading('hide')},
		        data       : {username : user, password : pass},
		        success    : function(response) {
		            alert('Logged In!');
		            window.location.href = "welcome.html";
		        },
		        error      : function() {
		            alert('Error!');
		        }
    	});
    	return false;
	});
});