var marc = require('../marc');

marc.count('test/books.mrc', function(count) {
  console.log('Count: '+count);
});
