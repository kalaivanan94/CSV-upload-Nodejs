import winston from "winston";
import Syslog from "winston-syslog";

let logger = winston.createLogger({
    levels: winston.config.syslog.levels,
    format : winston.format.combine(
        new winston.format.label({label:"V1"}),
        new winston.format.timestamp(),
        new winston.format.json()
    ),
    transports: [
        new winston.transports.Syslog(),
        new winston.transports.Console(),
        new winston.transports.File({ filename : 'error.log' , level : 'error'}),
        new winston.transports.File({ filename : 'warning.log' , level : 'warning'})
    ]
})
export {logger} 