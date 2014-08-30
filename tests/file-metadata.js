/* global describe, it, beforeEach */
var assert = require('assert'),
    fm = require('..');

describe('File metadata plugin', function () {
    var files,
        metalsmith = false; // allow to check it's not used at all

    beforeEach(function () {
        files = {
            "file1": {},
            "file2": {},
        };
    });

    it('should keep the files intact without parameters', function () {
        var func = fm();

        func(files, metalsmith, function () {
            assert.equal(0, Object.keys(files.file1).length);
            assert.equal(0, Object.keys(files.file2).length);
        });
    });

    it('should set the rule metadata when the pattern matches', function () {
        var town = 'St Paul de Varax',
            time = '7:45',
            func = fm([{
                metadata: {
                    town: town,
                    time: time
                },
                pattern: '*1',
            }]);

        func(files, metalsmith, function () {
            assert.equal(town, files.file1.town);
            assert.equal(time, files.file1.time);

            assert.notEqual(town, files.file2.town);
            assert.notEqual(time, files.file2.time);
        });
    });

    it('should set the rule metadata to all files', function () {
        var town = 'St Paul de Varax',
            time = '7:45',
            func = fm([{
                metadata: {
                    town: town,
                    time: time
                },
                pattern: '*',
            }]);

        func(files, metalsmith, function () {
            assert.equal(town, files.file1.town);
            assert.equal(time, files.file1.time);

            assert.equal(town, files.file2.town);
            assert.equal(time, files.file2.time);
        });
    });

    it('should preserve pre-defined metadata when opts.preserve == true', function () {
        var town = 'NYC',
            time = '19:45',
            files = {
                "file1": {
                     town: town,
                     time: time,
                },
            },
            func = fm([{
                preserve: true,
                metadata: {
                    town: 'St Paul de Varax',
                    time: '7:45',
                },
                pattern: '*',
            }]);

        func(files, metalsmith, function () {
            assert.equal(town, files.file1.town);
            assert.equal(time, files.file1.time);
        });
    });
});
