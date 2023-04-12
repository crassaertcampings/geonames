const config = require('pelias-config').generate();
const _ = require('lodash');
const logger = require('pelias-logger').get('geonames');

if (_.has(config, 'imports.geonames.adminLookup')) {
  logger.info('imports.geonames.adminLookup has been deprecated, ' +
      'enable adminLookup using imports.adminLookup.enabled = true');
}

const resolvers = require( './lib/tasks/resolvers' );
const task = require('./lib/tasks/import');
const validateISOCode = require('./lib/validateISOCode');

const countryCode = process.env.COUNTRY || config.imports.geonames.countryCode;

const isocode = validateISOCode( countryCode );
const filename = isocode === 'ALL' ? 'allCountries' : isocode;
const source = resolvers.selectSource( filename );

task( source );