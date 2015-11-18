const <%= filename %> = {
  // Name param is required
  name: '<%= filename %>',
  // CRUD methods below
  read: function(req, resource, params, config, callback) {},
  create: function(req, resource, params, body, config, callback) {},
  update: function(req, resource, params, body, config, callback) {},
  delete: function(req, resource, params, config, callback) {}
};

export default <%= filename %>;

