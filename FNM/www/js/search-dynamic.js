$(document).ready(function () {

    $("#back_btn").click(function () {
        window.location.href = "welcome.html";
        return false;
    });

    // dynamically add buttons to the web page for each new search result(Homemade ListView)
    function addButton(ticketNumber, editDataResults) {
        var value = "Edit Ticket: " + ticketNumber;

        //create input type dynamically
        var element = document.createElement("input");
        //assign attribute to the element
        element.setAttribute("type", "button");
        element.setAttribute("value", value); //data pulled from server and parsed for structure
        element.setAttribute("class", "dynamicButton");
        element.onclick = function () {
            window.localStorage.setItem("editData", JSON.stringify(editDataResults));
            window.location.href = "edit.html";
        };

        var location = document.getElementById("search_results");

        //Append the element in the page (in span)
        location.appendChild(element);
    }

    // press the search button
    $("#search_btn").click(function () {
        var dateStart = $("#dateStartRangeSearch").val();
        var dateEnd = $("#dateEndRangeSearch").val();

        if ((dateStart !== "") && (dateEnd !== "")) {
            $.ajax({
                type: "POST",
                dataType: "JSON",
                url: "http://www.fieldnotesfn.com/FNA_test/FNA_searchNote.php",
                crossDomain: true,
                beforeSend: function () {
                    $("#search_results_buttons").html("");
                    $("#search_btn").hide();
                    $("#search_message").css('color', 'green');
                    $("#search_message").html("searching..");
                },
                data: {
                    userName: currentUsername,
                    dateStart: dateStart,
                    dateEnd: dateEnd
                },
                complete: function () {
                    $.mobile.loading('hide');
                },
                success: function (response) {
                    //clear the previous results
                    $("#search_results").empty();
                    $("#search_message").hide();

                    //TODO: clean this up. the data we searched for is an array -> response.message
                    //IF THERE IS ONLY ONE ROW ASSOCIATED WITH THE USERNAME SEARCHED
                    if (Object.keys(response).length == 14) {
                        //if one result is found
                        setTimeout(function () {
                            var searchTicketNumber = "";
                            var searchResults = [];
                            var count = 0;
                            $("#search_btn").show();
                            $("#search_results").css('color', 'blue');

                            $.each(response, function (index, data) {
                                if (data == "") {
                                    data = "no data";
                                }
                                if (count < 13) {
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
                                    if (count == 0) {
                                        searchTicketNumber = data.toString();
                                        searchResults.push(data);
                                    } else {
                                        searchResults.push(data);
                                        $("#search_results").append(data + "<br />");
                                    }
                                    count++;
                                } else {
                                    count = 0;
                                    searchResults.push(data);
                                    $("#search_results").append(data + "<br />");

                                    addButton(searchTicketNumber, searchResults);
                                }
                            });
                        }, 100);

                    } else if (Object.keys(response).length == 0) {
                        //if no results were found
                        $("#search_results").empty();
                        $("#search_message").css('color', 'red');
                        $("#search_message").html("No data found");
                        $("#search_message").show();
                        $("#search_btn").show();

                        //IF THERE ARE MULTIPLE ROWS ASSOCIATED WITH THE USERNAME SEARCHED
                    } else {
                        //if lots of results are found
                        setTimeout(function () {
                            var multiSearchTicketNumber = "";
                            var multiSearchResults = [];
                            var count = 0;

                            $("#search_btn").show();
                            $("#search_results").css('color', 'blue');

                            $.each(response, function (index, data) {
                                $.each(this, function (i, d) {
                                    if (d == "") {
                                        d = "no data";
                                    }

                                    if (count < 13) {
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
                                        if (count == 0) {
                                            multiSearchTicketNumber = d.toString();
                                            multiSearchResults.push(d);
                                        } else {
                                            multiSearchResults.push(d);
                                            $("#search_results").append(d + "<br />");
                                        }
                                        count++;
                                    } else {
                                        count = 0;
                                        multiSearchResults.push(d);
                                        $("#search_results").append(d + "<br />");

                                        addButton(multiSearchTicketNumber, multiSearchResults);
                                    }
                                });
                                multiSearchTicketNumber = [];
                                multiSearchResults = [];

                            });

                        }, 100);
                    }
                },
                error: function () {
                    $("#search_results").empty();
                    $("#search_btn").show();
                    $("#search_message").css('color', 'red');
                    $("#search_message").html("Server Error: Contact Admin");
                },
                timeout: 5000
            });

        } else {
            $("#search_message").css('color', 'red');
            $("#search_message").html("Please enter a Date Range.");
        }

        return false;
    });
});