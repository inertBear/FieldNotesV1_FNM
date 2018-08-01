$(document).ready(function() {

	var tempPreParsedValue= "";

	$("#back_btn").click(function () {
        window.location.href = "welcome.html";
        return false;
	});

	function addButton(ticketNumber, editDataResults){
		//PARSE THE PASSED-IN STRING
		//var parsedTicketNumber = parseArray(preParsedValue);
		
		/*var parsedUser = parseArray(tempPreParsedValue);
		**var parsedWell = parseArray(tempPreParsedValue);
		**var parsedDateStart = parseArray(tempPreParsedValue);
		**var parsedTimeStart = parseArray(tempPreParsedValue);
		**var parsedStartMileage = parseArray(tempPreParsedValue);
		**var parsedDescription = parseArray(tempPreParsedValue);
		**var parsedEndMileage = parseArray(tempPreParsedValue);
		**var parsedDateEnd = parseArray(tempPreParsedValue);
		**var parsedTimeEnd = parseArray(tempPreParsedValue);
		**var parsedProject = parseArray(tempPreParsedValue);
		**var parsedLocation = parseArray(tempPreParsedValue);
		**var parsedGPS = parseArray(tempPreParsedValue);
		**var parsedBilling = parseArray(tempPreParsedValue);
		*/

		//var value = "Edit Ticket: " + parsedTicketNumber;
		var value = "Edit Ticket: " + ticketNumber;

		/*+ parsedTicket + " UserName: " + parsedUser + "  WellName: " + parsedWell 
		**	+ "  Date Start: " + parsedDateStart + "  Time Start: " + parsedTimeStart + "  Mileage Start: " + parsedStartMileage 
		**	+ "  Description: " + parsedDescription + "  Mileage End: " + parsedEndMileage + "  Date End: " + parsedDateEnd
		**	+ "  Time End: " + parsedTimeEnd + "  Project Number: " + parsedProject + "  Location: " + parsedLocation 
		**	+ "  GPS: " + parsedGPS + "  " + parsedBilling;
		*/

		//create input type dynamically
		var element = document.createElement("input");
		//assign attribute to the element
		element.setAttribute("type", "button");
		element.setAttribute("value", value); //data pulled from server and parsed for structure
		element.setAttribute("class", "dynamicButton");
		element.onclick = function() {
							window.localStorage.setItem("editData", JSON.stringify(editDataResults));
							window.location.href = "edit.html";
						}

		var location = document.getElementById("search_results");

		//Append the element in the page (in span)
		location.appendChild(element);
	}

	function parseArray(preParsedValue){
		//find the next comma
		var parsedValue = "";
		var index = preParsedValue.indexOf(",");
		if(index < 0){
			parsedValue = preParsedValue.substr(index + 1);
		} else {
			//collect the first variable
			parsedValue = preParsedValue.substr(0, preParsedValue.indexOf(','));
			//save the remaining parts of the array
			tempPreParsedValue = preParsedValue.substr(index + 1);
		}
		return parsedValue;
	}

	/*function parseArray(preParsedValue){
		//find the next comma
		var parsedValue = "";
		var index = preParsedValue.indexOf(",");
		if(index < 0){
			parsedValue = preParsedValue.substr(index + 1);
		} else {
			//collect the first variable
			parsedValue = preParsedValue.substr(0, preParsedValue.indexOf(','));
			//save the remaining parts of the array
			tempPreParsedValue = preParsedValue.substr(index + 1);
		}
		return parsedValue;
	}*/

	$("#search_btn").click( function() {	
		//var wellName = $("#wellNameSearch").val();
		var dateStart = $("#dateStartRangeSearch").val();
		var dateEnd = $("#dateEndRangeSearch").val();

		if((dateStart != "") && (dateEnd != "")){													
			$.ajax({
				type 		: "POST",
				dataType	: "JSON",
		    	url         : "http://www.fieldnotesfn.com/FieldNotesMobile_CustomWebService_PHP/FieldNotes_search_ajax_6_10_2017.php",
		        crossDomain : true,
		        beforeSend  : function(){	
		        				$("#search_results_buttons").html("");
		        				$("#search_btn").hide();
		        				$("#search_message").css('color', 'green');
								$("#search_message").html("searching..");
							  },
		        data        : {/*wellName: wellName,*/ dateStart: dateStart, dateEnd: dateEnd },
		        complete    : function(){	
		        				$.mobile.loading('hide');
		    				  },
		        success     : function(response) {
	        					$("#search_results").empty();
        						$("#search_message").hide();

        						//IF THERE IS ONLY ONE ROW ASSOCIATED WITH THE USERNAME SEARCHED
        						if(Object.keys(response).length == 14){
	        						setTimeout(function() {
	        							var searchTicketNumber = "";
	        							var searchResults = [];
		        						var count = 0;
	        							$("#search_btn").show();
	        							$("#search_results").css('color', 'blue');

	        							$.each(response, function(index, data){
		        							if(data == ""){
		        								data = "no data";
		        							}
		        							if(count < 13){
			        							switch (count) {
			        								case 0 :
			        									break;
		        									case 1 :
		        										$("#search_results").append("<br />" + "USERNAME: ");
		        										break;
		        									case 2 :
		        										$("#search_results").append("WELL NAME: ");
		        										break;
		        									case 3 :
		        										$("#search_results").append("START DATE: ");
		        										break;
		        									case 4 :
		        										$("#search_results").append("START TIME: ");
		        										break;
		        									case 5 :
		        										$("#search_results").append("MILEAGE START: ");
		        										break;
		        									case 6 :
		        										$("#search_results").append("DESCRIPTION: ");
		        										break;
		        									case 7 :
		        										$("#search_results").append("MILEAGE END: ");
		        										break;
		        									case 8 :
		        										$("#search_results").append("END DATE: ");
		        										break;
		        									case 9 :
		        										$("#search_results").append("END TIME: ");
		        										break;
		        									case 10:
		        										$("#search_results").append("PROJECT NUMBER: ");
		        										break;
		        									case 11:
		        										$("#search_results").append("LOCATION: ");
		        										break;
		        									case 12:
		        										$("#search_results").append("GPS: ");
		        										break;
		        									case 13:
		        										$("#search_results").append("BILLING: ");
		        										break;
		        									default:
		        										$("#search_results").append("scripting error: contact ADMIN ");
		        										break;
					        					}
					        					if (count == 0){
					        						//searchTicketNumber.push(data);
					        						searchTicketNumber = data.toString();
					        						searchResults.push(data);
						        					//addButton(searchTicketNumber.toString());
						        				} else{
						        					searchResults.push(data);
						        					$("#search_results").append(data + "<br />");
						        				}
						        				count++;
					        				} else {
					        					count = 0;
					        					searchResults.push(data);
					        					$("#search_results").append(data + "<br />");

					        					addButton(searchTicketNumber, searchResults);
					        					//addButton(searchTicketNumber.toString(), searchResults);

					        				}					        			
					        			});							        			
	        						}, 100);
        						
	        					} else if(Object.keys(response).length == 0){
	        						$("#search_results").empty();
					            	$("#search_message").css('color', 'red');
					            	$("#search_message").html("No records found!");
					            	$("#search_message").show();
					            	$("#search_btn").show();
	        					
        						//IF THERE ARE MULTIPLE ROWS ASSOCIATED WITH THE USERNAME SEARCHED
        						} else {
	        						setTimeout(function() {
	        							var multiSearchTicketNumber = "";
	        							var multiSearchResults = new Array;
	        							var count = 0;

	        							$("#search_btn").show();
	        							$("#search_results").css('color', 'blue');
		        						
		        						$.each(response, function(index, data){
		        							$.each(this, function(i, d){
		        								if(d == ""){
		        									d = "no data";
		        								}

		        								if(count < 13){
				        							switch (count) {
				        								case 0 :
				        									break;
			        									case 1 :
			        										$("#search_results").append("<br />" + "USERNAME: ");
			        										break;
			        									case 2 :
			        										$("#search_results").append("WELL NAME: ");
			        										break;
			        									case 3 :
			        										$("#search_results").append("START DATE: ");
			        										break;
			        									case 4 :
			        										$("#search_results").append("START TIME: ");
			        										break;
			        									case 5 :
			        										$("#search_results").append("MILEAGE START: ");
			        										break;
			        									case 6 :
			        										$("#search_results").append("DESCRIPTION: ");
			        										break;
			        									case 7 :
			        										$("#search_results").append("MILEAGE END: ");
			        										break;
			        									case 8 :
			        										$("#search_results").append("END DATE: ");
			        										break;
			        									case 9 :
			        										$("#search_results").append("END TIME: ");
			        										break;
			        									case 10:
			        										$("#search_results").append("PROJECT NUMBER: ");
			        										break;
			        									case 11:
			        										$("#search_results").append("LOCATION: ");
			        										break;
			        									case 12:
			        										$("#search_results").append("GPS: ");
			        										break;
			        									case 13:
		        											$("#search_results").append("BILLING: ");
		        											break;
			        									default:
			        										$("#search_results").append("scripting error: contact ADMIN ");
			        										break;
			        								}
													if (count == 0){
					        							multiSearchTicketNumber = d.toString();
					        							multiSearchResults.push(d);

					        							//multiSearchTicketNumber.push(d);
						        						//addButton(multiSearchTicketNumber.toString());
						        					} else{
						        						multiSearchResults.push(d);
						        						$("#search_results").append(d + "<br />");
						        					}
				        							count++;
			        							} else { 
			        								count = 0;
			        								multiSearchResults.push(d);
			        								$("#search_results").append(d + "<br />");
					        						
			        								addButton(multiSearchTicketNumber, multiSearchResults);
			        								//addButton(multiSearchTicketNumber.toString());
			        							}	
		        							});
		        							multiSearchTicketNumber = [];
		        							multiSearchResults = [];
		        						
		        						});	

			        				}, 100);
		        			 	}
		        			},
				 error      : function() {
				  				$("#search_results").empty();
						        $("#search_btn").show();
						        $("#search_message").css('color', 'red');
						        $("#search_message").html("Server Error: Contact Admin");
							},
				timeout  	: 5000
			});
		          					        
		} else {
			$("#search_message").css('color', 'red');
			$("#search_message").html("Please enter a Date Range.");
		}

    	return false;
    });
});