const sampleItem = {
  // Name param is required
  name: 'sampleItem',
  // CRUD methods below
  read: function(req, resource, params, config, callback) {
    const id = parseInt(params.id, 10);
    let sample;
    switch (id) {
    case 1:
      sample = {'id': 1, 'name': 'Rijssen', 'province': 'Overijssel'};
      break;
    case 2:
      sample = {'id': 2, 'name': 'Soest Zuid', 'province': 'Utrecht'};
      break;
    case 3:
      sample = {'id': 3, 'name': 'Driebergen-Zeist', 'province': 'Utrecht'};
      break;
    case 4:
      sample = {'id': 4, 'name': 'Amersfoort', 'province': 'Utrecht'};
      break;
    default:
      sample = null;
    }
    callback(null, sample);
  }
  // create: function(req, resource, params, body, config, callback) {},
  // update: function(req, resource, params, body, config, callback) {},
  // delete: function(req, resource, params, config, callback) {}
};

export default sampleItem;