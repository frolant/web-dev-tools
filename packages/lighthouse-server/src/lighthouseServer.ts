import express from 'express';
import { resolve } from 'path';
import fs from 'fs';

import { generateLighthouseReport } from './utils/generateLighthouseReport';
import { getHtmlContent } from './utils/getHtmlContent';
import { logMessage } from './utils/logMessage';

import { initialCheckedUrl, reportFileName } from './constants';

const lighthouseServer = (): void => {
    const [
        serverPort = 5000,
        defaultCheckedUrl = initialCheckedUrl,
        reportPath = resolve(__dirname, './')
    ] = process.argv.slice(2, 5);

    const getHtml = (checkedUrl?: string): string => getHtmlContent(checkedUrl || defaultCheckedUrl);

    const server = express();

    server.use(express.urlencoded({
        extended: true
    }));

    server.get(`/${reportFileName}`, async (_, response) => {
        return response.send(fs.readFileSync(`${reportPath}/${reportFileName}`, {
            encoding: 'utf-8'
        }));
    });

    server.get('/', async (_, response) => {
        return response.send(getHtml());
    });

    server.post('/', async (request, response) => {
        const checkedUrl = request.body.url;
        generateLighthouseReport(checkedUrl, reportPath);
        return response.send(getHtml(checkedUrl));
    });

    server.listen(serverPort, () => logMessage(`Started on http://127.0.0.1:${serverPort}`));
};

export default lighthouseServer;
