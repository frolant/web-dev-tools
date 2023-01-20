import express from 'express';
import { resolve } from 'path';

const { log } = console;
const staticRelativePath = './';

const lighthouseServer = (): void => {
    const staticPath = resolve(__dirname, staticRelativePath);
    const server = express();

    server.use(express.static(staticPath, {
        index: false
    }));

    server.get('/*', async (_request, response) => {
        return response.send('Lighthouse server is working!');
    });

    server.listen(4050, () => log('Lighthouse server start'));
};

export default lighthouseServer;
