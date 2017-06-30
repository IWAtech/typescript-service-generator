'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-service-generator:app', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        projectName: 'my-service',
        organizationName: 'me'
      });
  });

  it('creates files', () => {
    assert.file([
      'package.json'
    ]);
  });
});