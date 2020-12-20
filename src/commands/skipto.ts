import { Message } from "discord.js";
import { CommandArgs, ICommand } from "my-module";

const SkipToCommand: ICommand = {
	name: "skipto",
	channelRequired: true,
	sameChannelRequired: true,
	joinPermissionRequired: false,
	playerRequired: true,
	argsDefinitions: [
		{ name: "skip", aliases: ["s"], default: true, type: Number },
	],
	noEmptyQueue: true,
	category: "category_util",
	description: "skipto_description",
	usage: "skipto",
	examples: ["skipto 5", "skipto 2"],
	async execute({
		player,
		message,
		args,
		client,
		language,
	}: CommandArgs): Promise<Message> {
		if (!args.skip)
			return message.channel.send(
				client.i18n.get(language, "commands", "skip_to_specify_number"),
			);

		const position = args.skip as number;

		if (isNaN(position) || position < 1)
			return message.channel.send(
				client.i18n.get(language, "commands", "skip_to_integer"),
			);
		if (
			position > player.queue.size ||
			!player.queue[player.queue.size > 1 ? position - 2 : position - 1]
		)
			return message.channel.send(
				client.i18n.get(language, "commands", "song_not_found"),
			);

		if (position > 1 && player.queue.size != position) {
			player.queue.splice(0, position - 2);
			player.stop();
			return message.channel.send(
				client.i18n.get(language, "commands", "skip_to_skipped", {
					length: (position - 1).toString(),
				}),
			);
		} else if (position > 1 && player.queue.size == position) {
			player.queue.splice(0, player.queue.length - 1);
			player.stop();
			return message.channel.send(
				client.i18n.get(language, "commands", "skip_to_skipped", {
					length: (position - 1).toString(),
				}),
			);
		}
	},
};

export default SkipToCommand;
