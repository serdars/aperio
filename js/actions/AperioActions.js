var AppDispatcher = require('../dispatcher/AppDispatcher');
var AperioConstants = require('../constants/AperioConstants');

var AperioActions = {

  create: function(text) {
    AppDispatcher.dispatch({
      actionType: AperioConstants.ORG_CREATE,
      text: text
    });
  },

  updateText: function(id, text) {
    AppDispatcher.dispatch({
      actionType: AperioConstants.ORG_UPDATE,
      id: id,
      text: text
    });
  },

  destroy: function(id) {
    AppDispatcher.dispatch({
      actionType: AperioConstants.ORG_DESTROY,
      id: id
    });
  },

};

module.exports = AperioActions;
