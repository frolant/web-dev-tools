// @ts-ignore
import lighthouse from 'lighthouse';
// @ts-ignore
import lighthouseReportGenerator from 'lighthouse/report/generator/report-generator';
import puppeteer from 'puppeteer';
import { resolve } from 'path';
import fs from 'fs';

import { logMessage } from './logMessage';

import { lighthouseOptions, puppeteerOptions, reportFileName } from '../constants';

export const generateLighthouseReport = async (checkedUrl: string, reportPath: string): Promise<void> => {
    logMessage(`Report generation for ${checkedUrl} initialized`);

    const reportFilePath = resolve(reportPath, reportFileName);

    const browser = await puppeteer.launch(puppeteerOptions);

    const portFindingData = browser.wsEndpoint().match(/:(\d+)\//);
    const port = portFindingData ? Number(portFindingData[1]) : null;

    const { lhr: lighthouseReport } = await lighthouse(checkedUrl, {
        ...lighthouseOptions,
        port
    });

    const html = lighthouseReportGenerator.generateReport(lighthouseReport, 'html');

    logMessage(`Report for ${checkedUrl} generated`);

    fs.writeFile(reportFilePath, html, (error: any) => {
        if (error) throw error;
    });

    logMessage(`Report saved in ${reportFilePath}`);
};
