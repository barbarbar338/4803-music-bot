import { ShardingManager } from "discord.js";
import { resolve } from "path";
import CONFIG from "./config";
import Logger from "./struct/Logger";

const Manager = new ShardingManager(resolve(__dirname, "bot.js"), {
	token: CONFIG.TOKEN,
	totalShards: CONFIG.SHARD_COUNT,
	respawn: true,
});

Manager.spawn().then(() => Logger.info("All shards spawned"));

Manager.on("shardCreate", (shard) =>
	Logger.info(
		`Shard ${shard.id} spawned (${shard.id + 1}/${CONFIG.SHARD_COUNT})`,
	),
);
