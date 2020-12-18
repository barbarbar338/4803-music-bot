import * as dotenv from "dotenv";

dotenv.config();

const CONFIG = {
	TOKEN: process.env.TOKEN,
	ERELA: {
		autoplay: true,
		nodes: [
			{
				host: "localhost",
				password: "p45530rd",
				port: 2333,
			},
		],
	},
	PREFIX: "!",
};

export default CONFIG;
