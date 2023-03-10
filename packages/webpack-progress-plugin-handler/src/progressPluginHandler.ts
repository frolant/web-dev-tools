import { state, progressData, processMessageData, displayingRestriction } from './constants';

import { getMessage, logMessage, clearLogLines } from './utils';

export const progressPluginHandler = (configName = 'progress', progress = 0, processMessage = '', processInfo: string[] = []): void => {
    const percentage = Math.floor(progress * 100);
    const logLinesCount = Object.keys(progressData).length + 1;

    processMessageData[configName] = processMessage || processInfo.length ? `${processMessage} ${processInfo.join(' ')}` : '';
    progressData[configName] = percentage;

    if (percentage > displayingRestriction) {
        if (state.initialized) {
            clearLogLines(logLinesCount);
        } else {
            state.initialized = true;
        }

        Object.keys(progressData).forEach((entryName) => {
            const message = getMessage(entryName, progressData[entryName], processMessageData[entryName]);
            logMessage(message);
        });
    }

    if (state.initialized && percentage === 100) {
        const isPercentageFinished = !Object.values(progressData).find((item) => item !== 100);

        if (isPercentageFinished) {
            const isMessagesFinished = !Object.values(processMessageData).find(Boolean);

            if (isMessagesFinished) {
                state.initialized = false;
                clearLogLines(logLinesCount);
            }
        }
    }
};

export default progressPluginHandler;
