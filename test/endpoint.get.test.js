var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server");
var db = require("../models");
var expect = chai.expect;

// Setting the chai http plugin
chai.use(chaiHttp);

var request;

describe("GET /api/artwork", function() {
  // This will startup a request server & delete all examples from db
  beforeEach(function() {
    request = chai.request(server);
    return db.sequelize.sync({ force: true });
  });
});

it("Should find all artwork", function(done) {
  db.artwork.bulkCreate([
      {
        title: "Great Artwork", 
        description: "What a great piece of work",
        dateCreated: 2018-01-01,
        imgURL: "www.img.com",
        category: "Some great stuff",
        price: 120.00,
        size: "10x10",
        medium: "canvas",
        artist: "Jimbo"
      },
      {
        title: "Bad Artwork", 
        description: "What a bad piece of work",
        dateCreated: 2019-01-01,
        imgURL: "www.img2.com",
        category: "Some terrible stuff",
        price: 20.00,
        size: "12x12",
        medium: "canvas",
        artist: "Glimbo"
      }
    ]).then(function() {
      // Request the route that returns all examples
      request.get("/api/artwork").end(function(err, res) {
        var responseStatus = res.status;
        var responseBody = res.body;

        // Run assertions on the response

        expect(err).to.be.null;

        expect(responseStatus).to.equal(200);

        expect(responseBody)
          .to.be.an("array")
          .that.has.lengthOf(2);

        expect(responseBody[0])
          .to.be.an("object")
          .that.includes({ text: "First Example", description: "First Description" });

        expect(responseBody[1])
          .to.be.an("object")
         .that.includes({ text: "Second Example", description: "Second Description" });

      // The `done` function is used to end any asynchronous tests
      done();
    });
  });
});
