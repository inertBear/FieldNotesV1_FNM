$.getScript('globalVarDependant.js');

$(document).ready(function () {

    //listen for the back button on the login page and close the app
    document.addEventListener("backbutton", function (e) {
        if ($.mobile.activePage.is('index.html')) {
            navigator.app.exitApp();
        }
        else {
            navigator.app.backHistory();
        }
    }, false);

    //when the login button is clicked
    $("#login_btn").click(function () {

        //get the username and password from the form
        var user = $("#username").val();
        var pass = $("#password").val();
        //TODO: get customer key from preferences. If not key (prompt for registration)
        customerKey = "5159616266";

        // create an Asynchronous call to the web service
        $.ajax({
            type: "POST",
            url: "http://www.fieldnotesfn.com/FNA_test/FNA_login.php",
            crossDomain: true,
            dataType: 'json',
            beforeSend: function () {
                //hide the button
                $("#login_btn").hide();
                //TODO: show a better loading animation
                $("#login_message").html("<img src='img/loader.gif'>");
            },
            complete: function () {
                $.mobile.loading('hide');
            },
            data: {
                username: user,
                password: pass,
                customerKey: customerKey
            },
            success: function (response) {
                //response is a JSON object defined as: {status: "status", message: "message}
                //if login success
                if (response.status === "success") {
                    //TODO: save current user (to preferences)
                    currentUsername = user;
                    //display success to UI
                    $("#login_message").css('color', 'green');
                    $("#login_message").html(response.message);
                    setTimeout(function () {
                        window.location.href = "welcome.html";
                    }, 100);
                }
                // if login failure
                if (response.status === "failure") {
                    //display failure to UI
                    $("#login_btn").show();
                    $("#login_message").html(response.message);
                }
            },
            error: function () {
                alert('SOMETHING WENT WRONG');
                $("#login_btn").show();
                $("#login_message").html("LOGIN ERROR: PLEASE CONTACT ADMIN");
            }
        });
        return false;
    });
});