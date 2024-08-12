"use strict";

const readLine = require('readline');

const logger = require('./logger');

const askQuestion = async (question) => new Promise((resolve) => {
    const questionInterface = readLine.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    questionInterface.question(question, (answer) => {
        questionInterface.close();
        resolve(answer.toLowerCase());
    });
});

const getProcessedQuestion = (data) => {
    return `\n${data.question}\n${data.answers.reduce((result, item) => {
        const number = item.id;
        return `${result}${logger.getGrayText(number)} ${item.value}${number === '1' ? logger.getGrayText(' (default)') : ''}\n`;
    }, '')}> `;
};

const getAnswerFromDialog = async (data) => {
    const question = getProcessedQuestion(data);
    let result;

    const answer = await askQuestion(question);

    data.answers.forEach((item, key) => {
        const isMatchNumber = answer === (key + 1).toString();
        const isMatchLetters = answer === item.value || answer === item.value[0];

        if (isMatchNumber || isMatchLetters) {
            result = item;
        }
    });

    return result || (answer ? null : data.answers[0]);
}

const getCommandFromDialog = async (data) => {
    let command;

    const processDialog = async (data) => {
        if (data.answers) {
            const result = await getAnswerFromDialog(data);
            result ? await processDialog(result) : logger.wrongChooseError();
        } else {
            command = data.command;
        }
    };

    await processDialog(data);

    return command;
};

module.exports = getCommandFromDialog;
