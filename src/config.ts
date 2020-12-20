import { ActivityType, PresenceStatusData } from "discord.js";
import * as dotenv from "dotenv";
import { resolve } from "path";

dotenv.config();

const SHARD_COUNT = 2;

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
			LAVALINK
		],
		shards: SHARD_COUNT,
	},
	PREFIX: "!",
	LAVALINK,
	I18N: {
		defaultLocale: "en",
		directory: resolve("locales"),
	},
	MONGODB_URI: process.env.MONGODB_URI,
	SHARD_COUNT,
	PRESENCE: {
		activity: {
			name: "Songs",
			type: "LISTENING" as ActivityType,
		},
		afk: false,
		status: "dnd" as PresenceStatusData,
	},
};

export default CONFIG;
