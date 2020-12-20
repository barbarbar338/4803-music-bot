import { Message } from "discord.js";
import { CommandArgs, ICommand } from "my-module";

const SkipCommand: ICommand = {
	name: "skip",
	playerRequired: true,
	sameChannelRequired: true,
	channelRequired: true,
	argsDefinitions: [],
	joinPermissionRequired: false,
	noEmptyQueue: true,
	category: "category_music",
	description: "skip_description",
	usage: "skip",
	examples: [ "skip" ],
	async execute({
		player,
		message,
		client,
		language,
	}: CommandArgs): Promise<Message> {
		player.stop();
		return message.channel.send(
			client.i18n.get(language, "commands", "skip_skipped", {
				song: player.queue.current.title,
			}),
		);
	},
};

export default SkipCommand;
