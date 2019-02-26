# metalsmith-filemetadata

A Metalsmith plugin to add metadata on files based on a pattern.

[![Build
Status](https://travis-ci.org/dpobel/metalsmith-filemetadata.svg?branch=master)](https://travis-ci.org/dpobel/metalsmith-filemetadata)

## Installation

    $ npm install metalsmith-filemetadata

## JavaScript usage

```js
var fileMetadata = require('metalsmith-filemetadata');

metalsmith.use(fileMetadata([
    {pattern: "posts/*", metadata: {"section": "blogs", "type": "post"}},
    {pattern: "pages/*", metadata: {"section": "content", "type": "page"}},
    {
      pattern: [ "posts/*", "pages/*", "!**/index*" ],
      metadata: {
        cover: 'images/{title}.jpg'
      }
    },
    {
      // metalsmith-mapsite reads 'lastmod'
      pattern: [ 'articles/*', '!articles/index' ],
      // {lastmod} template evaluates to token passed in below
      metadata: { 'lastmod': '{lastmod}' },
      tokens: { lastmod: (meta) => {
        return meta.modifiedDate.slice(0, 10)
      }}
    }
]));

```

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

## Parameters

 * `pattern`: {String|Array}
   [multimatch](https://www.npmjs.org/package/multimatch) pattern to filter
   files.
 * `metadata`: {Object} key value pairs to set on matched files. If several
   rules match the last rule will be applied. Values will be
   [interpolated](https://www.npmjs.com/package/metalsmith-interpolate).
 * `tokens`: {Object} additional tokens you want to be available for
   interpolation.
 * `preserve`: {Boolean} preserve existing values.

## License

MIT
