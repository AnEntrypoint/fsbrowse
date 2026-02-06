#!/usr/bin/env node

const path = require('path');

function parseArgs(argv) {
  const args = {};
  const aliases = {
    p: 'port',
    port: 'port',
    d: 'dir',
    dir: 'dir',
    h: 'hostname',
    hostname: 'hostname',
    b: 'basepath',
    basepath: 'basepath',
  };

  for (let i = 0; i < argv.length; i++) {
    let arg = argv[i];

    if (arg.startsWith('--')) {
      arg = arg.slice(2);
    } else if (arg.startsWith('-')) {
      arg = arg.slice(1);
    } else {
      continue;
    }

    const key = aliases[arg];
    if (!key) {
      console.warn(`Unknown option: "${argv[i]}"`);
      continue;
    }

    const value = argv[i + 1];
    if (!value || value.startsWith('-')) {
      console.error(`Missing value for "${argv[i]}"`);
      process.exit(1);
    }

    args[key] = value;
    i++;
  }

  return args;
}

const argv = process.argv.slice(2);
const args = parseArgs(argv);

if (args.dir) process.env.BASE_DIR = path.resolve(args.dir);
if (args.port) process.env.PORT = args.port;
if (args.hostname) process.env.HOSTNAME = args.hostname;
if (args.basepath !== undefined) process.env.BASEPATH = args.basepath;

require('./server');
