export default function loadSampleItem(context, payload, callback) {

  // Empty the store before loading new items
  context.dispatch('SAMPLE_ITEM_LOAD', { sample: null } );

  const id = payload.get('params').get('id');

  // First parameter should call the service by its name that was defined inside the file
  context.service.read('sampleItem', {id: id}, {}, (err, result) => {
    if (err) {
      return callback(err);
    }
    // Update store with new result
    context.dispatch('SAMPLE_ITEM_LOAD', { sample: result });
    // End the action
    callback();
  });
}
