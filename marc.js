// Call marc.map as follows:
// 
//     var marc = require('marc');
//     marc.map(file, callback);
//
// Where callback is mapped over each record and gets two arguments (err, 
// record).

var fs = require('fs');


exports.LEADER_LENGTH = 24;
exports.DIRECTORY_LENGTH = 12;
exports.RECORD_TERMINATOR = '\u001D';
exports.FIELD_TERMINATOR = '\u001E';
exports.DELIMITER = '\u001F';

exports.map = function(file, cb) {
  fs.open(file, 'r', 0666, function(err, fd) {
    if (err) throw err;
    scan(fd, 0);
  });
};

var lengthBuffer = new Buffer(5);

var scan = function(fd, position) {
  fs.read(fd, lengthBuffer, 0, 5, position, function(err, bytesRead) {
    if (err) throw err;
    if (!bytesRead) return; // end of file
    var length = parseInt(lengthBuffer.toString(), 10);
    //console.log(length);
    //process(fd, position, length);
    position = position + length;
    scan(fd, position);
  });
};

var process = function(fd, position, length) {
};
