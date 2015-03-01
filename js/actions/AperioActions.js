var AppDispatcher = require('../dispatcher/AppDispatcher');
var AperioConstants = require('../constants/AperioConstants');

var AperioActions = {

  loadUser: function(user) {
    AppDispatcher.dispatch({
      actionType: AperioConstants.LOAD_USER,
      user: user
    });
  },

  loadTimeline: function(timeline) {
    AppDispatcher.dispatch({
      actionType: AperioConstants.LOAD_TIMELINE,
      timeline: timeline
    });
  }

};

module.exports = AperioActions;
