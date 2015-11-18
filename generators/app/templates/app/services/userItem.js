import request from 'superagent';

const userItem = {
  // Name param is required
  name: 'userItem',
  // CRUD methods below
  read: function(req, resource, params, config, callback) {
    request
      .get('https://api.github.com/users/' + params.id)
      .end(function(err, response) {
        console.log('Service ---- getting github user item');
        if (!err) {
          callback(null, response.body);
        } else {
          console.log(err);
          console.error('Service Fail ---- getting github user item');
        }
      });
  }
};

export default userItem;

// CRUD options examples
// read: function(req, resource, params, config, callback) {],
// create: function(req, resource, params, body, config, callback) {},
// update: function(req, resource, params, body, config, callback) {},
// delete: function(req, resource, params, config, callback) {}
