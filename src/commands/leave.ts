import { Message } from "discord.js";
import { CommandArgs, ICommand } from "my-module";

const LeaveCommand: ICommand = {
	name: "leave",
	playerRequired: false,
	channelRequired: true,
	sameChannelRequired: true,
	argsDefinitions: [],
	joinPermissionRequired: false,
	noEmptyQueue: false,
	async execute({
		player,
		message,
		client,
		language,
	}: CommandArgs): Promise<Message> {
		if (player) {
			player.destroy();
			return message.channel.send(
				client.i18n.get(language, "commands", "leave_leaved"),
			);
		} else if (message.guild.me.voice.channel) {
			message.guild.me.voice.channel.leave();
			return message.channel.send(
				client.i18n.get(language, "commands", "leave_leaved"),
			);
		}
	},
};

export default LeaveCommand;
