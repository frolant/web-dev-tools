# @web-dev-tools/cli

### Command line interface

Command line interface for running a project in build or development mode (or any other commands).

To use it, you need to add the `.clirc.js` configuration file to the project root.

Example configuration file:

```js
module.exports = ({
    question: 'Choose execution mode',
    answers: [
        {
            value: 'start',
            question: 'Choose start mode',
            answers: [
                {
                    value: 'development',
                    command: 'webpack serve --mode development'
                },
                {
                    value: 'production',
                    command: 'webpack serve --mode production'
                }
            ]
        },
        {
            value: 'build',
            command: 'webpack build'
        },
        {
            value: 'test',
            command: 'stylelint ./src/**/*.{css,scss} && eslint ./src'
        }
    ]
});
```

CLI launch command:

```shell
cli
```

It is also possible to pass arguments when starting the CLI, either to a certain part of the dialog (a choice will appear according to the configuration), or to the end (the resulting command will be immediately executed, without asking questions).

An example of running the start command (from the above example config) with the selected mode:

```shell
cli start production
```

## Install

```shell
npm install --save -D @web-dev-tools/cli
```
