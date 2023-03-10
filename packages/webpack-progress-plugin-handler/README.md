# @web-dev-tools/webpack-progress-plugin-handler

### Handler for WebpackProgressPlugin

Handler can show progress separately
for several concurrently launched webpack configurations.
For example, when you have an array of webpack configurations
containing configs for the client and server (ssr).

### Install

```shell
npm install --save-dev @web-dev-tools/webpack-progress-plugin-handler
```

### Use

```javascript
const { progressPluginHandler } = require('@web-dev-tools/webpack-progress-plugin-handler');

module.exports = (env, argv) => {
    const configName = 'client';

    return {
        // ...Webpack configuration data

        plugins: [
            // Add ProgressPlugin with progressPluginHandler in plugins

            new webpack.ProgressPlugin((percentage, message, ...args) => {
                progressPluginHandler(configName, percentage, message, args)
            })
        ]
    }
}
```

### Options

> `configName` - Configuration item name (Label for progress-bar item)
>
> `percentage` - Percentage passed from the webpack.ProgressPlugin
>
> `message` - Message passed from the webpack.ProgressPlugin
> 
> `args` - Other build info passed from the webpack.ProgressPlugin
