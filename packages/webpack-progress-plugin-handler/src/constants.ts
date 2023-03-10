interface IProgressData {
    [itemName: string]: number;
}

interface IState {
    initialized: boolean;
}

export const progressData: IProgressData = {};

export const state: IState = {
    initialized: false
};

export const displayProgressPercentRestriction = 15;
