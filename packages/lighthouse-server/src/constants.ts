interface IAppState {
    isGenerationInProgress: boolean;
    currentCheckedUrl: string;
    savedReport: string;
}

export const appState: IAppState = {
    isGenerationInProgress: false,
    currentCheckedUrl: null,
    savedReport: ''
};

export const initialCheckedUrl = 'http://127.0.0.1:4000';
export const defaultServerPort = 5000;

export const puppeteerOptions = {
    headless: true,
    args: [
        '--disable-setuid-sandbox',
        '--no-sandbox'
    ],
    ignoreDefaultArgs: [
        '--disable-extensions'
    ],
    ignoreHTTPSErrors: false,
    handleSIGINT: false
};

export const lighthouseOptions = {
    logLevel: 'info',
    disableDeviceEmulation: true,
    chromeFlags: [
        '--disable-mobile-emulation'
    ]
};
