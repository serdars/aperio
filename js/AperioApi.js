var request = require('superagent');
var AperioActions = require('./actions/AperioActions');

function withCsrf(data) {

}

var AperioApi = {
  login: function(data) {
    request
      .post('http://localhost:3000/api/v1/sessions/login')
      .send({
        user_session: data
      })
      .withCredentials()
      .end(function(error, response) {
        if (response.ok) {
          AperioActions.loadUser(response.body.user);
        } else {
          // TODO: Display register failures
          console.log("Failed to login the user!")
        }
      });
  },

  logout: function() {
    request
      .del('http://localhost:3000/api/v1/sessions/logout')
      .withCredentials()
      .end(function(error, response) {
        if (response.ok) {
          AperioActions.loadUser(null);
        } else {
          // TODO: Display register failures
          console.log("Failed to logout the user!")
        }
      });
  },

  register: function(data) {
    request
      .post('http://localhost:3000/api/v1/users/create')
      .send({
        user: data
      })
      .withCredentials()
      .end(function(error, response) {
        if (response.ok) {
          AperioActions.loadUser(response.body.user);
        } else {
          // TODO: Display register failures
          console.log("Failed to create the user!")
        }
      });
  },

  loadUser: function() {
    request
      .get("http://localhost:3000/api/v1/users/current")
      .withCredentials()
      .end(function(error, response) {
        if (response.ok && response.body != null) {
          AperioActions.loadUser(response.body.user);
        }
      });
  },

  loadTimeline: function() {
    request
      .get("http://localhost:3000/api/v1/users/timeline")
      .end(function(error, response) {
        AperioActions.loadTimeline(response.body.timeline);
      });
  }
};

module.exports = AperioApi;
