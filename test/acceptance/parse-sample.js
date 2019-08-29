var fs = require('fs');

describe('parsing sample m3u', function() {
  it('should emit 3 items', function(done) {
    var parser = getParser();

    var items = 0;
    parser.on('item', function() {
      items++;
    });
    parser.on('m3u', function() {
      items.should.equal(3);
      done();
    });
  });

  describe('first StreamItem', function() {
    it('should match the 2nd Playlist item in fixture', function(done) {
      var parser = getParser();

      parser.on('m3u', function(m3u) {
        // console.log('m3u ' + JSON.stringify(m3u.items, null, ' '));
        var item = m3u.items.PlaylistItem[1];
        item.get('tvgLogo').should.equal('http://www.pngmart.com/files/4/Hollywood-Sign-PNG-Photos.png');
        item.get('uri').should.equal('http://huyxxive/3049003128-10057-A-0-1_1200.m3u8');
        done();
      });
    });
  });
});

function getParser() {
  var parser      = require('../../parser').createStream();
  var variantFile = fs.createReadStream(
    __dirname + '/../fixtures/sample.m3u'
  );
  variantFile.pipe(parser);
  return parser;
}
