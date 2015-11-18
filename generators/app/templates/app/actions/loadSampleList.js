export default function loadSampleList(context, payload, callback) {

  // Empty the store before loading new items
  context.dispatch('SAMPLE_LIST_LOAD', { samples: [] } );
  
  // First parameter should call the service by its name that was defined inside the file
  context.service.read('sampleList', {}, {}, (err, result) => {
    if (err) {
      return callback(err);
    }
    // Update store with new result
    context.dispatch('SAMPLE_LIST_LOAD', { samples: result });
    // End the action
    callback();
  });
}