export const getMainPageCss = (): string => `
body {
    background-color: #212121;
    padding: 0;
    margin: 0;
    font-size: 14px;
    font-family: 'Helvetica Neue', sans-serif;
}

#container {
    position: absolute;
    z-index: 9999;
    top: 0;
    width: 100%;
    pointer-events: none;
}

#container > form {
    display: flex;
    width: 360px;
    margin: 0 auto 0;
    padding: 8px 20px;
    background-color: #000000;
    border-width: 0 1px 1px 1px;
    border-style: solid;
    border-color: #424242;
    border-radius: 0 0 10px 10px;
    pointer-events: all;
}

#container > form > input[type=text] {
    width: calc(100% - 60px);
}

#container > form > input[type=submit] {
    width: 60px;
}

#container > span {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px auto 0;
    padding: 10px 20px;
    width: 360px;
    text-align: center;
    color: #ffffff;
    background-color: #000000;
    border: 1px solid #424242;
    border-radius: 10px;
}

iframe {
    position: absolute;
    z-index: 9998;
    top: 0;
    left: 0;
    border: 0;
    height: 100%;
    width: 100%;
}

@media screen and (max-width: 480px) {
    #container {
       width: calc(100% - 60px);
    }

    #container > form,
    #container > span {
        width: 100%;
    }
}
`;
