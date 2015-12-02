import events from '../config/events';

export default function loadSampleList(context, payload, callback) {
  // First parameter should call the service by its name that was defined inside the file
  context.service.read('sampleList', {}, {}, (err, result) => {
    // Update store with new result
    if (!err) {
      context.dispatch(events.SAMPLE_LIST_LOADED, { samples: result });
    }
    // End the action
    callback(err);
  });
}
