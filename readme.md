# node-red-contrib-custom-logging

## Introduction
Simple external implementation of custom logger for node-red. It saves logs to file under ```/home/pi/logs/``` with log file name as ```dd-mm-YYYY.log```.

## Usage
Add new logging to settings.js in main node-red folder.

```javascript
    // Configure the logging output
    logging: {
        // Only console logging is currently supported
        console: {
            ...
        },
        // add new logger
        custom: require("node-red-contrib-custom-logging")
    },
```

