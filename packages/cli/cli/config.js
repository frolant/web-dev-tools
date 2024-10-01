const { resolve, sep } = require('path');
const fs = require('fs');

const logger = require('./logger');

const getSearchPathsData = () => {
    const configFileRelativePath = `${sep}.clirc.js`;
    return process.cwd().split(sep).map((path, id, data) => {
        return `${data.slice(0, id + 1).join(sep)}${configFileRelativePath}`;
    }).reverse();
};

const getConfigData = () => {
    const searchPathsData = getSearchPathsData();
    const configPath = searchPathsData.find((path) => fs.existsSync(path));
    !configPath && logger.logConfigNotFoundError(searchPathsData);
    return configPath ? require(resolve(configPath)) : {};
};

const config = getConfigData();

module.exports = config;
