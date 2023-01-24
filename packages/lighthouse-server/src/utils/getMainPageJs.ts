export const getMainPageJs = (): string => `
var report = document.createElement('iframe');
var message = document.createElement('span');
message.textContent = 'Loading state...';

function update() {
    fetch(new Request('/state')).then((response) => {
        return response.json();
    }).then((data) => {
        if (data.generationInProgress) {
            setTimeout(update, 3000);
            message.textContent = 'Report generated...';
        } else {
            if (data.reportReady) {
                report.src = '/report';
                document.body.appendChild(report);
                message.parentNode.removeChild(message);
            } else {
                message.textContent = 'Insert checked URL';
            }
        }
    });
};

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('container').appendChild(message);
    update();
}, false);
`;
