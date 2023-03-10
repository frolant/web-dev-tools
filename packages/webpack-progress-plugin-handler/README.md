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
const progressPluginHandler = require('@web-dev-tools/webpack-progress-plugin-handler');

module.exports = (env, argv) => {
    // Webpack configuration

    plugins: [
        // Add ProgressPlugin with progressPluginHandler in plugins

        new webpack.ProgressPlugin((percentage) => {
            progressPluginHandler(configName, percentage)
        })
    ]
}
```

### Options

> `configName` - Configuration item name 
>
> `percentage` - Current percentage passed from the webpack.ProgressPlugin
