var fs = require('fs');


var LEADER_LENGTH = 24;
var DIRECTORY_LENGTH = 12;
var RECORD_LENGTH = 99999;
var RECORD_TERMINATOR = '\u001D';
var FIELD_TERMINATOR = '\u001E';
var DELIMITER = '\u001F';


exports.getLeaderBuffer = function(recordBuffer) {
  return recordBuffer.slice(0, 24);
};

exports.getBaseAddress = function(leaderBuffer) {
  var baseAddressBuffer = leaderBuffer.slice(12, 17);
  return parseInt(baseAddressBuffer.toString(), 10);
};

exports.getDirectoryBuffer = function(recordBuffer, baseAddress) {
  return recordBuffer.slice(24, baseAddress);
};

exports.getFields = function(recordBuffer, tag) {
  var directoryBuffer = exports.getDirectoryBuffer(recordBuffer, 
      exports.getBaseAddress);
  var scanDirectories = function(directoryBuffer, position) {
    if (tag === directoryBuffer.toString('ascii', position, position+3)) {
    }
  };
};

exports.map = function(file, cb) {
  var lengthBuffer = new Buffer(5);
  var length;
  //var leaderBuffer = new Buffer(LEADER_LENGTH);
  //var leader;
  //var directoryBuffer = new Buffer(DIRECTORY_LENGTH);
  //var directory;
  var recordBuffer = new Buffer(RECORD_LENGTH);
  //var record;
  //var base;
  var scan = function(fd, position) {
    fs.read(fd, lengthBuffer, 0, 5, position, function(err, bytesRead) {
      if (err) throw err;
      if (!bytesRead) return; // end of file
      length = parseInt(lengthBuffer.toString(), 10);
      fs.read(fd, recordBuffer, 0, length, position, function(err) {
        if (err) throw err;
        cb(recordBuffer);
      });
      position = position + length;
      scan(fd, position);
    });
  };
  fs.open(file, 'r', 0666, function(err, fd) {
    if (err) throw err;
    scan(fd, 0);
  });
};

// for a really quick count of all the records in a file
exports.count = function(file, cb) {
  var lengthBuffer = new Buffer(5);
  var length;
  var count = 0;
  var scan = function(fd, position) {
    fs.read(fd, lengthBuffer, 0, 5, position, function(err, bytesRead) {
      if (err) throw err;
      if (!bytesRead) { // end of file
        cb(count);
        return;
      }
      count++;
      length = parseInt(lengthBuffer.toString(), 10);
      position = position + length;
      scan(fd, position);
    });
  };
  fs.open(file, 'r', 0666, function(err, fd) {
    if (err) throw err;
    scan(fd, 0);
  });
};

  //var processRecord = function(fd, position, length) {
  //  fs.read(fd, leaderBuffer, 0, LEADER_LENGTH, position, function(err, bytesRead) {
  //    if (err) throw err;
  //    leader = leaderBuffer.toString();
  //    //console.log(leader);
  //  });
  //  fs.read(fd, recordBuffer, 0, length, position, function(err, bytesRead) {
  //    if (err) throw err;
  //    //record = recordBuffer.toString('utf8');
  //    //console.log(record);
  //  });
  //};
