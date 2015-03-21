var keyMirror = require('keymirror');

module.exports = {
  ActionTypes: keyMirror({
    INIT_APP: null,
    USER_LOGIN: null,
    USER_LOGOUT: null,
    API_ERROR: null,
    ORGANIZATION_GET: null,
    ORGANIZATION_CREATE: null,
    ORGANIZATION_UPDATE: null,
    TIMELINE_UPDATE: null,
    GROUP_CREATE: null,
    GROUP_UPDATE: null
  }),

  Old: keyMirror({
    ACTION_ROUTE_CHANGE: null,
    ACTION_LOADING: null,
    ACTION_LOADED: null,
    ACTION_CREATING: null,
    ACTION_CREATED: null,
    ACTION_LOGOUT: null,
    ACTION_LOGIN_SUCCESS: null,
    ACTION_LOGIN_FAILED: null,
    ACTION_REGISTER_SUCCESS: null,
    ACTION_REGISTER_FAILED: null,
    ACTION_JOINED: null,

    ITEM_STATE_LOADING: null,
    ITEM_STATE_ERROR: null,
    ITEM_STATE_DONE: null,

    ITEM_TYPE_TIMELINE: null,
    ITEM_TYPE_ORGANIZATION: null,
    ITEM_TYPE_GROUP: null,
    ITEM_TYPE_CURRENT_USER: null,

    VIEW_TIMELINE: null,
    VIEW_JOIN: null,
    VIEW_ORGANIZATION: null,
  })
}
