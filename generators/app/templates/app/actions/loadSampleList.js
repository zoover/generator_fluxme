import actions from '../config/actions';

export default function loadSampleList(context, payload, callback) {
  // First parameter should call the service by its name that was defined inside the file
  context.service.read('sampleList', {}, {}, (err, result) => {
    // Update store with new result
    context.dispatch(actions.SAMPLE_LIST_LOADED, { samples: result });
    // End the action
    callback(err);
  });
}