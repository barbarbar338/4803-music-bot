import { Message } from "discord.js";
import { CommandArgs, ICommand } from "my-module";

const ResumeCommand: ICommand = {
	name: "resume",
	playerRequired: true,
	argsDefinitions: [],
	channelRequired: true,
	sameChannelRequired: true,
	joinPermissionRequired: false,
	async execute({ player, message }: CommandArgs): Promise<Message> {
		if (player.queue.size === 0 || player.position === 0)
			return message.channel.send("**Nothing Playing In This Server!**");

		if (!player.playing) {
			player.pause(false);
			return message.channel.send("▶️ **Resumed**");
		}
		return message.channel.send("**Song Is Not Paused!**");
	},
};

export default ResumeCommand;
