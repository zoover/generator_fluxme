export default function loadUserItem(context, payload, callback) {

  // Empty the store before loading new items
  context.dispatch('USER_ITEM_LOAD', { user: null } );

  const id = payload.get('params').get('id');

  // First parameter should call the service by its name that was defined inside the file
  context.service.read('userItem', { id: id }, {}, (err, result) => {
    if (err) {
      return callback(err);
    }
    // Update store with new result
    context.dispatch('USER_ITEM_LOAD', { user: result });
    // End the action
    callback();
  });
}
