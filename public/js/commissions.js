$(document).ready(function() {
  var commissionContainer = $(".commissionsCards");
  //   $(document).on("click", "button.delete", handleCommissionDelete);
  //   $(document).on("click", "button.edit", handleCommissionEdit);
  var commissions;

  // This function grabs commissions from the database and updates the view
  function getCommissions() {
    $.get("/api/commissions", function(data) {
      console.log("Commissions", data);
      commissions = data;
      if (!commissions || !commissions.length) {
        displayEmpty();
      } else {
        initializeRows();
      }
    });
  }

  // This function does an API call to delete commissions
  //   function deleteCommission(id) {
  //     $.ajax({
  //       method: "DELETE",
  //       url: "/api/commissions/" + id
  //     }).then(function() {
  //       getCommissions(commissionCategorySelect.val());
  //     });
  //   }

  // Getting the initial list of commissions
  getCommissions();

  // InitializeRows handles appending all of our constructed commission HTML inside
  // commissionContainer
  function initializeRows() {
    commissionContainer.empty();
    var commissionsToAdd = [];
    for (var i = 0; i < commissions.length; i++) {
      commissionsToAdd.push(createNewRow(commissions[i]));
    }
    commissionContainer.append(commissionsToAdd);
  }

  // This function constructs a commission's HTML
  function createNewRow(commission) {
    // console.log("test");
    var newCommissionCard = $("<div>");
    newCommissionCard.addClass("card m-2");

    var newCommissionCardHeading = $("<div>");
    newCommissionCardHeading.addClass("card-header");

    var deleteBtn = $("<button>");
    deleteBtn.text("x");
    deleteBtn.addClass("delete btn btn-danger");
    var editBtn = $("<button>");
    editBtn.text("EDIT");
    editBtn.addClass("edit btn btn-default");

    var newCommissionTitle = $("<h2>");
    newCommissionTitle.addClass("col");
    newCommissionTitle.text(commission.name);

    var newCommissionContact = $("<h3>");
    newCommissionContact.text(
      "Phone: " + commission.phone + " | Email: " + commission.email
    );

    var newCommissionThumbnail = $("<a>");
    newCommissionThumbnail.attr("href", commission.referenceImgURL);
    newCommissionThumbnail.addClass("thumbnail");
    var imgSRC = $("<img>");
    imgSRC.addClass("img-thumbnail comThumb");
    imgSRC.attr("src", commission.referenceImgURL);
    imgSRC.attr("alt", commission.title);

    // var newCommissionDate = $("<small>");

    var newCommissionCardBody = $("<div>");
    newCommissionCardBody.addClass("card-body row");

    var newCommissionBody = $("<h4>");
    newCommissionBody.addClass("col");
    newCommissionBody.text(commission.requestDetails);

    newCommissionCard.append(newCommissionCardHeading);
    // var formattedDate = new Date(commission.createdAt);
    // formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    // newCommissionDate.text(formattedDate);
    // newCommissionTitle.append(newCommissionDate);
    newCommissionCardHeading.append(deleteBtn);
    newCommissionCardHeading.append(editBtn);
    newCommissionCardHeading.append(newCommissionTitle);
    newCommissionCardBody.append(newCommissionBody);
    newCommissionCardBody.append(newCommissionThumbnail);
    newCommissionThumbnail.append(imgSRC);

    newCommissionTitle.append(newCommissionContact);
    newCommissionCard.append(newCommissionCardHeading);
    newCommissionCard.append(newCommissionCardBody);
    newCommissionCard.data("commission", commission);
    return newCommissionCard;
  }

  // This function figures out which commission we want to delete and then calls
  // deleteCommission
  //   function handleCommissionDelete() {
  //     var currentCommission = $(this)
  //       .parent()
  //       .parent()
  //       .data("commission");
  //     deleteCommission(currentCommission.id);
  //   }

  // This function figures out which commission we want to edit and takes it to the
  // Appropriate url
  //   function handleCommissionEdit() {
  //     var currentCommission = $(this)
  //       .parent()
  //       .parent()
  //       .data("commission");
  //     window.location.href = "/cms?commission_id=" + currentCommission.id;
  //   }

  // This function displays a message when there are no commissions
  function displayEmpty() {
    commissionContainer.empty();
    var messageH2 = $("<h2>");
    messageH2.css({ "text-align": "center", "margin-top": "50px" });
    messageH2.html(
      "No commissions yet, Enter a commission using the form below."
    );
    commissionContainer.append(messageH2);
  }
});
