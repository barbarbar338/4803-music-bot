import { TextChannel } from "discord.js";
import { IManagerEvent } from "my-module";

const QueueEndEvent: IManagerEvent = {
	name: "queueEnd",
	async execute(client, _manager, player) {
		player.destroy();
		const channel = client.channels.cache.get(player.textChannel);
		if (!channel) return;
		(channel as TextChannel).send("Queue empty.");
	},
};

export default QueueEndEvent;
