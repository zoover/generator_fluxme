import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';

let <%= className %> = React.createClass({
  propTypes: {},
  render: function() {
    return (
      <div>

      </div>
    );
  }
});

<%= className %> = connectToStores(<%= className %>, ['STORE_NAME_TO_CONNECT'], (context) => ({

}));

export default <%= className %>;