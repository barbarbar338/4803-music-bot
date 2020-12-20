import { Message } from "discord.js";
import { CommandArgs, ICommand } from "my-module";

const LoopQueueCommand: ICommand = {
	name: "loopqueue",
	playerRequired: true,
	channelRequired: true,
	sameChannelRequired: true,
	argsDefinitions: [],
	joinPermissionRequired: false,
	noEmptyQueue: true,
	category: "category_util",
	description: "loopqueue_description",
	usage: "loopqueue",
	examples: [ "loopqueue" ],
	async execute({
		message,
		player,
		client,
		language,
	}: CommandArgs): Promise<Message> {
		if (!player.queueRepeat) {
			player.setQueueRepeat(true);
			return message.channel.send(
				client.i18n.get(language, "commands", "loopqueue_looped"),
			);
		} else {
			player.setQueueRepeat(false);
			return message.channel.send(
				client.i18n.get(language, "commands", "loopqueue_unlooped"),
			);
		}
	},
};

export default LoopQueueCommand;
