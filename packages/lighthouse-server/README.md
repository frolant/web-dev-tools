# @web-dev-tools/lighthouse-server

### Lighthouse report and server for NodeJS

Lighthouse report functionality with Express NodeJS server.

Easy to integrate into the frontend project and run to check the quality of the site on the fly during development.

Install:

```shell
npm install --save-dev @web-dev-tools/lighthouse-server
```

Run:

```shell
node ./node_modules/@web-dev-tools/lighthouse-server
```

Or add on your project package.json

```json
{
    "scripts": {
        "lighthouse": "node ./node_modules/@web-dev-tools/lighthouse-server"
    }
}
```

Options for command-line:

 - Server port (default: 5000)
 - Default checked url (default: http://127.0.0.1:4000)

Run with options example:

```shell
node ./node_modules/@web-dev-tools/lighthouse-server 5001 http://127.0.0.1:3000
```
