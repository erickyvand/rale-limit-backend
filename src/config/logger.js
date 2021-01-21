import { createLogger, format, transports } from 'winston';

const logger = createLogger({
	level: 'info',
	transports: [new transports.File({ filename: 'quick-start-combined.log' })],
});

if (process.env.NODE_ENV !== 'production') {
	logger.add(
		new transports.Console({
			format: format.simple(),
		})
	);
}

export default logger;
