import { ActivityType, PresenceStatusData } from "discord.js";
import * as dotenv from "dotenv";
import { resolve } from "path";

dotenv.config();

const SHARD_COUNT = parseInt(process.env.SHARD_COUNT);

const LAVALINK = {
	host: process.env.LAVALINK_HOST,
	port: parseInt(process.env.LAVALINK_PORT),
	password: process.env.LAVALINK_PASSWORD,
};

const CONFIG = {
	TOKEN: process.env.TOKEN,
	ERELA: {
		autoplay: true,
		nodes: [LAVALINK],
		shards: SHARD_COUNT,
	},
	PREFIX: process.env.PREFIX,
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
	INVITE:
		"https://discord.com/oauth2/authorize?client_id={CLIENT_ID}&scope=bot&permissions=66374744",
	SUPPORT_SERVER: process.env.SUPPORT_SERVER,
};

export default CONFIG;
