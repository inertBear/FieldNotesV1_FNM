
$(document).ready(function() {
	
	function stripHTMLElements(value) {

		var i = 0;
		var length = value.length;

		for(i; i < length; i++) {
			value = value.replace(",", ";");
		}
    	return value; 		       
	}

	$("#back_btn").click(function () {
        window.location.href = "welcome.html";
        return false;
	});

	$("#data_submit_btn").click(function() {
		
		//var name = currentUsername;
		var wellName = stripHTMLElements($("#wellName").val());
		var dateStart = stripHTMLElements($("#dateStart").val());
		var timeStart = stripHTMLElements($("#timeStart").val());
		var mileageStart = stripHTMLElements($("#mileageStart").val());
		var description = stripHTMLElements($("#description").val());
		var mileageEnd = stripHTMLElements($("#mileageEnd").val());
		var dateEnd = stripHTMLElements($("#dateEnd").val());
		var timeEnd = stripHTMLElements($("#timeEnd").val());
		var projectNumber = stripHTMLElements($("#projectNumber").val());
		var location = stripHTMLElements($("#location").val());
		var gps = stripHTMLElements($("#gps").val()); 
		var billing = stripHTMLElements($("#billing").val());

		description = description.replace(/\n/g, ". ");

		if(/*name != "" && */wellName != "" && dateStart != "" && timeStart != "" && mileageStart != "" && description != "" && mileageEnd != "" && dateEnd != "" && timeEnd != "" && projectNumber != "" && location != ""){									
			
			$.ajax({
		    	type        : "POST",
		    	url         : "http://www.fieldnotesfn.com/FieldNotesMobile_CustomWebService_PHP/FieldNotes_data_ajax_6_10_2017.php",
		        crossDomain : true,
		        dataType	: 'json',
		        beforeSend  : function(){	
		        				$("#data_submit_btn").hide();
								$("#data_message").html("<img src='img/loader.gif'>");
							  },
		        complete    : function(){	
		        				$.mobile.loading('hide')
		    				  },
		        data        : {/*userName: name, */wellName : wellName, dateStart: dateStart, timeStart: timeStart, mileageStart: mileageStart, description: description, 
		        				mileageEnd: mileageEnd, dateEnd: dateEnd, timeEnd: timeEnd, projectNumber: projectNumber, location: location, gps: gps, billing: billing},
		        success     : function(response) {
		        				if(response == "1"){
		        					$("#data_message").css('color', 'green');
					        		$("#data_message").html("data submitted successfully, Returning...")
					            	setTimeout(function() {
					            		window.location.href = "welcome.html";
					            	}, 3000);
					            }
					            if(response == "2") {
					            	$("#data_submit_btn").show();
					            	$("#data_message").html("Error: Data NOT submitted");
					            	$("#data_error_message").html("Error: Data NOT submitted");
					            }
		        			  },
				  error     : function() {
						        alert('SOMETHING WENT WRONG WITH THE SERVER');
						        $("#data_submit_btn").show();
						        $("#data_message").html("ERROR: PLEASE CONTACT ADMIN");
						        $("#data_error_message").html("ERROR: PLEASE CONTACT ADMIN");
						        //email admin of error details??
		          			}		        
			});
		} else {
			$("#data_message").html("Important Invoice data is missing. Please complete form.");
			$("#data_error_message").html("Important Invoice data is missing. Please complete form.");
		}

    	return false;
	});
});
