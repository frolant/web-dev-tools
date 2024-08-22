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

const getDialogData = (config, args) => {
    let result = config;

    if (config && args.length) {
        args.forEach((arg) => {
            if (result && result.answers) {
                const findingQuestion = result.answers.find((answer) => answer.id === arg || answer.value === arg);
                result = findingQuestion ? findingQuestion : null;
            }
        });
    }

    return result;
};

const cli = async (args) => {
    const dialogData = getDialogData(config, args);

    if (dialogData) {
        const command = await getCommandFromDialog(dialogData);
        command && runCommand(command);
    } else {
        logger.logWrongArgumentError();
    }
};

module.exports = cli;
