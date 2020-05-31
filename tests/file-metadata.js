/* global describe, it, beforeEach */
var assert = require('assert'),
    Metalsmith = require('metalsmith'),
    fm = require('..');

describe('File metadata plugin', function () {
    var metalsmith = Metalsmith(__dirname)
      .source(__dirname)
      .ignore('file-metadata.js');

    beforeEach(function () {
      metalsmith.use(function(files) {
        files.file1 = {};
        files.file2 = {};
        files.file3 = { preserved: true };
      });
    });

    it('should keep the files intact without parameters', function (done) {
        var func = fm();

        metalsmith
          .use(func)
          .process(function(err, files) {
              if (err) done(err);

              assert.equal(0, Object.keys(files.file1).length);
              assert.equal(0, Object.keys(files.file2).length);

              done();
          });
    });

    it('should set the rule metadata when the pattern matches', function (done) {
        var town = 'St Paul de Varax',
            time = '7:45',
            func = fm([{
                metadata: {
                    town: town,
                    time: time
                },
                pattern: '*1',
            }]);

        metalsmith
            .use(func)
            .process(function(err, files) {
                if (err) done(err);

                assert.equal(town, files.file1.town);
                assert.equal(time, files.file1.time);

                assert.notEqual(town, files.file2.town);
                assert.notEqual(time, files.file2.time);
                
                done();
            });
    });

    it('should set the rule metadata to all files', function (done) {
        var town = 'St Paul de Varax',
            time = '7:45',
            func = fm([{
                metadata: {
                    town: town,
                    time: time
                },
                pattern: '*',
            }]);

        metalsmith
            .use(func)
            .process(function(err, files) {
                if (err) done(err);

                assert.equal(town, files.file1.town);
                assert.equal(time, files.file1.time);

                assert.equal(town, files.file2.town);
                assert.equal(time, files.file2.time);

                done();
            });
    });

    it('should set the rule metadata when its value is a function callback', function(done) {
        var sitename = 'Metalsmith Filemetadata',
            defaultTime = '00:00',
            time = '7:45',
            func = fm([{
                metadata: function(file, globalMetadata) {
                    return {
                        sitename: globalMetadata.sitename,
                        time: file.time ? file.time : defaultTime
                    };
                },
                pattern: '*'
            }]);

        metalsmith
            .metadata({
                sitename: sitename
            })
            .use(function(files, metalsmith, next) {
              files.file1.time = time;
              next();
            })
            .use(func)
            .process(function(err, files) {
                if (err) done(err);

                assert.equal(files.file1.sitename, sitename);
                assert.equal(files.file1.time, time);
                assert.equal(files.file2.time, defaultTime);

                done();
            });
    });

    it('should preserve pre-defined metadata when opts.preserve == true', function (done) {
        var func = fm([{
            preserve: true,
            metadata: {
                preserved: false
            },
            pattern: '*{1,2}',
        }]);

        metalsmith
            .use(func)
            .process(function(err, files) {
                if (err) done(err);

                assert.equal(false, files.file1.preserved);
                assert.equal(true, files.file3.preserved);

                done();
            });
    });
});
