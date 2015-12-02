import request from 'superagent';

const userItem = {
  // Name param is required
  name: 'userItem',
  // CRUD methods below
  read: function(req, resource, params, config, callback) {
    request
      .get('https://api.github.com/users/' + params.id)
      .end(function(err, response) {
        callback(err, response.body);
      });
  }
  // create: function(req, resource, params, body, config, callback) {},
  // update: function(req, resource, params, body, config, callback) {},
  // delete: function(req, resource, params, config, callback) {}
};

export default userItem;
