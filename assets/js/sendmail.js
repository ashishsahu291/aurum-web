function onSubmitHandler() {
  const fName = $("#firstName").val();
  const lName = $("#lastName").val();
  const email = $("#email").val();
  const intrest = $("#intrest").val();
  const message = $("#message").val();
  let isValid = true;

  let spinnerText = `Sending.....`;

  console.log(`${fName}, ${lName}, ${email}, ${intrest}, ${message}`);

  if (fName == "" || fName == null) {
    isValid = false;
    $("#fNameError").html("First Name is mandatory!");
  }
  if (lName == "" || lName == null) {
    isValid = false;
    $("#lNameError").html("Last Name is mandatory!");
  }
  if (email == "" || email == null) {
    isValid = false;
    $("#emailError").html("Email is mandatory!");
  }
  if (intrest == "" || intrest == null) {
    isValid = false;
    $("#intrestError").html("Please Choose your area of intrest!");
  }
  if (message == "" || message == null) {
    isValid = false;
    $("#messageError").html("Message is mandatory!");
  }

  const url = "https://aurum-mail.herokuapp.com/api/email";

  if (isValid) {
    $("#sendButton").html(spinnerText);
    $("#sendButton").attr("disabled", true);
    $.ajax({
      type: "POST",
      dataType: "json",
      url: url,
      contentType: "application/json",
      data: JSON.stringify({
        firstName: fName,
        lastName: lName,
        email: email,
        area_of_intrest: intrest,
        message: message,
      }),
      success: function (response) {
        console.log(response);
        $("#contactForm")[0].reset();
        $("#successAlert").html(response.message);
        $("#successAlert").show();
        $("#sendButton").html("Send Message");
        $("#sendButton").attr("disabled", false);
      },
      error: function (error) {
        $("#errorAlert").html(error.message);
        $("#errorAlert").show();
        $("#sendButton").html("Send Message");
        $("#sendButton").attr("disabled", false);
      },
    });
  } else {
    setTimeout(() => {
      $(".error").html("");
    }, 3000);
  }

  // After success and error response hide the alert box after 5.0Sec
  setTimeout(() => {
    $("#successAlert").css("display", "none");
    $("#errorAlert").css("display", "none");
  }, 5000);
}
