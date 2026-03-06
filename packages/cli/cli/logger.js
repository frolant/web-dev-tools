"use strict";

const log = console.log;

const getStyledText = (style, text) => `${style}${text}\x1b[0m`;
const getErrorText = (text) => getStyledText('\u001b[31m\u001b[1m', text);

const configNotFoundErrorText = `${getErrorText('Config file .clirc.js not found!')} \nSearch paths list:\n`;

module.exports = ({
    logConfigNotFoundError: (paths) => log(configNotFoundErrorText, paths),
    logWrongArgumentError: () => log(getErrorText('Wrong command arguments!')),
    logWrongChooseError: (history) => log(getErrorText(`Wrong choose for command part "${history.join('>')}"!`)),
    getBoldText: (text) => getStyledText('\x1b[1m', text),
    getGrayText: (text) => getStyledText('\x1b[2m', text),
    getInclinedGrayText: (text) => getStyledText('\x1b[3m\x1b[2m', text),
});
