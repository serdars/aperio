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
  },

  get: function(id) {
    request
      .get("http://localhost:3000/v1/organizations/" + id)
      .withCredentials()
      .end(function(error, response) {
        if (response.ok) {
          AperioDispatcher.dispatch({
            type: ActionTypes.ORGANIZATION_GET,
            organization: response.body.organization
          });
        }
        else {
          AperioDispatcher.dispatch({
            type: ActionTypes.API_ERROR,
            key: "organization",
            error: response.body.message
          });
        }
      });
  },

  update: function(id, data) {
    request
      .put('http://localhost:3000/v1/organizations/' + id)
      .send({
        organization: data
      })
      .withCredentials()
      .end(function(error, response) {
        if (response.ok) {
          AperioDispatcher.dispatch({
            type: ActionTypes.ORGANIZATION_UPDATE,
            organization: response.body.organization
          });
        }
        else {
          AperioDispatcher.dispatch({
            type: ActionTypes.API_ERROR,
            key: "organization",
            error: response.body.message
          });
        }
      });
  },

  createGroup: function(data) {
    request
      .post('http://localhost:3000/v1/groups')
      .send({
        group: data
      })
      .withCredentials()
      .end(function(error, response) {
        if (response.ok) {
          AperioDispatcher.dispatch({
            type: ActionTypes.GROUP_CREATE,
            group: response.body.group,
            organizationId: response.body.organization_id
          });
        }
        else {
          AperioDispatcher.dispatch({
            type: ActionTypes.API_ERROR,
            key: "grp_create",
            error: response.body.message
          });
        }
      });
  },

  updateGroup: function(id, data) {
    request
      .put('http://localhost:3000/v1/groups/' + id)
      .send({
        group: data
      })
      .withCredentials()
      .end(function(error, response) {
        if (response.ok) {
          AperioDispatcher.dispatch({
            type: ActionTypes.GROUP_UPDATE,
            group: response.body.group,
            organizationId: response.body.organization_id
          });
        }
        else {
          AperioDispatcher.dispatch({
            type: ActionTypes.API_ERROR,
            key: "grp_update",
            error: response.body.message
          });
        }
      });
  },

  joinGroup: function(data) {
    request
      .post('http://localhost:3000/v1/memberships')
      .send(data)
      .withCredentials()
      .end(function(error, response) {
        if (response.ok) {
          AperioDispatcher.dispatch({
            type: ActionTypes.GROUP_JOIN,
            membership: response.body
          });
        }
        else {
          AperioDispatcher.dispatch({
            type: ActionTypes.API_ERROR,
            key: "grp_join",
            error: response.body.message
          });
        }
      });
  },

  joinOrganization: function(data) {
    request
      .post('http://localhost:3000/v1/memberships')
      .send(data)
      .withCredentials()
      .end(function(error, response) {
        if (response.ok) {
          AperioDispatcher.dispatch({
            type: ActionTypes.ORGANIZATION_JOIN,
            membership: response.body
          });
        }
        else {
          AperioDispatcher.dispatch({
            type: ActionTypes.API_ERROR,
            key: "org_join",
            error: response.body.message
          });
        }
      });
  },

  invite: function(data) {
    request
      .post('http://localhost:3000/v1/invitations')
      .send({
        invitation: data
      })
      .withCredentials()
      .end(function(error, response) {
        if (response.ok) {
          AperioDispatcher.dispatch({
            type: ActionTypes.INVITATION_CREATE,
            invitation: response.body.invitation
          });
        }
        else {
          AperioDispatcher.dispatch({
            type: ActionTypes.API_ERROR,
            key: "inv_create",
            error: response.body.message
          });
        }
      });
  },

  timeline: function(id) {
    request
      .get("http://localhost:3000/v1/organizations/" + id + "/timeline")
      .withCredentials()
      .end(function(error, response) {
        if (response.ok) {
          AperioDispatcher.dispatch({
            type: ActionTypes.ORG_TIMELINE_UPDATE,
            timeline: response.body.timeline
          });
        }
        else {
          AperioDispatcher.dispatch({
            type: ActionTypes.API_ERROR,
            key: "org_timeline",
            error: response.body.message
          });
        }
      });
  },
};

module.exports = OrganizationActionCreators;
