var exec = require('child_process').exec;
var common = require('./common');
var assert = common.assert;
var marc = common.marc;

common.expected = 1;

var child = exec('node cli.js test/books.mrc', function(error, stdout, stderr) {
  assert.equal(stdout, 'Count: 100\n');
});
