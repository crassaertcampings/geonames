'use strict';

const config = require('pelias-config').generate();
const validateISOCode = require('../lib/validateISOCode');
const task = require('../lib/tasks/download');
let countryCodeConfig = config.imports.geonames.countryCode;

if (!(countryCodeConfig instanceof Array)) {
    countryCodeConfig = [countryCodeConfig];
}

countryCodeConfig.forEach(item => {
    const countryCode = validateISOCode(item);

    const filename = countryCode === 'ALL' ? 'allCountries' : item;
    task(filename);
});