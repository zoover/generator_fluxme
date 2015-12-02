import request from 'superagent';

const userList = {
  // Name param is required
  name: 'userList',
  // CRUD methods below
  read: function(req, resource, params, config, callback) {
    request
      .get('https://api.github.com/users')
      .end(function(err, response) {
        callback(err, response.body);
      });
  }
  // create: function(req, resource, params, body, config, callback) {},
  // update: function(req, resource, params, body, config, callback) {},
  // delete: function(req, resource, params, config, callback) {}
};

export default userList;
