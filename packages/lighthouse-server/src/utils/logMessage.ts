const { log } = console;
const messagePrefix = '  \u001b[32m\u001b[1mLH:server\x1b[0m';

export const logMessage = (message: string): void => {
    log(`${messagePrefix} ${message}`);
};
