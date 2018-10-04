$(document).ready(function () {

    function stripHTMLElements(value) {
        var i = 0;
        var length = value.length;

        for (i; i < length; i++) {
            value = value.replace(",", ";");
        }
        return value;
    }

    $("#back_btn").click(function () {
        window.location.href = "welcome.html";
        return false;
    });

    //press submit button to add new FieldNote
    $("#data_submit_btn").click(function () {

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

        //if all fields are valid
        if (wellName !== "" && dateStart !== "" && timeStart !== "" && mileageStart !== "" && description !== "" &&
            mileageEnd !== "" && dateEnd !== "" && timeEnd !== "" && projectNumber !== "" && location !== "") {
            $.ajax({
                type: "POST",
                url: "http://www.fieldnotesfn.com/FNA_test/FNA_addNote.php",
                crossDomain: true,
                dataType: 'json',
                beforeSend: function () {
                    $("#data_submit_btn").hide();
                    $("#data_message").html("<img src='img/loader.gif'>");
                },
                complete: function () {
                    $.mobile.loading('hide');
                },
                data: {
                    userName: currentUsername,
                    wellName: wellName,
                    dateStart: dateStart,
                    timeStart: timeStart,
                    mileageStart: mileageStart,
                    description: description,
                    mileageEnd: mileageEnd,
                    dateEnd: dateEnd,
                    timeEnd: timeEnd,
                    projectNumber: projectNumber,
                    location: location,
                    gps: gps,
                    billing: billing,
                    customerKey: customerKey
                },
                success: function (response) {
                    if (response.status === "success") {
                        $("#data_message").css('color', 'green');
                        $("#data_message").html(response.message);
                        setTimeout(function () {
                            window.location.href = "welcome.html";
                        }, 100);
                    }
                    if (response.status === "failure") {
                        $("#data_submit_btn").show();
                        $("#data_message").html(response.message);
                        $("#data_error_message").html(response.message);
                    }
                },
                error: function () {
                    alert('SOMETHING WENT WRONG');
                    $("#data_submit_btn").show();
                    $("#data_message").html("ERROR: PLEASE CONTACT ADMIN");
                    $("#data_error_message").html("ERROR: PLEASE CONTACT ADMIN");
                }
            });
        } else {
            $("#data_message").html("Important Invoice data is missing. Please complete form.");
            $("#data_error_message").html("Important Invoice data is missing. Please complete form.");
        }
        return false;
    });
});
