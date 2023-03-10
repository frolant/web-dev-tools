interface IProgressData {
    [itemName: string]: number;
}

interface IProcessData {
    [itemName: string]: string;
}

interface IState {
    initialized: boolean;
}

export const progressData: IProgressData = {};

export const processMessageData: IProcessData = {};

export const state: IState = {
    initialized: false
};

export const displayingRestriction = 10;

export const consoleStyles = {
    dim: '\x1b[2m',
    bold: '\x1b[1m',
    gray: '\x1b[90m',
    drop: '\x1b[0m'
};
