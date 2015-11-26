import actions from '../config/actions';

export default function loadUserItem(context, payload, callback) {
  // First parameter should call the service by its name that was defined inside the file
  context.service.read('userItem', { id: payload.get('params').get('id') }, {}, (err, result) => {
    // Update store with new result
    context.dispatch(actions.USER_ITEM_LOADED, { user: result });
    // End the action
    callback(err);
  });
}
