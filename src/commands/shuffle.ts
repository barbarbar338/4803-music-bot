import { Message } from "discord.js";
import { CommandArgs, ICommand } from "my-module";

const ShuffleCommand: ICommand = {
	name: "shuffle",
	playerRequired: true,
	channelRequired: true,
	sameChannelRequired: true,
	argsDefinitions: [],
	joinPermissionRequired: false,
	async execute({ player, message }: CommandArgs): Promise<Message> {
		if (player.queue.size === 0 || player.position === 0)
			return message.channel.send("**Nothing Playing In This Server!**");
		player.queue.shuffle();
		return message.channel.send("**Shuffled The Queue**");
	},
};

export default ShuffleCommand;
