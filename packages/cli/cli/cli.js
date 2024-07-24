"use strict";

const { resolve } = require('path');
const { spawn } = require('child_process');

const logger = require('./logger');
const getCommandFromDialog = require('./dialog');

const config = require(resolve(process.cwd(), './.clirc.js'));

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

    if (args.length) {
        args.forEach((arg) => {
            if (result && result.answers) {
                const findingQuestion = result.answers.find((answer) => answer.value === arg);
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
        logger.wrongArgumentError();
    }
};

module.exports = cli;
