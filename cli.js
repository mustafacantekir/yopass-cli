#!/usr/bin/env node

require('yargs')
    .commandDir('command')
    .demandCommand()
    .help()
    .wrap(80)
    .argv