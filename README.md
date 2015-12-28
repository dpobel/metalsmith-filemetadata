# metalsmith-filemetadata

A Metalsmith plugin to add metadata on files based on a pattern.

[![Build
Status](https://travis-ci.org/dpobel/metalsmith-filemetadata.svg?branch=master)](https://travis-ci.org/dpobel/metalsmith-filemetadata)
[![Dependency
Status](https://gemnasium.com/dpobel/metalsmith-filemetadata.svg)](https://gemnasium.com/dpobel/metalsmith-filemetadata)

## Installation

    $ npm install metalsmith-filemetadata

## JavaScript usage

```js
var fileMetadata = require('metalsmith-filemetadata');

metalsmith.use(fileMetadata([
    {pattern: "posts/*", metadata: {"section": "blogs", "type": "post"}},
    {pattern: "pages/*", metadata: {"section": "content", "type": "page"}}
]));

```

The `pattern` property of each rule should be a valid
[minimatch](https://www.npmjs.org/package/minimatch) pattern. If the pattern
matches the file, the corresponding `metadata` are set on the file entry, For a
given file, all patterns are tested, so if several rules are matching, the later
can override the previously applied rules.

Adding the `preserve: true` to any rule will prevent overriding pre-defined values.

## CLI usage

```json
{
  "plugins": {
    "metalsmith-filemetadata": [
      {"pattern": "posts/*", "metadata": {"section": "blogs", "type": "post"}},
      {"pattern": "pages/*", "metadata": {"section": "content", "type": "page"}}
    ]
  }
}
```

## License

MIT
