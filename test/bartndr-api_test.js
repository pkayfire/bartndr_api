/*global describe,it*/
'use strict';
var assert = require('assert'),
  bartndrApi = require('../lib/bartndr-api.js');

describe('bartndr-api node module.', function() {
  it('must be awesome', function() {
    assert( bartndrApi .awesome(), 'awesome');
  });
});
