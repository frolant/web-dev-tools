"use strict";

const { spawn } = require('child_process');

const getCommandFromDialog = require('./dialog');
const logger = require('./logger');
const config = require('./config');
const { getHistoryData } = require('./utils');

const runCommand = (command) => spawn(command, {
    stdio: 'inherit',
    shell: true
}).on('exit', (code) => {
    if (code) {
        process.exitCode = code;
    }
});

const getDialogDataFromArgs = (config, args) => {
    let result = config;

    if (config && args.length) {
        let argsHistory = [];

        args.forEach((arg) => {
            argsHistory.push(arg);

            if (result && result.answers) {
                const answers = result.answers(...getHistoryData(argsHistory)) || [];
                const findingQuestion = answers.find((answer, id) => arg === id + 1 || arg === answer.command);
                result = findingQuestion || null;
            }
        });
    }

    return result;
};

const cli = async (args) => {
    const dialogData = getDialogDataFromArgs(config, args);

    if (dialogData) {
        const command = await getCommandFromDialog(dialogData);
        command && runCommand(command);
    } else {
        logger.logWrongArgumentError();
    }
};

module.exports = cli;
