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

function grabArtworkData() {
  $(".imageGallery").empty();
  API.getArtwork().then(function(res) {
    for (var i = 0; i < res.length; i++) {
      var $columnDiv = $("<div>", { class: "col l2 m4 s12", id: [i] });
      var $thumbnailDiv = $("<div>", { class: "thumbnail" });
      var $lightBoxA = $("<a>", { class: "lightbox" });
      var $img = $("<img>");
      var $captionDiv = $("<div>", { class: "caption" });
      var $captionHeading = $("<h5 id=" + i + ">");
      var $captionPara = $("<p id=" + i + ">");

      $captionPara.text(res[i].medium);
      $captionHeading.text(res[i].title);
      $captionDiv.append($captionHeading);
      $captionDiv.append($captionPara);

      $img.attr({
        src: res[i].imgURL,
        alt: res[i].title
      });
      $lightBoxA.append($img);
      $lightBoxA.attr({
        href: res[i].imgURL
      });

      $thumbnailDiv.append($lightBoxA);
      $thumbnailDiv.append($captionDiv);
      $thumbnailDiv.data("image", res[i]);

      $columnDiv.append($thumbnailDiv);
      $(".imageGallery").append($columnDiv);

      baguetteBox.run(".tz-gallery");
      console.log($thumbnailDiv.data());
    }
  });
}

grabArtworkData();
