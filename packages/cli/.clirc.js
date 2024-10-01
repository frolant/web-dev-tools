module.exports = ({
    question: 'Choose testing mode:',
    answers: () => ([
        {
            command: 'command',
            question: 'Choose testing command:',
            answers: (prevArg) => ([
                {
                    command: `${prevArg}-test-args`,
                    execute: (...args) => `echo Command with args «[${args}]» successfully executed && exit 0`
                },
                {
                    command: `${prevArg}-test-last-arg`,
                    execute: (lastArg) => `echo Command with last arg «${lastArg}» successfully executed && exit 0`
                }
            ])
        },
        {
            command: 'dialog',
            question: `Insert answer`,
            dialog: (prevArg) => ({
                question: `Choose option for answer «${prevArg}»`,
                answers: (firstAnswer) => ([
                    {
                        command: `dialog-for-answer-${firstAnswer}`,
                        question: `Insert second answer`,
                        dialog: (...args) => ({
                            question: `Insert last answer (prev args: «[${args}]»)`,
                            execute: (lastAnswer) => `echo Dialog with answers first-«${firstAnswer}» and last-«${lastAnswer}» successfully finished && exit 0`
                        })
                    },
                    {
                        question: `Insert second answer`,
                        command: `question-for-answer-${firstAnswer}`,
                        execute: (secondAnswer) => `echo Dialog with second answer «${secondAnswer}» successfully finished && exit 0`
                    }
                ])
            })
        },
        {
            command: 'handler',
            execute: (...args) => console.log(`Handler with args «[${args}]» successfully executed`)
        }
    ])
});
