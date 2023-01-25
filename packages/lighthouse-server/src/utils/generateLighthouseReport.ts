// @ts-ignore
import lighthouse from 'lighthouse';
// @ts-ignore
import lighthouseReportGenerator from 'lighthouse/report/generator/report-generator';
import puppeteer from 'puppeteer';

import { logMessage } from './logMessage';

import { appState, lighthouseOptions, puppeteerOptions } from '../constants';

export const generateLighthouseReport = async (checkedUrl: string): Promise<void> => {
    appState.isGenerationInProgress = true;
    appState.savedReport = '';

    logMessage(`Report for ${checkedUrl} requested`);

    const browser = await puppeteer.launch(puppeteerOptions);

    const portFindingData = browser.wsEndpoint().match(/:(\d+)\//);
    const port = portFindingData ? Number(portFindingData[1]) : null;

    const { lhr: lighthouseReport } = await lighthouse(checkedUrl, {
        ...lighthouseOptions,
        port
    });

    browser.close();

    appState.savedReport = lighthouseReportGenerator.generateReport(lighthouseReport, 'html');
    appState.isGenerationInProgress = false;

    logMessage(`Report for ${checkedUrl} generated`);
};
