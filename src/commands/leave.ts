import { getVoiceConnection } from "@discordjs/voice";
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
	category: "category_music",
	description: "leave_description",
	usage: "leave",
	examples: ["leave"],
	async execute({
		player,
		message,
		client,
		language,
	}: CommandArgs): Promise<Message> {
		if (player) {
			player.destroy();
			return message.channel.send(
				{
					content: "Disconnected."
				}
			);
		} else { let bot = message.guild.members.cache.get(client.user.id); if (bot) {
			const connection = getVoiceConnection(message.guildId);
			await connection.destroy()
			return message.channel.send(
				{
					content: "Disconnected."
				}
			);
		}}
	},
};

export default LeaveCommand;
