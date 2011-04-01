var assert = require('assert');
exports.marc = require('../marc');

var count = 0;
var wrapAssert = function(fn) {
  return function() {
    assert[fn].apply(this, arguments);
    count++;
    process.stdout.write('.');
  };
};

exports.assert = {};
// add all functions from the assert module
for (var fn in assert) {
  if (assert.hasOwnProperty(fn)) {
    exports.assert[fn] = wrapAssert(fn);
  }
}

exports.expected = 0;

process.on('exit', function() {
  process.stdout.write(' ran ' + count + ' of ' + exports.expected + ' tests.\n');
});
