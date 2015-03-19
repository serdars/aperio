var AperioDispatcher = require('../AperioDispatcher');
var ActionTypes = require('../AperioConstants').ActionTypes;
var request = require('superagent');

var AppActionCreators = {
  init: function() {
    // Load the current user
    request
      .get("http://localhost:3000/v1/current_user")
      .withCredentials()
      .end(function(error, response) {
        var user;

        if (response.ok && response.body) {
          user = response.body.user;
        } else {
          user = null
        }

        AperioDispatcher.dispatch({
          type: ActionTypes.INIT_APP,
          user: user
        });
      });
  }
};

module.exports = AppActionCreators;
