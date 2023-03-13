import { getProcessMessage, logMessage, clearLogLines, getStyledName, getStyledMessage } from './utils/message';
import { isProgressFinished, isMessagesEmpty } from './utils/conditions';
import { getProgressBar } from './utils/progress';

import { state, progressData, processMessageData, displayingPercentageRestriction, maxPercentage } from './constants';

export const progressPluginHandler = (
    label = 'processing',
    progress = 0,
    processMessage = '',
    processInfo: string[] = []
): void => {
    const percentage = Math.floor(progress * maxPercentage);
    const logLinesCount = Object.keys(progressData).length + 1;

    processMessageData[label] = getProcessMessage(processMessage, processInfo);
    progressData[label] = percentage;

    if (percentage > displayingPercentageRestriction) {
        if (state.initialized) {
            clearLogLines(logLinesCount);
        } else {
            state.initialized = true;
        }

        Object.keys(progressData).forEach((name) => {
            const percent = progressData[name];

            const styledName = getStyledName(name);
            const progressBar = getProgressBar(name, percent);
            const styledMessage = getStyledMessage(processMessageData[name]);

            logMessage(`${styledName} ${progressBar} ${percent}% ${styledMessage}`);
        });
    }

    if (state.initialized && percentage === maxPercentage) {
        if (isProgressFinished(progressData)) {
            if (isMessagesEmpty(processMessageData)) {
                state.initialized = false;
                clearLogLines(logLinesCount);
            }
        }
    }
};

export default progressPluginHandler;
