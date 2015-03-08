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
  },

  changeUrl: function(href, skipHistory) {
    AppDispatcher.dispatch({
      actionType: AperioConstants.ROUTE_CHANGE,
      href: href,
      skipHistory: skipHistory
    });
  },

  createOrganization: function(organization) {
    AppDispatcher.dispatch({
      actionType: AperioConstants.CREATE_ORG,
      organization: organization
    });
  },

};

module.exports = AperioActions;
