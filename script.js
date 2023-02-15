
$(document).ready(function () {
    const APIKEY = "63df7e923bc6b255ed0c469a";

    $("#signup-submit").on("click", function (e) {
        e.preventDefault();

        let signupName = $("#signup-name").val();
        let signupEmail = $("#signup-email").val();
        let signupPassword = $("#signup-password").val();

        let jsondata = {
            "name": signupName,
            "email": signupEmail,
            "password": signupPassword
        };

        let settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://realfeesh-e937.restdb.io/rest/user-profile",
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                "x-apikey": APIKEY,
                "cache-control": "no-cache"
            },
            "processData": false,
            "data": JSON.stringify(jsondata),
            "beforeSend": function () {
                $("#signup-submit").prop("disabled", true);
            }
        }

        $.ajax(settings).done(function (response) {
            console.log(response);
            $("#signup-submit").prop("disabled", false);
            alert("Sign Up Successful!");
            window.location.href = "signin.html";
        });

    });

    $("#signin-submit").on("click", function (e) {
        e.preventDefault();
        $(".signin-form").hide();
        $(".loading").show();

        let signinEmail = $("#signin-email").val();
        let signinPassword = $("#signin-password").val();

        let jsondata = {
            "email": signinEmail,
            "password": signinPassword,
        };

        let settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://realfeesh-e937.restdb.io/rest/user-profile",
            "method": "GET",
            "headers": {
                "content-type": "application/json",
                "x-apikey": APIKEY,
                "cache-control": "no-cache"
            },
            "processData": false,
            "data": JSON.stringify(jsondata),
            "beforeSend": function () {
                $("#signin-submit").prop("disabled", true);
            }
        }

        $.ajax(settings).done(function (response) {
            $("#signin-submit").prop("disabled", false);
            var success = false;
            for (i = 0; i < response.length; i++) {
                if (response[i].email == signinEmail && response[i].password == signinPassword) {
                    success = true;
                    window.location.href = "index.html";
                    sessionStorage.setItem("user", response[i]._id);
                    break;
                } else {
                    success = false;
                }
            }
            if (success == false) {
                $(".signin-form").show();
                $(".loading").hide();
                alert("Invalid Email or Password.");
            }
        });
    });
})
