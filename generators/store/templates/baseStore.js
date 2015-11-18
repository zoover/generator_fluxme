import BaseStore from 'fluxible/addons/BaseStore';

class <%= className %>  extends BaseStore {
  constructor(dispatcher) {
    super(dispatcher);
    this.sample = null;
  }

  getSample() {
    return this.sample;
  }

  dehydrate() {
    return {
      sample: this.sample
    };
  }

  rehydrate(state) {
    this.sample = state.sample;
  }
}

<%= className %>.storeName = "<%= className %>";

export default <%= className %>;
