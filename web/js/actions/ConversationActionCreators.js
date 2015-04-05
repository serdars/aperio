var AperioDispatcher = require('../AperioDispatcher');
var ActionTypes = require('../AperioConstants').ActionTypes;
var request = require('superagent');

var ConversationActionCreators = {
  create: function(data) {
    request
      .post('http://localhost:3000/v1/conversations')
      .send({
        conversation: data
      })
      .withCredentials()
      .end(function(error, response) {
        if (response.ok) {
          AperioDispatcher.dispatch({
            type: ActionTypes.CONVERSATION_CREATE_DONE
          });

          AperioDispatcher.dispatch({
            type: ActionTypes.CONVERSATION_CREATE,
            conversation: response.body.conversation
          });
        }
        else {
          AperioDispatcher.dispatch({
            type: ActionTypes.API_ERROR,
            key: "conv_create",
            error: response.body.message
          });
        }
      });
  },

};

module.exports = ConversationActionCreators;
