import * as dotenv from "dotenv";
import { resolve } from "path";

dotenv.config();

const LAVALINK = {
	host: "localhost",
	port: 2333,
	password: "changeyourpassword",
};

const CONFIG = {
	TOKEN: process.env.TOKEN,
	ERELA: {
		autoplay: true,
		nodes: [
			{
				host: LAVALINK.host,
				password: LAVALINK.password,
				port: LAVALINK.port,
			},
		],
	},
	PREFIX: "!",
	LAVALINK,
	I18N: {
		defaultLocale: "en",
		directory: resolve(__dirname, "locales"),
	},
	MONGODB_URI: process.env.MONGODB_URI,
};

export default CONFIG;
