'use strict';

const { progressPluginHandler } = require('./lib/index.js');

const data = [
    {
        name: 'server',
        processMessage: 'building',
        processInfo: [
            'server config assets process',
            'resources for server config'
        ]
    },
    {
        name: 'client',
        processMessage: 'building',
        processInfo: [
            'generate code for client config',
            'client config additional assets'
        ]
    }
];

const retestTimeoutMs = 1000;

const percentageStep = 10;
const startPercentage = 0;
const finishPercentage = 100;

let lastPercentage = startPercentage;

const getPercentage = () => {
    const percentage = lastPercentage <= finishPercentage ? lastPercentage + percentageStep : startPercentage;
    lastPercentage = percentage;
    const result = percentage > finishPercentage ? finishPercentage : percentage;
    return result / 100;
};

(function() {
    process.stdout.write('Test for progressPluginHandler');
    process.stdout.write('\n');

    setInterval(() => {
        data.forEach(({ name, processMessage, processInfo}) => {
            const percentage = getPercentage();

            processInfo.forEach((infoItem, index) => {
                const processInfoUpdateTimeoutMs = retestTimeoutMs / (index + 1);

                setTimeout(() => {
                    progressPluginHandler(name, percentage, processMessage, [
                        infoItem
                    ]);
                }, processInfoUpdateTimeoutMs);
            });
        });
    }, retestTimeoutMs);
}());
