import { ActivityType, PresenceStatusData } from "discord.js";
import { IEvent } from "my-module";
import CONFIG from "../../config";

const ReadyEvent: IEvent = {
	name: "ready",
	async execute(client) {
		client.manager.init(client.user.id);
		client.logger.info(`Logged in as ${client.user.username}`);
	},
};

export default ReadyEvent;
