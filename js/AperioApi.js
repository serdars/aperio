var request = require('superagent');

var AperioActions = require('./actions/AperioActions');

function loadUser() {
  request
    .get("http://localhost:3000/api/v1/users/current")
    .end(function(error, response) {
      AperioActions.loadUser(response.body.user);
    });
}

function loadTimeline() {
  request
    .get("http://localhost:3000/api/v1/users/timeline")
    .end(function(error, response) {
      AperioActions.loadTimeline(response.body.timeline);
    });
}


var AperioApi = {
  loadUser: function() {
    loadUser();
  },

  loadTimeline: function() {
    loadTimeline();
  }
};

module.exports = AperioApi;
