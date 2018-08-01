$(document).ready(function() {

	var editData = JSON.parse(window.localStorage.getItem("editData"));
	var editTicketNumber = editData[0];

	//document.getElementById("editUserName").value = editData[1];
	document.getElementById("editWellName").value = editData[2];
	document.getElementById("editDateStart").value = dateParser(editData[3]);
	document.getElementById("editTimeStart").value = timeParser(editData[4]);
	document.getElementById("editMileageStart").value = numberParser(editData[5]);
	document.getElementById("editDescription").value = editData[6];
	document.getElementById("editMileageEnd").value = numberParser(editData[7]);
	document.getElementById("editDateEnd").value = dateParser(editData[8]);
	document.getElementById("editTimeEnd").value = timeParser(editData[9]);
	document.getElementById("editProjectNumber").value = editData[10];
	document.getElementById("editLocation").value = editData[11];
	document.getElementById("editGps").value = editData[12];
	document.getElementById("editBilling").value = editData[13];

	window.localStorage.clear();

	function dateParser(dateString){
		var date = moment(dateString, "YYYY-MM-DD").format("YYYY-MM-DD");
    	return date;
	}

	function timeParser(timeString){
		var time = moment(timeString, "HH:mm").format("HH:mm");
		return time;
	}

	function numberParser(numberString){
		var number = parseInt(numberString);
		return number;
	}

	function stripHTMLElements(value) {

		var i = 0;
		var length = value.length;

		for(i; i < length; i++) {
			value = value.replace(",", ";");
		}
    	return value; 		       
	}

	$("#back_btn").click(function () {
        window.location.href = "search-dynamic.html";
        return false;
	});

	$("#update_btn").click(function () {

		var editWellName = stripHTMLElements($("#editWellName").val());
		var editDateStart = stripHTMLElements($("#editDateStart").val());
		var editTimeStart = stripHTMLElements($("#editTimeStart").val());
		var editMileageStart = stripHTMLElements($("#editMileageStart").val());
		var editDescription = stripHTMLElements( $("#editDescription").val());
		var editMileageEnd = stripHTMLElements($("#editMileageEnd").val());
		var editDateEnd = stripHTMLElements($("#editDateEnd").val());
		var editTimeEnd = stripHTMLElements($("#editTimeEnd").val());
		var editProjectNumber = stripHTMLElements($("#editProjectNumber").val());
		var editLocation = stripHTMLElements($("#editLocation").val());
		var editGps = stripHTMLElements($("#editGps").val()); 
		var editBilling = stripHTMLElements($("#editBilling").val());

		if(editWellName != "" && editDateStart != "" && editTimeStart != "" && editMileageStart != "" && editDescription != "" && editMileageEnd != ""
			 && editDateEnd != "" && editTimeEnd != "" && editProjectNumber != "" && editLocation != "" && editBilling != ""){
													
			$.ajax({
		    	type        : "POST",
		    	url         : "http://www.fieldnotesfn.com/FieldNotesMobile_CustomWebService_PHP/FieldNotes_edit_ajax_8_19_2017.php", //check url
		        crossDomain : true,
		        dataType	: 'json',
		        beforeSend  : function(){	
		        				$("#update_btn").hide();
								$("#edit_data_message").html("<img src='img/loader.gif'>");
							  },
		        complete    : function(){	
		        				$.mobile.loading('hide')
		    				  },
		        data        : {ticketNumber: editTicketNumber, wellName: editWellName, dateStart: editDateStart, timeStart: editTimeStart, mileageStart: editMileageStart, description: editDescription, 
		        				mileageEnd: editMileageEnd, dateEnd: editDateEnd, timeEnd: editTimeEnd, projectNumber: editProjectNumber, location: editLocation, gps: editGps, billing: editBilling},
		        success     : function(response) {
		        				if(response == "1"){
		        					$("#edit_data_message").css('color', 'green');
					        		$("#edit_data_message").html("data updated successfully, Returning...");
					            	setTimeout(function() {
					            		window.location.href = "welcome.html";
					            	}, 3000);
					            }
					            if(response == "2") {
					            	$("#update_btn").show();
					            	$("#edit_data_message").html("Error: Data NOT updated");
					            	//$("#edit_data_error_message").html("Error: Data NOT updated");
					            }
		        			  },
				  error     : function() {
						        alert('SOMETHING WENT WRONG WITH THE SERVER');
						        $("#update_btn").show();
						        $("#edit_data_message").html("CONNECTION ERROR: PLEASE CONTACT ADMIN");
						        //$("#data_error_message").html("CONNECTION ERROR: PLEASE CONTACT ADMIN");
						        //email admin of error details??
		          			}		        
			});
		} else {
			$("#edit_data_message").html("Important Invoice data is missing. Please complete form.");
			//$("#data_error_message").html("Important Invoice data is missing. Please complete form.");
		}

    	return false;
	});

});