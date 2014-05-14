var Matcher = require('minimatch').Minimatch;

/**
 * Sets the given metadata on the file object
 *
 * @param file {Object}
 * @param metadata {Object}
 * @private
 */
function setMetadata(file, metadata) {
    Object.keys(metadata).forEach(function (key) {
        file[key] = metadata[key];
    });
}

/**
 * Sets some metadata on each file depending a pattern
 *
 * @param default {Object} the metadata to set by default on each file
 * @param rules {Array} array of rules to set the metadata, each item of
 * the array should be a literal object containing a `pattern` entry (String)
 * and a `metadata` entry (Object)
 *
 * @return {Function}
 */
module.exports = function (def, rules) {
    var def = def || {},
        rules = rules || [],
        matchers = [];

    rules.forEach(function (rule) {
        matchers.push({
            matcher: new Matcher(rule.pattern),
            metadata: rule.metadata
        });
    });

    return function (files, metalsmith, done) {
        Object.keys(files).forEach(function (file) {
            var fileObject = files[file];

            setMetadata(fileObject, def);
            matchers.forEach(function (rule) {
                if ( rule.matcher.match(file) ) {
                    setMetadata(fileObject, rule.metadata);
                }
            });
        });
        done();
    };
};
