var AperioDispatcher = require('./AperioDispatcher');
var AperioConstants = require('./AperioConstants');
var AperioApi = require('./AperioApi');

var RouteStore = require('./stores/RouteStore');

var AperioActions = {
  navigateTo: function(href, skipHistory) {
    var prefetch = RouteStore.prefetchForRoute(href);
    if (prefetch != null) {
      if (prefetch.id == null) {
        this.loadDefault(prefetch.type);
      } else {
        this.loadFromServer(prefetch.type, prefetch.id);
      }
    }

    AperioDispatcher.dispatch({
      actionType: AperioConstants.ACTION_ROUTE_CHANGE,
      href: href,
      skipHistory: skipHistory
    });
  },

  loadDefault: function(type) {
    var defaultItem;
    switch(type) {
      case AperioConstants.ITEM_TYPE_ORGANIZATION:
        defaultItem = {
          id: null,
          name: "",
          motto: ""
        };
        break;
      case AperioConstants.ITEM_TYPE_GROUP:
        defaultItem = {
          id: null,
          name: "",
          motto: "",
          visible: true,
          private: false
        };
        break;
      default:
        console.log("Unknown type: " + type);
    };

    AperioDispatcher.dispatch({
      actionType: AperioConstants.ACTION_LOADED,
      data: {
        type: type,
        id: null,
        success: true,
        item: defaultItem
      }
    });
  },

  loadFromServer: function(type, id) {
    AperioDispatcher.dispatch({
      actionType: AperioConstants.ACTION_LOADING,
      data: {
        type: type,
        id: id
      }
    });

    AperioApi.getItem(type, id, function(success, item) {
      AperioDispatcher.dispatch({
        actionType: AperioConstants.ACTION_LOADED,
        data: {
          type: type,
          id: id,
          success: success,
          item: item
        }
      });
    });
  },

  logout: function() {
    AperioApi.logout(function(success, error) {
      if (success) {
        AperioDispatcher.dispatch({
          actionType: AperioConstants.ACTION_LOGOUT
        });
      } else {
        console.log("Logout failed sorry!")
      }
    });
  },

  join: function(data) {
    AperioApi.join(data, function(success, membership, error) {
      if (success) {
        AperioDispatcher.dispatch({
          actionType: AperioConstants.ACTION_JOINED,
          data: {
            membership: membership
          }
        });
      } else {
        console.log("Join failed sorry!")
      }
    });
  },

  login: function(data) {
    AperioApi.login(data, function(success, user, error) {
      if (success) {
        AperioDispatcher.dispatch({
          actionType: AperioConstants.ACTION_LOGIN_SUCCESS,
          data: {
            user: user
          }
        });

        AperioActions.navigateTo("#/timeline", true);
      } else {
        AperioDispatcher.dispatch({
          actionType: AperioConstants.ACTION_LOGIN_FAILED,
          data: {
            error: error
          }
        });
      }
    });
  },

  register: function(data) {
    AperioApi.register(data, function(success, user, error) {
      if (success) {
        AperioDispatcher.dispatch({
          actionType: AperioConstants.ACTION_REGISTER_SUCCESS,
          data: {
            user: user
          }
        });

        AperioActions.navigateTo("#/timeline", true);
      } else {
        AperioDispatcher.dispatch({
          actionType: AperioConstants.ACTION_REGISTER_FAILED,
          data: {
            error: error
          }
        });
      }
    });
  },

  createItem: function(type, data) {
    AperioDispatcher.dispatch({
      actionType: AperioConstants.ACTION_CREATING,
      data: {
        type: type,
        data: data
      }
    });

    AperioApi.createItem(type, data, function(success, item) {
      AperioDispatcher.dispatch({
        actionType: AperioConstants.ACTION_CREATED,
        data: {
          type: type,
          id: item.id,
          success: success,
          item: item
        }
      });
    });
  },

};

module.exports = AperioActions;
