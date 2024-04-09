import { createLogger, transports, format } from 'winston';
var logger = createLogger({
    level: 'info',
    format: format.json(),
    transports: [new transports.Console()]
});
export default logger;
//# sourceMappingURL=logger.js.map