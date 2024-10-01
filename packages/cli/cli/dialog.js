"use strict";

const readLine = require('readline');

const logger = require('./logger');

const getHistoryData = (data) => Array.from(data).reverse();

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

const getProcessedQuestion = (data, pathHistory, useBackVariant = true) => {
    const title = logger.getBoldText(data.question || `Insert variant:`);
    const header = `${logger.getInclinedGrayText(`/${pathHistory.join('/')}`)}\n${title}`;
    const answers = data.answers ? data.answers.reduce((result, item) => {
        const hint = item.id === '1' ? logger.getGrayText(' (default)') : '';
        return `${result}${logger.getGrayText(item.id)} ${item.command}${hint}\n`;
    }, '') : '';

    return `${header}\n${answers}${useBackVariant ? logger.getGrayText('0 back\n') : ''}> `;
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

const getAnswerData = async (data, pathHistory, answerFromArgs) => {
    let answer = answerFromArgs;
    let result;

    const processedData = getProcessedDialogData(data, pathHistory);

    if (!answer) {
        const question = getProcessedQuestion(processedData, pathHistory);
        answer = await askQuestion(question);
    }

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

const getCommandFromDialog = async (data, args) => {
    let pathHistory = [ 'cli' ];
    let getCommandHandler;

    const processDialog = async (data) => {
        data.command && pathHistory.push(data.command);
        const answerFromArgs = args.shift();

        if (data.answers) {
            const result = await getAnswerData(data, pathHistory, answerFromArgs);
            result ? await processDialog(result) : logger.logWrongChooseError(pathHistory);
        } else {
            getCommandHandler = data.execute;

            if (data.question) {
                const question = getProcessedQuestion(data, pathHistory, false);
                const answer = answerFromArgs || await askQuestion(question);
                pathHistory.push(answer);
            }

            if (data.dialog) {
                const dialogData = data.dialog(...getHistoryData(pathHistory));
                await processDialog(dialogData);
            }
        }
    };

    await processDialog(data);

    const isDataSuccessProcessed = !args.length && getCommandHandler;
    !isDataSuccessProcessed && logger.logWrongArgumentError();

    return isDataSuccessProcessed ? getCommandHandler(...getHistoryData(pathHistory)) : null;
};

module.exports = getCommandFromDialog;
