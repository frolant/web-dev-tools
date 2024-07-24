"use strict";

const cli = require('./cli');

(async function() {
    await cli(process.argv.slice(2));
}());
