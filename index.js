const fs = require('fs');

function fileExists(filepath) {
    fs.access(filepath, fs.F_OK, (err) => {
        if (err) {
            return false;
        }
        return true;
    })
}

function addLog(filepath, log) {
    if (!fileExists(filepath)) {
        fs.writeFile(filename, log, function (err) {
            if (err) {
                //todo: handle error somehow 
                throw err;
            }
        });
    } else {
        fs.appendFile(filename, log, function (err) {
            if (err) {
                //todo: handle error somehow
                throw err;
            }
        });
    }
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
        var logFilePath = logDir + new Date().format('d-m-Y') + '.log';
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