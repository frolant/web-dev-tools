"use strict";

const readLine = require('readline');

const logger = require('./logger');

const clearDialogScreen = () => {
    readLine.cursorTo(process.stdout, 0, 1);
    readLine.clearLine(process.stdout, 0);
};

const askQuestion = async (question) => new Promise((resolve) => {
    const questionInterface = readLine.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    questionInterface.question(question, (answer) => {
        clearDialogScreen();
        questionInterface.close();
        resolve(answer.toLowerCase());
    });
});

const getProcessedQuestion = (data, pathHistory) => {
    const header = `${logger.getInclinedGrayText(`/${pathHistory.join('/')}`)}\n${logger.getBoldText(data.question)}`;
    return `${header}\n${data.answers.reduce((result, item) => {
        const number = item.id;
        return `${result}${logger.getGrayText(number)} ${item.value}${number === '1' ? logger.getGrayText(' (default)') : ''}\n`;
    }, '')}${logger.getGrayText('0 back')}\n> `;
};

const getAnswerFromDialog = async (data, pathHistory) => {
    const question = getProcessedQuestion(data, pathHistory);
    let result;

    const answer = await askQuestion(question);
    const isMatchBack = answer === '0' || answer === 'back';

    if (isMatchBack) {
        result = {
            command: pathHistory.slice(0, pathHistory.length - 1).join(' ')
        }
    } else {
        data.answers.forEach((item) => {
            const isMatchIdentifier = answer === item.id;
            const isMatchWord = answer === item.value;

            if (isMatchIdentifier || isMatchWord) {
                result = item;
            }
        });
    }

    return result || (answer ? null : data.answers[0]);
};

const getCommandFromDialog = async (data) => {
    let pathHistory = [ 'cli' ];
    let command;

    const processDialog = async (data) => {
        if (data.answers) {
            data.value && pathHistory.push(data.value);
            const result = await getAnswerFromDialog(data, pathHistory);
            result ? await processDialog(result) : logger.logWrongChooseError();
        } else {
            command = data.command;
        }
    };

    await processDialog(data);

    return command;
};

module.exports = getCommandFromDialog;
