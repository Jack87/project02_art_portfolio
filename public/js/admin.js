$(document).ready(function() {
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
        }
        else {
          initializeRows();
        }
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
    function initializeRows() {
      imageContainer.empty();
      var imagesToAdd = [];
      for (var i = 0; i < images.length; i++) {
        imagesToAdd.push(createNewThumbnail(images[i]));
      }
      imageContainer.append(imagesToAdd);
    }
  
    // This function constructs a image's HTML
    function createNewThumbnail(image) {
        var thumbnail = $("<div>")
            thumbnail.addClass("thumbnail col-sm-6 col-md-4");

        var editBtn = $("<button>");
            editBtn.addClass("editBtn btn btn-secondary");
            editBtn.html("<i class='far fa-edit'></i>");
            
        var lightBox = $("<a>");
            lightBox.addClass("lightbox")
            lightBox.attr("href", image.imgURL)
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
        lightBox.append(imgSRC)
        thumbnail.append(thumbnailCaption);
        thumbnailCaption.append(thumbnailTitle);
        thumbnailCaption.append(thumbnailCategory);
        thumbnailCaption.append(thumbnailDescription);
        thumbnail.data("image", image);
        baguetteBox.run('.tz-gallery');
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

document.body.addEventListener('DOMSubtreeModified', function () {
    // doGallery();
    baguetteBox.run('.tz-gallery');   
  }, false);

  function doGallery() {
    console.log("this just happened")
    baguetteBox.run('.tz-gallery');
  }

  