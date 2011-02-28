var marc = require('./marc.js');

var usage = 'usage: node cli.js [--map=SCRIPT] FILE...\n\nDefault operation outputs total record counts for each FILE. Specify\n--map=SCRIPT to map the contents of SCRIPT onto each record in each FILE.';
//console.log(process.argv);
if (process.argv.length < 3) {
  console.log(usage);
  return;
}
if (process.argv[2].substr(0,6) === '--map=') {
  console.log('--map=SCRIPT option not supported yet.');
  //var fileNames = process.argv.slice(3);
  //for (var i = 0; i < fileNames.length; i++) {
  //  var fileName = fileNames[i];
  //}
} else {
  var fileNames = process.argv.slice(2);
  for (var i = 0; i < fileNames.length; i++) {
    var fileName = fileNames[i];
    marc.total(fileName, function(count) {
      console.log('Total: '+count);
    });
  }
}
