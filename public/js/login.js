// Functionality for addind new users to database, and for logging in

$("#new-user-submit").on("click", function() {
  // Salty password goodness
  var unsaltedPass = $("#passWord").val();
  // Add a new user and hash their password
  var newUser = {
    userName: $("#user-name").val(),
    password: unsaltedPass
  };
  // Send to db, and clear all variables
  $.post("/api/users", newUser);
  $("#login-form").trigger("reset");
});

$("#login-submit").on("click", function() {
  // Grab the user information
  $.get(
    "/api/users",
    { userName: $("#user-name").val(), password: $("#passWord").val() },
    function(data) {
      if (data === true) {
        window.location = "/admin";
      } else {
        alert("User Name or Password is incorrect.");
      }
    }
  );
  $("#login-form").trigger("reset");
});
