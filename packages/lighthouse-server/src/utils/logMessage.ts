const messagePrefix = '  \u001b[32m\u001b[1mLH:server\x1b[0m';
const { log } = console;

export const logMessage = (message: string): void => {
    log(`${messagePrefix} ${message}`);
};
