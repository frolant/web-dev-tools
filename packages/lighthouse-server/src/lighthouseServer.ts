import express from 'express';

import { generateLighthouseReport } from './utils/generateLighthouseReport';
import { getMainPageHtml } from './utils/getMainPageHtml';
import { getMainPageCss } from './utils/getMainPageCss';
import { getMainPageJs } from './utils/getMainPageJs';
import { logMessage } from './utils/logMessage';

import { appState, defaultServerPort, initialCheckedUrl } from './constants';

const lighthouseServer = (): void => {
    const [
        serverPort = defaultServerPort,
        defaultCheckedUrl = initialCheckedUrl
    ] = process.argv.slice(2, 5);

    appState.currentCheckedUrl = defaultCheckedUrl;

    const server = express();

    server.use(express.urlencoded({
        extended: true
    }));

    server.get('/script', async (_, response) => {
        response.header('Content-Type', 'text/javascript; charset=utf-8');
        return response.send(getMainPageJs());
    });

    server.get('/style', async (_, response) => {
        response.header('Content-Type', 'text/css; charset=utf-8');
        return response.send(getMainPageCss());
    });

    server.get('/state', async (_, response) => {
        response.append('Last-Modified', new Date().toUTCString());
        response.header('Content-Type', 'text/plain; charset=utf-8');
        return response.send({
            generationInProgress: appState.isGenerationInProgress,
            reportReady: !!appState.savedReport.length
        });
    });

    server.get('/report', async (_, response) => {
        response.append('Last-Modified', new Date().toUTCString());
        response.header('Content-Type', 'text/html; charset=utf-8');
        return response.send(`${appState.savedReport}`);
    });

    server.get('/', async (_, response) => {
        response.header('Content-Type', 'text/html; charset=utf-8');
        return response.send(getMainPageHtml());
    });

    server.post('/', async (request, response) => {
        const checkedUrl = request.body.url;
        generateLighthouseReport(checkedUrl);
        response.header('Content-Type', 'text/html; charset=utf-8');
        return response.send(getMainPageHtml(checkedUrl));
    });

    server.listen(serverPort, () => logMessage(`Started on http://127.0.0.1:${serverPort}`));
};

export default lighthouseServer;
