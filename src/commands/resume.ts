import { Message } from "discord.js";
import { CommandArgs, ICommand } from "my-module";
import CONFIG from "../config";

const ResumeCommand: ICommand = {
	name: "resume",
	playerRequired: true,
	argsDefinitions: [],
	channelRequired: true,
	sameChannelRequired: true,
	joinPermissionRequired: false,
	noEmptyQueue: false,
	category: "category_music",
	description: "resume_description",
	usage: "resume",
	examples: [ "resume" ],
	async execute({
		player,
		message,
		client,
		language,
		guildModel,
	}: CommandArgs): Promise<Message> {
		if (player.queue.size === 0 || player.position === 0)
			return message.channel.send(
				client.i18n.get(language, "commands", "queue_empty", {
					prefix: guildModel.prefix || CONFIG.PREFIX,
				}),
			);

		if (!player.playing) {
			player.pause(false);
			return message.channel.send(
				client.i18n.get(language, "commands", "resume_resumed"),
			);
		}
		return message.channel.send(
			client.i18n.get(language, "commands", "resume_not_paused"),
		);
	},
};

export default ResumeCommand;
