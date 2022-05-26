const Matcher = require("minimatch").Minimatch;

function setMetadata(file, global, rule) {
  if (typeof rule.metadata === "function") {
    rule = Object.assign({}, rule, { metadata: rule.metadata(file, global) });
  }
  Object.keys(rule.metadata).forEach(function (key) {
    if (rule.preserve && key in file) {
      return;
    }
    file[key] = rule.metadata[key];
  });
}

/**
 * Sets some metadata on each file depending a pattern
 */
module.exports = function (rules = []) {
  const matchers = [];

  rules.forEach(function (rule) {
    matchers.push({
      matcher: new Matcher(rule.pattern),
      metadata: rule.metadata,
      preserve: rule.preserve,
    });
  });

  return function (files, metalsmith, done) {
    const globalMetadata = metalsmith.metadata();

    Object.keys(files).forEach(function (file) {
      const fileObject = files[file];

      matchers.forEach(function (rule) {
        if (rule.matcher.match(file)) {
          setMetadata(fileObject, globalMetadata, rule);
        }
      });
    });
    done();
  };
};
