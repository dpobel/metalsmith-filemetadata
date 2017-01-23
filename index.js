var multimatch = require('multimatch');
var interpolate = require('metalsmith-interpolate').default;

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
  return function (files, metalsmith, done) {
    if (!rules) return done();
    rules.forEach((rule) => {
      multimatch(Object.keys(files), rule.pattern).forEach((src) => {
        let file = files[src];
        Object.keys(rule.metadata).forEach((key) => {
          if (rule.preserve && file.hasOwnProperty(key)) return;
          file[key] = interpolate(rule.metadata[key], src, files);
        });
      });
    });
    done();
  };
};
