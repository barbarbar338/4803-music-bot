import { ShardingManager } from "discord.js";
import { resolve } from "path";
import * as express from "express";
import CONFIG from "./config";
import Logger from "./struct/Logger";

const Manager = new ShardingManager(resolve(__dirname, "bot.js"), {
	token: CONFIG.TOKEN,
	totalShards: CONFIG.SHARD_COUNT,
	respawn: true,
});

const app = express();
app.use((req, res) => res.sendStatus(200));

Manager.spawn().then(() => {
	Logger.info("All shards spawned");
	app.listen(CONFIG.PORT, "0.0.0.0", () => {
		Logger.info("Express server started");
	});
});

Manager.on("shardCreate", (shard) =>
	console.info(
		`Shard ${shard.id} spawned (${shard.id + 1}/${CONFIG.SHARD_COUNT})`,
	),
);
