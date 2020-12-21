import { ActivityType, PresenceStatusData } from "discord.js";
import { IEvent } from "my-module";
import CONFIG from "../../config";

const ReadyEvent: IEvent = {
	name: "ready",
	async execute(client) {
		client.manager.init(client.user.id);
		client.logger.info(`Logged in as ${client.user.username}`);
		setInterval(() => {
			client.user.setPresence({
				activity: {
					name: client.functions.random<string>(
						CONFIG.PRESENCE.activity.name,
					),
					type: client.functions.random<ActivityType>(
						CONFIG.PRESENCE.activity.type,
					),
				},
				afk: false,
				status: client.functions.random<PresenceStatusData>(
					CONFIG.PRESENCE.status,
				),
			});
		}, CONFIG.PRESENCE.interval);
	},
};

export default ReadyEvent;
