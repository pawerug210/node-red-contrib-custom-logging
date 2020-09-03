const fs = require('fs');

function currentDateFormatted() {
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [day, month, year].join('-');
}

function addLog(filepath, log) {
    fs.appendFile(filepath, log, function (err) {
        if (err) {
            fs.writeFile(filepath, log, function (err) {
                if (err) {
                    //todo: handle error somehow 
                    throw err;
                }
            });
        }
    });
}

function logHandler(settings) {
    //todo: change user if it change, and it will
    var logDir = '/home/pi/logs/';
    fs.mkdir(logDir, (err) => {
        if (err) {
            console.log('Logs directory already exists and its available under ' + logDir);
            return;
        }
        console.log('Succesfully created log directory under ' + logDir);
    });
    return function (msg) {
        var logFilePath = logDir + currentDateFormatted() + '.log';
        var message = `[${(new Date(msg.timestamp)).toISOString()}][${msg.msg}]\n`;
        addLog(logFilePath, message);
    }
}

module.exports = {
    "level": "info",
    "metrics": false,
    "audit": false,
    "handler": logHandler
}