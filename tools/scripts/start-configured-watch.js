'use strict';

const { spawn } = require('child_process');

const {
    watchingToApp = false,
    updateTypesOnceOnWatchingToApp = true,
    watchingPackagesNames: packagesNames = []
} = require('../../local.config.json');

function getScopeOptions() {
    const namesListLine = packagesNames.map((packageName) => `${packageName}`).join(',');
    return packagesNames.length > 1 ? `--scope='@web-dev-tools/{${namesListLine}}'` : `--scope='@web-dev-tools/${namesListLine}'`;
}

(async function() {
    const destinationOption = watchingToApp ? 'app' : 'lib';
    const scopeOptions = packagesNames.length ? getScopeOptions() : '';
    const typesUpdateOption = watchingToApp && !updateTypesOnceOnWatchingToApp ? ':types' : '';
    spawn(`lerna run watch:to:${destinationOption}${typesUpdateOption} --parallel ${scopeOptions}`, {
        stdio: 'inherit',
        shell: true
    });
}());
