var common = require('./common');
var assert = common.assert;
var marc = common.marc;

common.expected = 1;

var expectedTitles = [
  "Microeconomics : theory/applications / Edwin Mansfield and Gary Yohe.",
  "The multilateral development banks : improving U.S. leadership / Barbara Upton.",
  "The Accountants digest.",
  "Achievement.",
  "ALA bulletin.",
  "Acta crystallographica.",
  "Acta crystallographica.",
  "ASLE transactions.",
  "Acta mathematica.",
  "Acta mechanica."
];
var n = 0;

marc.map('test/11bibs.mrc', function(record) {
  marc.mapFields(record, function(tag, field) {
    if (tag === '245') {
      marc.fieldParts(field, function(indicators, subfields) {
        var data = [];
        for (var i=0; i<subfields.length; i++) {
          data.push(subfields[i][1]);
        }
        //assert.equal(data.join(' '), expectedTitles[n]);
        console.log('"'+data.join(' ')+'"');
      });
    }
  });
  n++
  //console.log(record.toString('utf8', 0, 24));
});
