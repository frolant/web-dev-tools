"use strict";

const log = console.log;

const getErrorText = (text) => `\u001b[31m\u001b[1m${text}\x1b[0m`;

module.exports = ({
    wrongArgumentError: () => log(getErrorText('Wrong command arguments!')),
    wrongChooseError: () => log(getErrorText('Wrong choose. Run cancelled!')),
    getGrayText: (text) => `\x1b[90m${text}\x1b[0m`,
});
