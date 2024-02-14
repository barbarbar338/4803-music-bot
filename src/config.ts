import { ActivityType, PresenceStatusData } from "discord.js";
import * as dotenv from "dotenv";
import { resolve } from "path";
import { Core } from "./struct/Core";
const client = new Core();
dotenv.config();

const SHARD_COUNT = parseInt(process.env.SHARD_COUNT);
const PREFIX = process.env.BOT_PREFIX;
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
	PREFIX,
	LAVALINK,
	I18N: {
		defaultLocale: "en",
		directory: resolve("locales"),
	},
	MONGODB_URI: process.env.MONGODB_URI,
	SHARD_COUNT,
	PRESENCE: {
		activity: {
			name: [
				`${PREFIX}help | Use ${PREFIX}help to see commands`,
				`${PREFIX}help | Use ${PREFIX}info to get more information about me!`,
				`${PREFIX}help | ${client.guilds.cache.size} Server's`,
				`${PREFIX}help | ${client.users.cache.size} User's`
			],
			type: [
				ActivityType.Playing, ActivityType.Listening, ActivityType.Watching
				] as ActivityType[],
		},
		afk: false,
		status: ["dnd", "idle", "online"] as PresenceStatusData[],
		interval: 1000 * 15,
	},
	INVITE:
		"https://discord.com/oauth2/authorize?client_id={CLIENT_ID}&scope=bot&permissions=66374744",
	SUPPORT_SERVER: process.env.SUPPORT_SERVER,
	GITHUB_REPO: process.env.GITHUB_REPO,
	CROWDIN_PROJECT: process.env.CROWDIN_PROJECT,
	PORT: parseInt(process.env.PORT),
};

export default CONFIG;
