var chai = require("chai");
var chaiHttp = require("chai-http");
var server = require("../server");
var db = require("../models");
var expect = chai.expect;

// Setting up the chai http plugin
chai.use(chaiHttp);

var request;

describe("POST /api/artwork", function() {
  // Before each test begins, create a new request server for testing
  // & delete all artwork from the db
  beforeEach(function() {
    request = chai.request(server);
    return db.sequelize.sync({ force: true });
  });

  it("should save an artwork", function(done) {
    // Create an object to send to the endpoint
    var reqBody = {
      title: "Medium Artwork",
      description: "What an average piece of work",
      dateCreated: "2018-01-01",
      imgURL: "www.img3.com",
      category: "Some ok stuff",
      price: 120.0,
      size: "10x10",
      medium: "canvas",
      artist: "Skimbo"
    };

    // POST the request body to the server
    request
      .post("/api/artwork")
      .send(reqBody)
      .end(function(err, res) {
        var responseStatus = res.status;
        var responseBody = res.body;

        // Run assertions on the response

        expect(err).to.be.null;

        expect(responseStatus).to.equal(200);

        expect(responseBody)
          .to.be.an("object")
          .that.includes(reqBody);

        // The `done` function is used to end any asynchronous tests
        done();
      });
  });
});
