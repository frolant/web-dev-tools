import { appState } from '../constants';

const getContent = (defaultCheckedUrl: string): string => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Lighthouse</title>
    <link href="/style" rel="stylesheet">
    <script src="/script"></script>
</head>
<body>
    <div id="container">
        <form action="/" method="post">
            <input type="text" name="url" value="${defaultCheckedUrl}"/>
            <input type="submit" value="Check" />
        </form>
    </div>
</body>
</html>
`;

export const getMainPageHtml = (checkedUrl?: string): string => {
    if (checkedUrl) {
        appState.currentCheckedUrl = checkedUrl;
    }

    return getContent(appState.currentCheckedUrl);
};
