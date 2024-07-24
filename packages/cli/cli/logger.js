"use strict";

const log = console.log;

const getRedText = (text) => `\u001b[31m\u001b[1m${text}\x1b[0m`;

module.exports = ({
    wrongArgumentError: () => log(getRedText('Wrong command arguments!')),
    wrongChooseError: () => log(getRedText('Wrong choose. Run cancelled!')),
    getGrayText: (text) => `\x1b[90m${text}\x1b[0m`,
    getBoldText: (text) => `\u001b[31m${text}\x1b[0m`,
});
