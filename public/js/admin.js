
(function($) {
    'use strict';

    // Main Navigation
    $( '.hamburger-menu' ).on( 'click', function() {
        $(this).toggleClass('close');
        $('.site-branding').toggleClass('hide');
        $('.site-navigation').toggleClass('show');
        $('.site-header').toggleClass('no-shadow');
    });

    // Scroll to Next Section
    $( '.scroll-down' ).click(function() {
        $( 'html, body' ).animate({
            scrollTop: $( '.scroll-down' ).offset().top + 100
        }, 800 );
    });
})(jQuery);

$(document).ready(function() {
    // imageContainer holds all of our images
    var imageContainer = $(".image-container");
    // var imageCategorySelect = $("#category");
    // Click events for the edit and delete buttons
    // $(document).on("click", "button.delete", handleImageDelete);
    // $(document).on("click", "button.edit", handleImageEdit);
    var images;
  
    // This function grabs images from the database and updates the view
    // function getImages(category) {
    function getImages() {
    //   var categoryString = category || "";
    //   if (categoryString) {
    //     categoryString = "/category/" + categoryString;
    //   }
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
    // InitializeRows handles appending all of our constructed image HTML inside
    // imageContainer
    function initializeRows() {
      imageContainer.empty();
      var imagesToAdd = [];
      for (var i = 0; i < images.length; i++) {
        iamgesToAdd.push(createNewThumbnail(images[i]));
      }
      imageContainer.append(imagesToAdd);
    }
  
    // This function constructs a image's HTML
    function createNewThumbnail(image) {
        var thumbnail = $("<div>")
            thumbnail.addClass("thumbnail");

        var editBtn = $("<button>");
            editBtn.addClass("edit btn btn-secondary");
            editBtn.text("<i class='far fa-edit'></i>");
            
        var lightBox = $("<a>");
            lightBox.addClass("lightbox")
            lightBox.attr("href", image.imgURL)
        var imgSRC = $("<img>");
            imgSRC.attr("href", image.imgURL);
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


    //   var deleteBtn = $("<button>");
    //   deleteBtn.text("x");
    //   deleteBtn.addClass("delete btn btn-danger");
      
    //   thumbnailCategory.css({
    //     float: "right",
    //     "font-weight": "700",
    //     "margin-top":
    //     "-15px"
    //   });
      thumbnailCaption.append(thumbnailTitle);
      thumbnailCaption.append(thumbnailCategory);
      thumbnailCaption.append(thumbnailDescription);
      thumbnail.append(thumbnailCaption);
      lightBox.append(imgSRC)
      thumbnail.append(lightBox);
      thumbnail.append(editBtn);
      thumbnail.data("image", image);
      return thumbnail;
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
  
    // This function handles reloading new images when the category changes
    // function handleCategoryChange() {
    //   var thumbnailCategory = $(this).val();
    //   getImages(thumbnailCategory);
    // }
  
  });
  