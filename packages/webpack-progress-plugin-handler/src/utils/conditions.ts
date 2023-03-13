import { maxPercentage } from '../constants';

import type { IProcessData, IProgressData } from '../types';

export const isProgressFinished = (data: IProgressData): boolean => {
    return !Object.values(data).find((item) => item !== maxPercentage);
};

export const isMessagesEmpty = (data: IProcessData): boolean => {
    return !Object.values(data).find(Boolean);
};
