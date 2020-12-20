import { Message } from "discord.js";
import { CommandArgs, ICommand } from "my-module";
import CONFIG from "../config";

const PauseCommand: ICommand = {
	name: "pause",
	playerRequired: true,
	channelRequired: true,
	sameChannelRequired: true,
	argsDefinitions: [],
	joinPermissionRequired: false,
	noEmptyQueue: false,
	category: "category_music",
	description: "pause_description",
	usage: "pause",
	examples: ["pause"],
	async execute({
		player,
		message,
		client,
		language,
		guildModel,
	}: CommandArgs): Promise<Message> {
		if (player.queue.size === 0)
			return message.channel.send(
				client.i18n.get(language, "commands", "queue_empty", {
					prefix: guildModel.prefix || CONFIG.PREFIX,
				}),
			);

		if (player.playing) {
			player.pause(true);
			return message.channel.send(
				client.i18n.get(language, "commands", "pause_paused"),
			);
		} else
			return message.channel.send(
				client.i18n.get(language, "commands", "pause_already_paused"),
			);
	},
};

export default PauseCommand;
