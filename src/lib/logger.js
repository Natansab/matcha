/**
 * Dependencies
 */

import bunyan from 'bunyan';
import dbg from 'debug';

const pkg = require('../../package.json');

/**
 * Private
 */

const debugChannels = {
  default: dbg(pkg.name),
};

/**
 * Public
 */

function debug(channel) {
  if (!channel) {
    return debugChannels.default;
  }
  if (debugChannels[channel]) {
    return debugChannels[channel];
  }
  debugChannels[channel] = dbg(`${pkg.name}:${channel}`);
  return debugChannels[channel];
}

const log = bunyan.createLogger({
  name: pkg.name,
  version: pkg.version,
  stream: process.stdout,
  level: 'trace',
  serializers: {
    err: bunyan.stdSerializers.err,
  },
});

/**
 * Interface
 */

export { debug, log };
