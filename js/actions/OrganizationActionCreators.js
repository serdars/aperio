var AperioDispatcher = require('../AperioDispatcher');
var ActionTypes = require('../AperioConstants').ActionTypes;
var request = require('superagent');

var OrganizationActionCreators = {
  create: function(data) {
    request
      .post('http://localhost:3000/v1/organizations')
      .send({
        organization: data
      })
      .withCredentials()
      .end(function(error, response) {
        if (response.ok) {
          AperioDispatcher.dispatch({
            type: ActionTypes.ORGANIZATION_CREATE,
            organization: response.body.organization
          });
        }
        else {
          AperioDispatcher.dispatch({
            type: ActionTypes.API_ERROR,
            key: "org_create",
            error: response.body.message
          });
        }
      });
  }
};

module.exports = OrganizationActionCreators;
