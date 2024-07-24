#!/usr/bin/env node

const run = () => {
    const path = require('path');

    const packageName = '@web-dev-tools/cli';
    const packagePath = require.resolve(`${packageName}/package.json`);

    require(path.resolve(path.dirname(packagePath)));
};

run();
