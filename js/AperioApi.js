var request = require('superagent');
var AperioConstants = require('./AperioConstants');

var API_ITEM_TYPE = {
  ITEM_TYPE_TIMELINE: "timeline",
  ITEM_TYPE_ORGANIZATION: "organization",
  ITEM_TYPE_CURRENT_USER: "current_user",
}
var AperioApi = {
  getItem: function(itemType, id, callback) {
    var type = API_ITEM_TYPE[itemType];
    var getUrl;

    if (id) {
      getUrl = "/v1/" + type + "s/" + id;
    } else {
      getUrl = "/v1/" + type;
    }

    getUrl = "http://localhost:3000" + getUrl;

    request
      .get(getUrl)
      .withCredentials()
      .end(function(error, response) {
        var item;

        if (response.ok) {
          if (response.body == null) {
            item = null
          } else {
            item = response.body[type];
          }
        }
        else {
          item = response.body;
        }

        if (callback != null) {
          callback(response.ok, item);
        }
      });
  },

  logout: function(callback) {
    request
      .del('http://localhost:3000/v1/logout')
      .withCredentials()
      .end(function(error, response) {
        if (callback != null) {
          callback(response.ok, response.body);
        }
      });
  },

  login: function(data, callback) {
    request
      .post('http://localhost:3000/v1/login')
      .send({
        user_session: data
      })
      .withCredentials()
      .end(function(error, response) {
        if (callback != null) {
          if (response.ok) {
            callback(true, response.body.user, null);
          } else {
            callback(true, null, response.body.error);
          }
        }
      });
  },

  register: function(data, callback) {
    request
      .post('http://localhost:3000/v1/users')
      .send({
        user: data
      })
      .withCredentials()
      .end(function(error, response) {
        if (callback != null) {
          if (response.ok) {
            callback(true, response.body.user, null);
          } else {
            callback(true, null, response.body.error);
          }
        }
      });
  },

  createItem: function(itemType, data, callback) {
    var type = API_ITEM_TYPE[itemType];
    var createUrl = "/v1/" + type + "s";
    var postData = { };
    postData[type] = data;

    request
      .post('http://localhost:3000' + createUrl)
      .send(postData)
      .withCredentials()
      .end(function(error, response) {
        var item;

        if (response.ok) {
          if (response.body == null) {
            item = null
          } else {
            item = response.body[type];
          }
        }
        else {
          item = response.body;
        }

        if (callback != null) {
          callback(response.ok, item);
        }
      });
  },


};

module.exports = AperioApi;
