"use strict";

const readLine = require('readline');

const logger = require('./logger');
const { getHistoryData } = require('./utils');

const clearDialogScreen = () => {
    readLine.cursorTo(process.stdout, 0, 1);
    readLine.clearLine(process.stdout, 0);
};

const askQuestion = async (question) => new Promise((resolve) => {
    clearDialogScreen();

    const questionInterface = readLine.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    questionInterface.question(question, (answer) => {
        questionInterface.close();
        resolve(answer.toLowerCase());
    });
});

const getProcessedQuestion = (data, pathHistory) => {
    const title = logger.getBoldText(data.question || `Choose variant:`);
    const header = `${logger.getInclinedGrayText(`/${pathHistory.join('/')}`)}\n${title}`;
    const answers = data.answers ? data.answers.reduce((result, item) => {
        const hint = item.id === '1' ? logger.getGrayText(' (default)') : '';
        return `${result}${logger.getGrayText(item.id)} ${item.command}${hint}\n`;
    }, '') : '';

    return `${header}\n${answers}${logger.getGrayText('0 back')}\n> `;
};

const getProcessedDialogData = (data, pathHistory) => {
    return data.answers ? {
        ...data,
        answers: data.answers(...getHistoryData(pathHistory)).map((item, id) => ({
            ...item,
            id: (id + 1).toString()
        }))
    } : data;
};

const getAnswerFromDialog = async (data, pathHistory) => {
    let result;

    const processedData = getProcessedDialogData(data, pathHistory);
    const question = getProcessedQuestion(processedData, pathHistory);

    const answer = await askQuestion(question);
    const isMatchBack = answer === '0' || answer === 'back';

    if (isMatchBack) {
        result = {
            execute: () => pathHistory.slice(0, pathHistory.length - 1).join(' ')
        }
    } else {
        processedData.answers.forEach((item) => {
            const isMatchIdentifier = answer === item.id;
            const isMatchWord = answer === item.command;

            if (isMatchIdentifier || isMatchWord) {
                result = item;
            }
        });

        result = result || (answer ? null : processedData.answers[0])
    }

    return result;
};

const getCommandFromDialog = async (data) => {
    let pathHistory = [ 'cli' ];
    let getCommandHandler;

    const processDialog = async (data) => {
        data.command && pathHistory.push(data.command);

        if (data.answers) {
            const result = await getAnswerFromDialog(data, pathHistory);
            result ? await processDialog(result) : logger.logWrongChooseError();
        } else {
            getCommandHandler = data.execute;

            if (data.question) {
                const question = getProcessedQuestion(data, pathHistory);
                const answer = await askQuestion(question);
                pathHistory.push(answer);
            }

            if (data.dialog) {
                const dialogData = data.dialog(...getHistoryData(pathHistory));
                await processDialog(dialogData);
            }
        }
    };

    await processDialog(data);

    return getCommandHandler ? getCommandHandler(...getHistoryData(pathHistory)) : null;
};

module.exports = getCommandFromDialog;
