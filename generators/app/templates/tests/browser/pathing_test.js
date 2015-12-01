const Browser = require('zombie');

const browser = new Browser({site: 'http://localhost:3000'});

describe('User visits home page', function() {
  before(function(done) {
    browser.visit('/', done);
  });
  it('should do stuff', function() {
    browser.assert.text('h1', 'Sample List')
  });
});

//TODO find out how to simulate clicks hrefs etc
