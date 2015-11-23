const sampleList = {
  name: 'sampleList',
  read: function(req, resource, params, config, callback) {
    setTimeout( // simulate async
      callback(null, [
        {'id': 1, 'name': 'Rijssen'},
        {'id': 2, 'name': 'Soest Zuid'},
        {'id': 3, 'name': 'Driebergen-Zeist'},
        {'id': 4, 'name': 'Amersfoort'}
      ]), 10);
  }
};

export default sampleList;