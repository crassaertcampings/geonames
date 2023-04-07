const fs = require('fs'),
    util = require('util'),
    request = require('request'),
    logger = require( 'pelias-logger' ).get( 'geonames' );

// use datapath setting from your config file
const settings = require('pelias-config').generate();
const basepath = settings.imports.geonames.datapath;

function getLocalFileStream(filename) {
  const localFileName = util.format( '%s/%s.zip', basepath, filename );
  if( fs.existsSync( localFileName ) ){
    logger.info( 'reading datafile from disk at:', localFileName );
    return fs.createReadStream( localFileName);
  } else {
    return undefined;
  }
}

function getRemoteFileStream(filename) {
  const remoteFilePath = util.format( 'https://download.geonames.org/export/dump/%s.zip', filename );

  logger.info( 'streaming datafile from:', remoteFilePath );
  return request.get( remoteFilePath );
}

function selectSource(filename) {
  return getLocalFileStream(filename) || getRemoteFileStream(filename);
}

module.exports = {
  getLocalFileStream: getLocalFileStream,
  getRemoteFileStream: getRemoteFileStream,
  selectSource: selectSource
};
