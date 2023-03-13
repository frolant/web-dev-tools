import { consoleStyles } from '../constants';

const progressItemSourceCode = '\u25A0';

const enabledItem = `${consoleStyles.dim}${progressItemSourceCode}${consoleStyles.drop}`;
const disabledItem = `${consoleStyles.dim}${consoleStyles.gray}${progressItemSourceCode}${consoleStyles.drop}`;

const progressBarData: Record<string, string> = {};
const percentageData: Record<string, number> = {};

export const getProgressBar = (name: string, percentage: number): string => {
    const isPercentageChanged = percentageData[name] !== percentage;
    let result = isPercentageChanged ? '' : progressBarData[name];

    if (isPercentageChanged) {
        const progress = Math.floor(percentage / 5);

        for (let i = 0; i < 20; i++) {
            result = `${result}${i <= progress ? enabledItem : disabledItem}`;
        }

        percentageData[name] = percentage;
        progressBarData[name] = result;
    }

    return result;
};
