var filter = require('through2-filter');
var _ = require('lodash');
const config = require('pelias-config').generate();

const unwantedFromConfig = typeof config.imports.geonames.excludeCodes === 'undefined' ? [] :
    config.imports.geonames.excludeCodes;

const baseUnwantedFcodes = [
    'RGN',   // large regions like 'Northern Europe' or 'Southern California' that don't fit well in admin hierarchies
    'RGNE',  // economic regions. consists of multiple cities and is unwanted for geocoding
    'ADM1H', // historical
    'ADM2H', // historical
    'ADM3H', // historical
    'ADM4H', // historical
    'ADMDH', // historical
    'PCLH',  // historical
    'RGNH',  // historical
    'PPLCH', // historical
    'PPLH',  // historical
    'PPLQ',  // abandoned places
    'PPLW',  // destroyed place
    'ZN',    // large multi-state regions
    'CONT',  // contenents (currently not supported)
];

const unwantedFcodes = [...baseUnwantedFcodes, ...unwantedFromConfig];

function filterRecord(data) {
    return !_.includes(unwantedFcodes, data.feature_code);
}

function create() {
    return filter.obj(filterRecord);
}

module.exports = {
    filterRecord: filterRecord,
    create: create
};
