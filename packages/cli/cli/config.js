const { resolve, sep } = require('path');
const fs = require('fs');

const logger = require('./logger');

const getSearchPathsData = () => {
    const configFileRelativePath = `${sep}.clirc.js`;
    return process.cwd().split(sep).filter(Boolean).map((path, id, data) => {
        return `${sep}${data.slice(0, id + 1).join(sep)}${configFileRelativePath}`;
    }).reverse();
};

const getConfigData = () => {
    const searchPathsData = getSearchPathsData();
    const configPath = searchPathsData.find((path) => fs.existsSync(path));
    !configPath && logger.configNotFoundError(searchPathsData);
    return configPath ? require(resolve(configPath)) : {};
};

const getProcessedConfig = (data) => {
    return data && data.answers ? {
        ...data,
        answers: data.answers.map((item, id) => getProcessedConfig({
            ...item,
            id: (id + 1).toString()
        }))
    } : data;
};

const configData = getConfigData();
const config = getProcessedConfig(configData);

module.exports = config;
