export default function loadUserList(context, payload, callback) {
  // First parameter should call the service by its name that was defined inside the file
  context.service.read('userList', {}, {}, function(err, result) {
    // Update store with new result
    context.dispatch('USER_LIST_LOADED', { users: result } );
    // End the action
    callback(err);
  });
}
