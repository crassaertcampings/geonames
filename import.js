const config = require('pelias-config').generate();
const _ = require('lodash');
const logger = require('pelias-logger').get('geonames');
const dbclient = require('pelias-dbclient');

if (_.has(config, 'imports.geonames.adminLookup')) {
  logger.info('imports.geonames.adminLookup has been deprecated, ' +
              'enable adminLookup using imports.adminLookup.enabled = true');
}

const resolvers = require( './lib/tasks/resolvers' );
const task = require('./lib/tasks/import');
const validateISOCode = require('./lib/validateISOCode');

let countryCodes = config.imports.geonames.countryCode;

if (!(countryCodes instanceof Array)) {
  countryCodes = [countryCodes];
}

const endStream = dbclient({name: 'geonames'});

countryCodes.forEach(item => {
  const isocode = validateISOCode( item );
  const filename = isocode === 'ALL' ? 'allCountries' : isocode;
  const source = resolvers.selectSource( filename );

  task( source, endStream );
});
