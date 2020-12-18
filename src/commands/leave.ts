import { Message } from "discord.js";
import { CommandArgs, ICommand } from "my-module";

const LeaveCommand: ICommand = {
	name: "leave",
	playerRequired: false,
	channelRequired: true,
	sameChannelRequired: true,
	argsDefinitions: [],
	joinPermissionRequired: false,
	async execute({ player, message }: CommandArgs): Promise<Message> {
		if (player) {
			player.destroy();
			return message.channel.send("**Disconnected**");
		} else if (message.guild.me.voice.channel) {
			message.guild.me.voice.channel.leave();
			return message.channel.send("**Disconnected**");
		}
	},
};

export default LeaveCommand;
