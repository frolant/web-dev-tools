'use strict';

const { progressPluginHandler } = require('./lib');

const data = [
    {
        name: 'server',
        info: [
            'server config assets process',
            'read resources for server config',
            'server config create modules graph',
            'execute handlers for server config'
        ]
    },
    {
        name: 'client',
        info: [
            'generate code for client config',
            'client config additional assets processed'
        ]
    }
];

const message = 'building';
const retestTimeoutMs = 1000;
const finishPercentage = 100;
const percentageStep = 10;
const startPercentage = 0;

let lastPercentage = startPercentage;

const getPercentage = () => {
    const percentage = lastPercentage <= finishPercentage ? lastPercentage + percentageStep : startPercentage;
    lastPercentage = percentage;
    const result = percentage > finishPercentage ? finishPercentage : percentage;
    return result / 100;
};

const executeHandler = (name, percentage, message, info) => {
    // const startTime = new Date().getTime();
    progressPluginHandler(name, percentage, message, [
        info
    ]);
    // console.log('execution time (ms):', new Date().getTime() - startTime);
}

(function() {
    process.stdout.write('Test for progressPluginHandler');
    process.stdout.write('\n');

    setInterval(() => {
        data.forEach(({ name, info}) => {
            const percentage = getPercentage();

            info.forEach((infoItem, index) => {
                const processInfoUpdateTimeoutMs = retestTimeoutMs / (index + 1);

                setTimeout(() => {
                    executeHandler(name, percentage, message, infoItem);
                }, processInfoUpdateTimeoutMs);
            });
        });
    }, retestTimeoutMs);
}());
