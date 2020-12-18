import { createLogger, format, transports } from "winston";

const WinstonLogger = createLogger({
	transports: [new transports.Console()],
	exitOnError: false,
	format: format.printf((info) => {
		const { level, message } = info;
		const now = new Date().toLocaleString();
		return `[4803]: [${level.toUpperCase()}] ${message} (${now})`;
	}),
});

export default WinstonLogger;
