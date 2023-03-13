import { consoleStyles } from '../constants';

export const getProcessMessage = (processMessage: string, processInfo: string[]): string => {
    return processMessage || processInfo.length ? `${processMessage} ${processInfo.join(' ')}` : '';
};

export const getStyledName = (name: string): string => `${consoleStyles.bold}${name}${consoleStyles.drop}`;

export const getStyledMessage = (message: string): string => `${consoleStyles.gray}${message}${consoleStyles.drop}`;

export const logMessage = (message: string): void => {
    process.stdout.write(message);
    process.stdout.write('\n');
};

export const clearLogLines = (logLinesCount: number): void => {
    for (let i = 0; i < logLinesCount; i++) {
        process.stdout.moveCursor(0, i === 0 ? null : -1);
        process.stdout.clearLine(1);
    }

    process.stdout.cursorTo(0);
};
