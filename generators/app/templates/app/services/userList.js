import request from 'superagent';

const userList = {
  // Name param is required
  name: 'userList',
  // CRUD methods below
  read: function(req, resource, params, config, callback) {
    request
      .get('https://api.github.com/users')
      .end(function(err, response) {
        console.log('Service ---- getting github user list');
        if (!err) {
          callback(null, response.body);
        } else {
          console.log(err);
          console.error('Service Fail ---- getting github user list');
        }
      });
  }
};

export default userList;

// CRUD options examples
// read: function(req, resource, params, config, callback) {],
// create: function(req, resource, params, body, config, callback) {},
// update: function(req, resource, params, body, config, callback) {},
// delete: function(req, resource, params, config, callback) {}
