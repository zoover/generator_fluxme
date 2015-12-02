const sampleList = {
  // Name param is required
  name: 'sampleList',
  // CRUD methods below
  read: function(req, resource, params, config, callback) {
    setTimeout( // simulate async
      callback(null, [
        {'id': 1, 'name': 'Rijssen'},
        {'id': 2, 'name': 'Soest Zuid'},
        {'id': 3, 'name': 'Driebergen-Zeist'},
        {'id': 4, 'name': 'Amersfoort'}
      ]), 10);
  }
  // create: function(req, resource, params, body, config, callback) {},
  // update: function(req, resource, params, body, config, callback) {},
  // delete: function(req, resource, params, config, callback) {}
};

export default sampleList;