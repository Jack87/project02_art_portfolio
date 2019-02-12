$(document).ready(function() {
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
    saveArtwork: function(artwork, callback) {
      return $.ajax({
        headers: {
          "Content-Type": "application/json"
        },
        type: "POST",
        url: "api/artwork",
        data: JSON.stringify(artwork)
      }).done(function() {
        callback();
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
  $("#uploadImage").click(function() {
    console.log($("#imageFile")[0].files[0].type);
    var title = $("#title").val();
    var category = $("#category").val();
    var date = $("#date").val();
    var description = $("#descriptionText").val();
    var onCarousel = $("#onCarousel").val();
    var price = 0;
    var artist = "";
    var size = "";
    var medium = "";
    var imageFile = $("#imageFile")[0].files[0];
    var imageType = imageFile.type;

    // Firebase variables for file upload
    // File metadata
    var metaData = {
      contentType: imageType
    };
    var storageRef = firebase.storage().ref();

    // A variable for uploading to the commissionExamples
    var uploadTask = storageRef
      .child("/" + imageFile.name)
      .put(imageFile, metaData);

    // Listen for state changes, errors, and completion of upload
    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED,
      function(snapshot) {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        console.log(typeof progress);
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
            console.log("User is not authorized to access this database.");
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
        var artwork = {
          title: title,
          description: description,
          dateCreated: date,
          imgURL: downloadURL,
          category: category,
          price: price,
          size: size,
          medium: medium,
          artist: artist,
          onCarousel: onCarousel
        };
        API.saveArtwork(artwork, getImages);
      });
    }
  });

  // imageContainer holds all of our images
  var imageContainer = $(".image-container");
  // Click events for the edit and delete buttons
  // $(document).on("click", "button.delete", handleImageDelete);
  // $(document).on("click", "button.edit", handleImageEdit);
  var images;

  // This function grabs images from the database and updates the view
  function getImages() {
    $.get("/api/artwork", function(data) {
      console.log("Images", data);
      images = data;
      if (!images || !images.length) {
        displayEmpty();
      } else {
        initializeRows(doGallery);
      }
      initializeRows(doGallery);
    });
  }

  // This function does an API call to delete images
  // function deleteImage(id) {
  //   $.ajax({
  //     method: "DELETE",
  //     url: "/api/images/" + id
  //   })
  //     .then(function() {
  //       getImages(imagetCategorySelect.val());
  //     });
  // }

  // Getting the initial list of images

  getImages();
  // doGallery();

  // InitializeRows handles appending all of our constructed image HTML inside
  // imageContainer
  function initializeRows(callback) {
    imageContainer.empty();
    var imagesToAdd = [];
    for (var i = 0; i < images.length; i++) {
      imagesToAdd.push(createNewThumbnail(images[i]));
    }
    imageContainer.append(imagesToAdd);
    callback();
  }

  // This function constructs a image's HTML
  function createNewThumbnail(image) {
    var thumbnail = $("<div>");
    thumbnail.addClass("thumbnail col-sm-6 col-md-4");

    var editBtn = $("<button>");
    editBtn.addClass("editBtn btn btn-secondary");
    editBtn.html("<i class='far fa-edit'></i>");

    var lightBox = $("<a>");
    lightBox.addClass("lightbox");
    lightBox.attr("href", image.imgURL);
    var imgSRC = $("<img>");
    imgSRC.attr("src", image.imgURL);
    imgSRC.attr("alt", image.title);

    var thumbnailCaption = $("<div>");
    thumbnailCaption.addClass("caption");
    var thumbnailTitle = $("<h3>");
    thumbnailTitle.addClass("title");
    thumbnailTitle.text(image.title);
    var thumbnailCategory = $("<h5>");
    thumbnailCategory.addClass("category");
    thumbnailCategory.text("Category: " + image.category);
    var thumbnailDescription = $("<p>");
    thumbnailDescription.addClass("description");
    thumbnailDescription.text("Description: " + image.description);

    //Adding it all to DOM
    thumbnail.append(editBtn);
    thumbnail.append(lightBox);
    lightBox.append(imgSRC);
    thumbnail.append(thumbnailCaption);
    thumbnailCaption.append(thumbnailTitle);
    thumbnailCaption.append(thumbnailCategory);
    thumbnailCaption.append(thumbnailDescription);
    thumbnail.data("image", image);
    baguetteBox.run(".tz-gallery");
    return thumbnail;

    //   var deleteBtn = $("<button>");
    //   deleteBtn.text("x");
    //   deleteBtn.addClass("delete btn btn-danger");
  }

  // This function figures out which image we want to delete and then calls
  // deleteImage
  // function handleImageDelete() {
  //   var currentImage = $(this)
  //     .parent()
  //     .parent()
  //     .data("image");
  //   deleteImage(currentImage.id);
  // }

  // This function figures out which image we want to edit and takes it to the
  // Appropriate url
  // function handleImageEdit() {
  //   var currentImage = $(this)
  //     .parent()
  //     .parent()
  //     .data("image");
  //   window.location.href = "/cms?image_id=" + currentImage.id;
  // }

  // This function displays a message when there are no images
  function displayEmpty() {
    imageContainer.empty();
    var messageH2 = $("<h2>");
    messageH2.css({ "text-align": "center", "margin-top": "50px" });
    messageH2.html("No images yet.");
    imageContainer.append(messageH2);
  }
});

function doGallery() {
  baguetteBox.run(".tz-gallery");
}
// doGallery();
