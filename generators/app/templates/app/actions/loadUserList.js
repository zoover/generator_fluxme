export default function loadUserList(context, payload, callback) {

  // Empty the store before loading new items
  context.dispatch('USER_LIST_LOAD', { users: [] } );

  // First parameter should call the service by its name that was defined inside the file
  context.service.read('userList', {}, {}, function(err, result) {
    if (err) {
      return callback(err);
    }
    // Update store with new result
    context.dispatch('USER_LIST_LOAD', { users: result } );
    // End the action
    callback();
  });
}
