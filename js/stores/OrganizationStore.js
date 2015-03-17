var AperioDispatcher = require('../AperioDispatcher');
var EventEmitter = require('events').EventEmitter;
var AperioConstants = require('../AperioConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _organization = {
  item: null,
  state: null,
  error: null
};
var _groups = { };
var _groupToCreate = null;

var OrganizationStore = assign({}, EventEmitter.prototype, {
  // Accessor methods
  getOrganization: function(id) {
    return _organization;
  },

  getGroup: function(organizationId, id) {
    if (id == null) {
      return _groupToCreate;
    } else {
      return _groups[id];
    }
  },

  getGroups: function() {
    return _groups;
  },

  // Event handling methods
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
AperioDispatcher.register(function(action) {
  var text;

  switch(action.actionType) {
    case AperioConstants.ACTION_LOADING:
      if (action.data.type == AperioConstants.ITEM_TYPE_ORGANIZATION) {
        _organization.state = AperioConstants.ITEM_STATE_LOADING;
        _organization.error = null;
        OrganizationStore.emitChange();
      } else if (action.data.type == AperioConstants.ITEM_TYPE_GROUP) {
        var grp;
        if (action.data.item.id == null) {
          grp = _groupToCreate;
        } else {
          grp = _groups[action.data.item.id];
        }

        grp.state = AperioConstants.ITEM_STATE_LOADING;
        grp.error = null;
        OrganizationStore.emitChange();
      }
      break;

    case AperioConstants.ACTION_LOADED:
    case AperioConstants.ACTION_CREATED:
      if (action.data.type == AperioConstants.ITEM_TYPE_ORGANIZATION) {
        if (action.data.success) {
          _organization.state = AperioConstants.ITEM_STATE_DONE;
          _organization.error = null;
          _organization.item = action.data.item;

          for (var key in action.data.item.groups) {
            var group = action.data.item.groups[key];
            _groups[group.id] = {
              item: group,
              state: null,
              error: null
            };
          }
        } else {
          _organization.state = AperioConstants.ITEM_STATE_ERROR;
          _organization.error = action.data.item;
        }

        OrganizationStore.emitChange();
      } else if (action.data.type == AperioConstants.ITEM_TYPE_GROUP) {
        if (action.data.success) {
          var grp = {
            state: AperioConstants.ITEM_STATE_DONE,
            error: null,
            item: action.data.item
          };

          if (action.data.item.id == null) {
            _groupToCreate = grp;
          } else {
            _groups[action.data.item.id] = grp;
            _groupToCreate = null;
          }
        } else {
          if (action.data.item.id == null) {
            _groupToCreate.state = AperioConstants.ITEM_STATE_ERROR;
            _groupToCreate.error = action.data.item;
          } else {
            _groups[action.data.item.id].state = AperioConstants.ITEM_STATE_ERROR;
            _groups[action.data.item.id].error = action.data.item;
          }
        }

        OrganizationStore.emitChange();
      }
      break;

    case AperioConstants.ACTION_CREATING:
      if (action.data.type == AperioConstants.ITEM_TYPE_ORGANIZATION) {
        _organization.state = AperioConstants.ITEM_STATE_LOADING;
        _organization.error = null;
        _organization.item = action.data.data;
        OrganizationStore.emitChange();
      }
      break;

    default:
      // no op
  }
});

OrganizationStore.setMaxListeners(20);

module.exports = OrganizationStore;
