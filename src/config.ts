import * as dotenv from "dotenv";

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
};

export default CONFIG;
