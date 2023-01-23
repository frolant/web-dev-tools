export const initialCheckedUrl = 'http://127.0.0.1:4000';
export const reportFileName = 'report.html';

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
