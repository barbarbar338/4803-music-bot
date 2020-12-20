import { Message } from "discord.js";
import { CommandArgs, ICommand } from "my-module";

const ShuffleCommand: ICommand = {
	name: "shuffle",
	playerRequired: true,
	channelRequired: true,
	sameChannelRequired: true,
	argsDefinitions: [],
	joinPermissionRequired: false,
	noEmptyQueue: false,
	category: "category_util",
	description: "shuffle_description",
	usage: "shuffle",
	examples: [ "shuffle" ],
	async execute({
		player,
		message,
		client,
		language,
	}: CommandArgs): Promise<Message> {
		if (player.queue.size === 0 || player.position === 0)
			return message.channel.send(
				client.i18n.get(language, "commands", "queue_empty"),
			);
		player.queue.shuffle();
		return message.channel.send(
			client.i18n.get(language, "commands", "shuffle_shuffled"),
		);
	},
};

export default ShuffleCommand;
