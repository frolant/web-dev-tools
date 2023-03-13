import { IProcessData, IProgressData, IState } from './types';

export const progressData: IProgressData = {};

export const processMessageData: IProcessData = {};

export const state: IState = {
    initialized: false
};

export const displayingPercentageRestriction = 10;
export const maxPercentage = 100;

export const consoleStyles = {
    dim: '\x1b[2m',
    bold: '\x1b[1m',
    gray: '\x1b[90m',
    drop: '\x1b[0m'
};
