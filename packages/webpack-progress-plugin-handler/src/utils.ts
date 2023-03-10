import { consoleStyles } from './constants';

const cubeCharCode = '■';

const enabledItem = `${consoleStyles.dim}${cubeCharCode}${consoleStyles.drop}`;
const disabledItem = `${consoleStyles.dim}${consoleStyles.gray}${cubeCharCode}${consoleStyles.drop}`;

const getProgressBar = (percentage: number): string => {
    let result = '';
    const progress = Math.floor(percentage / 5);

    for (let i = 0; i < 20; i++) {
        result = `${result}${i <= progress ? enabledItem : disabledItem}`;
    }

    return result;
};

export const getMessage = (configName: string, percentage: number, processInfo: string): string => {
    const name = `${consoleStyles.bold}${configName}${consoleStyles.drop}`;
    const progressBar = getProgressBar(percentage);
    const info = `${consoleStyles.gray}${processInfo}${consoleStyles.drop}`;

    return `${name} ${progressBar} ${percentage}% ${info}`;
};

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
