var common = require('./common');
var assert = common.assert;
var marc = common.marc;

common.expected = 1;

marc.count('test/books.mrc', function(count) {
  assert.equal(count, 100);
});
