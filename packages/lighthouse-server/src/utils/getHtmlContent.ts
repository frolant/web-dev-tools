import { reportFileName } from '../constants';

export const getHtmlContent = (defaultCheckedUrl: string): string => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Lighthouse</title>
    <style>
        body {
            background-color: #424242;
            padding: 0;
            margin: 0;
        }
        form {
            position: absolute;
            z-index: 9999;
            right: 0;
            top: 0;
            margin: 5px 65px 0;
        }
        input[type=text] {
            width: 200px;
        }
        iframe {
            position: absolute;
            z-index: 9998;
            top: 0;
            left: 0;
            border: 0;
            height: 100%;
            width: 100%;
            background-color: #424242;
        }
    </style>
</head>
<body>
    <form action="/" method="post">
        <label>
            <input type="text" name="url" value="${defaultCheckedUrl}"/>
        </label>
        <input type="submit" value="Generate" />
    </form>
    <iframe src="/${reportFileName}">
        Your browser does not support floating frames!
    </iframe>
</body>
</html>
`;
