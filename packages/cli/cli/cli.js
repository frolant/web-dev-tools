"use strict";

const { spawn } = require('child_process');

const getCommandFromDialog = require('./dialog');
const logger = require('./logger');
const config = require('./config');

const runCommand = (command) => spawn(command, {
    stdio: 'inherit',
    shell: true
}).on('exit', (code) => {
    if (code) {
        process.exitCode = code;
    }
});

const cli = async (args) => {
    if (config) {
        const command = await getCommandFromDialog(config, args);
        command && runCommand(command);
    }
};

module.exports = cli;
