import { state, progressData, displayProgressPercentRestriction } from './constants';

import { getMessage, clearLogLines } from './utils';

const progressPluginHandler = (configName: string, progress: number): void => {
    const isNotActive = !Object.values(progressData).find((item) => item !== 100);
    const percentage = progress * 100;

    progressData[configName] = percentage;

    if (percentage > displayProgressPercentRestriction) {
        if (state.initialized) {
            clearLogLines(3);
        }

        Object.keys(progressData).forEach((entryName) => {
            process.stdout.write(getMessage(entryName, progressData[entryName]));
            process.stdout.write('\n');
        });

        if (!state.initialized) {
            state.initialized = true;
        }
    }

    if (isNotActive) {
        state.initialized = false;
    }
};

export default progressPluginHandler;
