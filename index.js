var Matcher = require('minimatch').Minimatch;

/**
 * Sets the given metadata on the file object
 *
 * @param file {Object}
 * @param metadata {Object}
 * @private
 */
function setMetadata(file, rule) {
    Object.keys(rule.metadata).forEach(function (key) {
        if (rule.preserve && key in file) {
            return;
        }
        file[key] = rule.metadata[key];
    });
}

/**
 * Sets some metadata on each file depending a pattern
 *
 * @param rules {Array} array of rules to set the metadata, each item of
 * the array should be a literal object containing a `pattern` entry (String)
 * and a `metadata` entry (Object)
 *
 * @return {Function}
 */
module.exports = function (rules) {
    var rules = rules || [],
        matchers = [];

    rules.forEach(function (rule) {
        matchers.push({
            matcher: new Matcher(rule.pattern),
            metadata: rule.metadata,
            preserve: rule.preserve,
        });
    });

    return function (files, metalsmith, done) {
        Object.keys(files).forEach(function (file) {
            var fileObject = files[file];

            matchers.forEach(function (rule) {
                if ( rule.matcher.match(file) ) {
                    setMetadata(fileObject, rule);
                }
            });
        });
        done();
    };
};
