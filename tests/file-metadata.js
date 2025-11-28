const assert = require("assert");
const { describe, it, beforeEach } = require("node:test");
const Metalsmith = require("metalsmith");
const fileMetadata = require("..");

describe("File metadata plugin", () => {
  const metalsmith = Metalsmith(__dirname)
    .source(__dirname)
    .ignore("file-metadata.js");

  beforeEach(() => {
    metalsmith.use((files) => {
      files.file1 = {};
      files.file2 = {};
      files.file3 = { preserved: true };
    });
  });

  it("should keep the files intact without parameters", (_context, done) => {
    const func = fileMetadata();

    metalsmith.use(func).process((err, files) => {
      if (err) done(err);

      assert.equal(0, Object.keys(files.file1).length);
      assert.equal(0, Object.keys(files.file2).length);

      done();
    });
  });

  it("should set the rule metadata when the pattern matches", (_context, done) => {
    const town = "St Paul de Varax";
    const time = "7:45";
    const func = fileMetadata([
      {
        metadata: {
          town: town,
          time: time,
        },
        pattern: "*1",
      },
    ]);

    metalsmith.use(func).process((err, files) => {
      if (err) done(err);

      assert.equal(town, files.file1.town);
      assert.equal(time, files.file1.time);

      assert.notEqual(town, files.file2.town);
      assert.notEqual(time, files.file2.time);

      done();
    });
  });

  it("should set the rule metadata to all files", (_context, done) => {
    const town = "St Paul de Varax";
    const time = "7:45";
    const func = fileMetadata([
      {
        metadata: {
          town: town,
          time: time,
        },
        pattern: "*",
      },
    ]);

    metalsmith.use(func).process((err, files) => {
      if (err) done(err);

      assert.equal(town, files.file1.town);
      assert.equal(time, files.file1.time);

      assert.equal(town, files.file2.town);
      assert.equal(time, files.file2.time);

      done();
    });
  });

  it("should set the rule metadata when its value is a function callback", (_context, done) => {
    const sitename = "Metalsmith Filemetadata";
    const defaultTime = "00:00";
    const time = "7:45";
    const func = fileMetadata([
      {
        metadata: (file, globalMetadata) => ({
          sitename: globalMetadata.sitename,
          time: file.time ? file.time : defaultTime,
        }),
        pattern: "*",
      },
    ]);

    metalsmith
      .metadata({
        sitename: sitename,
      })
      .use((files, metalsmith, next) => {
        files.file1.time = time;
        next();
      })
      .use(func)
      .process((err, files) => {
        if (err) done(err);

        assert.equal(files.file1.sitename, sitename);
        assert.equal(files.file1.time, time);
        assert.equal(files.file2.time, defaultTime);

        done();
      });
  });

  it("should preserve pre-defined metadata when opts.preserve == true", (_context, done) => {
    const func = fileMetadata([
      {
        preserve: true,
        metadata: {
          preserved: false,
        },
        pattern: "*{1,2}",
      },
    ]);

    metalsmith.use(func).process((err, files) => {
      if (err) done(err);

      assert.equal(false, files.file1.preserved);
      assert.equal(true, files.file3.preserved);

      done();
    });
  });
});
