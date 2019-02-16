// TODO fix all of the javascript recovery

// Get references to page elements
// var modalSubmit = $("#modal-submit");
// var $exampleDescription = $("#example-description");
// var $submitBtn = $("#submit");
// var $exampleList = $("#example-list");

$(document).ready(function() {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBikFIfVDs1cKfQC646rJIHDDaFR4b2WCI",
    authDomain: "art-portfolio-project02.firebaseapp.com",
    databaseURL: "https://art-portfolio-project02.firebaseio.com",
    projectId: "art-portfolio-project02",
    storageBucket: "art-portfolio-project02.appspot.com",
    messagingSenderId: "217185611797"
  };
  firebase.initializeApp(config);
  // The API object contains methods for each kind of request we'll make
  var API = {
    saveArtwork: function(artwork) {
      return $.ajax({
        headers: {
          "Content-Type": "application/json"
        },
        type: "POST",
        url: "api/artwork",
        data: JSON.stringify(artwork)
      });
    },
    saveCommissionRequest: function(commissionrequest) {
      return $.ajax({
        headers: {
          "Content-Type": "application/json"
        },
        type: "POST",
        url: "api/commission%20request",
        data: JSON.stringify(commissionrequest)
      });
    },
    getArtwork: function() {
      return $.ajax({
        url: "api/artwork",
        type: "GET"
      });
    },
    getCommissionRequest: function() {
      return $.ajax({
        url: "api/commission%20request",
        type: "GET"
      });
    }
    // Update functionality can be added as needed
  };

  $("#modal-submit").click(function() {
    var name = $("#icon_prefix").val();
    var phone = $("#icon_telephone").val();
    var email = $("#icon_email").val();
    var description = $("#textarea1").val();
    var imageFile = $("#icon_attach_file")[0].files[0];
    var imageType = imageFile.type;

    // Firebase variables for file upload
    // File metadata
    var metaData = {
      contentType: imageType
    };
    var storageRef = firebase.storage().ref();

    // A variable for uploading to the commissionExamples
    var uploadTask = storageRef
      .child("commissionExamples/" + imageFile.name)
      .put(imageFile, metaData);

    // Listen for state changes, errors, and completion of upload
    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      function(snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        if (progress === 100) {
          uploadIsDone();
        }
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED:
            console.log("Upload is paused.");
            break;
          case firebase.storage.TaskState.RUNNING:
            console.log("Upload is running.");
            break;
        }
      },
      function(error) {
        // Log the error code a list can be found at
        // https://irebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            alert(
              "User is not authorized to access this database, or file type is incorrect."
            );
            break;
          case "storage/canceled":
            console.log("User has cancelled the upload.");
            break;
          case "storage/unknown":
            console.log(
              "This is an unknown error. Please inspect error.serverResponse."
            );
            break;
        }
      }
    );
    function uploadIsDone() {
      // Grab the download URL after upload
      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        var commissionrequest = {
          name: name,
          requestDetails: description,
          referenceImgURL: downloadURL,
          phone: phone,
          email: email
        };
        $("#icon_prefix").val("");
        $("#icon_telephone").val("");
        $("#icon_email").val("");
        $("#textarea1").val("");
        $("#icon_attach_file").val("");
        API.saveCommissionRequest(commissionrequest);
        alert("Commission request submitted successfully.");
      });
    }
  });
});
