# metalsmith-filemetadata

A Metalsmith plugin to add metadata on files based on a pattern.

![Build status](https://github.com/dpobel/metalsmith-filemetadata/actions/workflows/main.yml/badge.svg)

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
matches the file, the corresponding `metadata` are set on the file entry. For a
given file, all patterns are tested, so if several rules are matching, the latter
can override the previously applied rules.

The `metadata` property can also be a function, to enable making global metadata available to files,
or setting file metadata defaults, e.g.:

```js
{
  pattern: "posts/*",
  metadata: function(file, globalMetadata) {
    return {
      title: file.keywords || globalMetadata.keywords,
      allPosts: globalMetadata.collections.posts
    };
  }
}
```

Adding `preserve: true` to any rule will prevent overriding pre-defined values.

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
