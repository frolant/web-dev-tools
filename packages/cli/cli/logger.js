"use strict";

const log = console.log;

module.exports = ({
    wrongArgumentError: () => log('Wrong command arguments!'),
    wrongChooseError: () => log('Wrong choose. Run cancelled!'),
});
