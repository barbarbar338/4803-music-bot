import { Message } from "discord.js";
import { CommandArgs, ICommand } from "my-module";

const PauseCommand: ICommand = {
	name: "pause",
	playerRequired: true,
	channelRequired: true,
	sameChannelRequired: true,
	argsDefinitions: [],
	joinPermissionRequired: false,
	async execute({ player, message }: CommandArgs): Promise<Message> {
		if (player.queue.size === 0)
			return message.channel.send("**Nothing Playing In This Server!**");

		if (player.playing) {
			player.pause(true);
			return message.channel.send("**Paused** ⏸");
		} else {
			return message.channel.send(`**Song Is Already Paused!**`);
		}
	},
};

export default PauseCommand;
