export default function loadSampleItem(context, payload, callback) {
  // First parameter should call the service by its name that was defined inside the file
  context.service.read('sampleItem', {id: payload.get('params').get('id')}, {}, (err, result) => {
    // Update stores with new result
    context.dispatch('SAMPLE_ITEM_LOADED', { sample: result });
    // End the action
    callback(err);
  });
}
