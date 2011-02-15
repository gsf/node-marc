var marc = require('./marc');

//marc.total('art.utf8.mrc', function(count) {
//  console.log('Total: '+count);
//});

marc.map('art.utf8.mrc', function(recordBuffer) {
  var leaderBuffer = marc.getLeaderBuffer(recordBuffer);
  //console.log(leaderBuffer.toString());
  var directoryBuffer = marc.getDirectoryBuffer(recordBuffer, 
    marc.getBaseAddress(leaderBuffer));
  //console.log(directoryBuffer.toString());
});
