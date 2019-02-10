// TODO Add update functionality for both commission and artwork
// TODO add delete functionality for both commission and artwork

var db = require("../models");

module.exports = function(app) {
  // Get all artwork from the database
  app.get("/api/artwork", function(req, res) {
    db.Artwork.findAll({}).then(function(dbArtwork) {
      res.json(dbArtwork);
    });
  });

  // Get all the commmission requests from the database. This should be changed to find all the commissions for a particular artist
  // Base this on which artist is logged in
  app.get("/api/commission%20request", function(req, res) {
    db.CommissionRequest.findAll({}).then(function(dbCommisionRequest) {
      res.json(dbCommisionRequest);
    });
  });

  // Allow a user to post a new artwork
  app.post("/api/artwork", function(req, res) {
    db.Artwork.create(req.body)
      .then(function(dbArtwork) {
        res.json(dbArtwork);
      })
      .catch(function(err) {
        if (err) {
          throw err;
        }
      });
  });

  // Allow a user to post a new commission request
  app.post("/api/commission%20request", function(req, res) {
    db.CommissionRequest.create(req.body)
      .then(function(dbCommisionRequest) {
        res.json(dbCommisionRequest);
      })
      .catch(function(err) {
        if (err) {
          throw err;
        }
      });
  });
  // Update and destroy functionality not needed at this time. Can be added as needed.
};
