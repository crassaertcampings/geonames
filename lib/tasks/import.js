const geonames = require('geonames-stream');
const model = require('pelias-model');
const blacklistStream = require('pelias-blacklist-stream');

const featureCodeFilterStream = require('../streams/featureCodeFilterStream');
const adminLookupStream = require('pelias-wof-admin-lookup');
const layerMappingStream = require('../streams/layerMappingStream');
const peliasDocGenerator = require('../streams/peliasDocGenerator');
const overrideLookedUpLocalityAndLocaladmin = require('../streams/overrideLookedUpLocalityAndLocaladmin');

module.exports = function( sourceStream, endStream ){

  return sourceStream.pipe( geonames.pipeline )
    .pipe( featureCodeFilterStream.create() )
    .pipe( layerMappingStream.create() )
    .pipe( peliasDocGenerator.create() )
    .pipe( blacklistStream() )
    .pipe( adminLookupStream.create() )
    .pipe( overrideLookedUpLocalityAndLocaladmin.create() )
    .pipe(model.createDocumentMapperStream())
    .pipe( endStream );
};
