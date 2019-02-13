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
  API.getArtwork().then(function(res) {
    for (var i = 0; i < res.length; i++) {
      var $columnDiv = $("<div>", { class: "col-sm-12 col-md-2", id: [i] });
      var $thumbnailDiv = $("<div>", { class: "thumbnail" });
      var $lightBoxA = $("<a>", { class: "lightbox" });
      var $img = $("<img style='margin:auto'>");
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
      $columnDiv.append($thumbnailDiv);
      $(".row").append($columnDiv);
      console.log(res);
      baguetteBox.run(".tz-gallery");
    }
  });
}

grabArtworkData();
