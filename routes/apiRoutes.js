// TODO Add update functionality for both commission and artwork
// TODO add delete functionality for both commission and artwork

var db = require("../models");
var bcrypt = require("bcrypt");

module.exports = function(app) {
  // Get all artwork from the database
  app.get("/api/artwork", function(req, res) {
    db.Artwork.findAll({}).then(function(dbArtwork) {
      return res.json(dbArtwork);
    });
  });

  // Get all the commmission requests from the database. This should be changed to find all the commissions for a particular artist
  // Base this on which artist is logged in
  app.get("/api/commissions", function(req, res) {
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

  // DELETE route for deleting posts
  app.delete("/api/images/:id", function(req, res) {
    db.Artwork.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbArtwork) {
      res.json(dbArtwork);
    });
  });

  // Add route for new users
  app.post("/api/users", function(req) {
    var saltRounds = 10;
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
      db.User.create({ userName: req.body.userName, password: hash }).catch(
        err
      );
      if (err) {
        throw err;
      }
    });
  });

  // Get user information
  app.get("/api/users", function(req, res) {
    var userName = req.query.userName;
    db.User.findOne({
      where: { userName: userName }
    }).then(function(dbUserRequest) {
      try {
        var hash = dbUserRequest.dataValues.password;
        bcrypt.compare(req.query.password, hash, function(err, result) {
          if (err) {
            throw err;
          }
          res.json(result);
        });
      } catch (err) {
        res.json(err);
      }
    });
  });
};

// Update and destroy functionality not needed at this time. Can be added as needed.