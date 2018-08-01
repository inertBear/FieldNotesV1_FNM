$.getScript( 'globalVarDependant.js');

$(document).ready(function() {

	document.addEventListener("backbutton", function(e){
	    if($.mobile.activePage.is('index.html')){
	        /* 
	         Event preventDefault/stopPropagation not required as adding backbutton
	          listener itself override the default behaviour. Refer PhoneGap
	        */
	        //e.preventDefault();
	        navigator.app.exitApp();
	    }
	    else {
	        navigator.app.backHistory()
	    }
	}, false);
	
	$("#login_btn").click(function() {
				
		var user = $("#username").val();
		var pass = $("#password").val();
		if(user != "" && pass != ""){
			$.ajax({
		    	type        : "POST",
		    	url         : "http://www.fieldnotesfn.com/FieldNotesMobile_CustomWebService_PHP/FieldNotes_login_ajax_6_10_2017.php",
		        crossDomain : true,
		        dataType	: 'json',
		        beforeSend  : function(){	
		        				$("#login_btn").hide();
								$("#login_message").html("<img src='img/loader.gif'>");
							  },
		        complete    : function(){	
		        				$.mobile.loading('hide')
		    				  },
		        data        : {username : user, password : pass},
		        success     : function(response) {
		        				if(response == "1"){
		        					currentUsername = user;
		        					$("#login_message").css('color', 'green');
					        		$("#login_message").html("logged in, redirecting...")
					            	setTimeout(function() {
					            		window.location.href = "welcome.html";
					            	}, 500);
					            }
					            if(response == "2") {
					            	$("#login_btn").show();
					            	$("#login_message").html("Incorrect username or password");
					            }
		        			  },
    			  error     : function() {
						        alert('SOMETHING WENT WRONG');
						        $("#login_btn").show();
						        $("#login_message").html("LOGIN ERROR: PLEASE CONTACT ADMIN");
						        //email admin of error details??
		          }		        
	    	});
		} else {
			$("#login_message").html("Please enter Username AND Password");
		}
    	return false;
	});
});