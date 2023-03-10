const getProgressBar = (percentage: number): string => {
    let result = '';
    const progress = Math.floor(percentage / 5);
    for (let i = 0; i < 20; i++) {
        result = `${result}${i <= progress ? '#' : ' '}`;
    }
    return `[${result}]`;
};

export const getMessage = (configName = 'building', percentage = 0): string => {
    return `${configName} ${getProgressBar(percentage)} ${Math.floor(percentage * 100)}%`;
};

export const clearLogLines = (count: number): void => {
    for (let i = 0; i < count; i++) {
        process.stdout.moveCursor(0, i === 0 ? null : -1);
        process.stdout.clearLine(1);
    }
    process.stdout.cursorTo(0);
};
