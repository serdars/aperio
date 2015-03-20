var AperioDispatcher = require('../AperioDispatcher');
var ActionTypes = require('../AperioConstants').ActionTypes;
var request = require('superagent');

var UserActionCreators = {
  timeline: function() {
    request
      .get("http://localhost:3000/v1/timeline" )
      .withCredentials()
      .end(function(error, response) {
        if (response.ok) {
          AperioDispatcher.dispatch({
            type: ActionTypes.TIMELINE_UPDATE,
            timeline: response.body.timeline
          });
        }
        else {
          AperioDispatcher.dispatch({
            type: ActionTypes.API_ERROR,
            key: "timeline",
            error: response.body.message
          });
        }
      });
  },

  logout: function() {
    request
      .del('http://localhost:3000/v1/logout')
      .withCredentials()
      .end(function(error, response) {
        if (response.ok) {
          AperioDispatcher.dispatch({
            type: ActionTypes.USER_LOGOUT
          });
        } else {
          console.log("Logout failed: " + error);
        }
      });
  },

  register: function(data) {
    request
      .post('http://localhost:3000/v1/users')
      .send({
        user: data
      })
      .withCredentials()
      .end(function(error, response) {
        if (response.ok) {
          AperioDispatcher.dispatch({
            type: ActionTypes.USER_REGISTER,
            user: response.body.user
          });
        } else {
          AperioDispatcher.dispatch({
            type: ActionTypes.API_ERROR,
            key: "register",
            error: response.body.message
          });
        }
      });
  },

  login: function(data) {
    request
      .post('http://localhost:3000/v1/login')
      .send({
        user_session: data
      })
      .withCredentials()
      .end(function(error, response) {
        if (response.ok) {
          AperioDispatcher.dispatch({
            type: ActionTypes.USER_LOGIN,
            user: response.body.user
          });
        } else {
          AperioDispatcher.dispatch({
            type: ActionTypes.API_ERROR,
            key: "login",
            error: response.body.message
          });
        }
      });
  },
};

module.exports = UserActionCreators;
