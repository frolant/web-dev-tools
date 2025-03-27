"use strict";

const { spawn } = require('child_process');

const getCommandFromDialog = require('./dialog');
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
    const configData = config.default || config;
    if (configData) {
        const command = await getCommandFromDialog(configData, args);
        command && runCommand(command);
    }
};

module.exports = cli;
