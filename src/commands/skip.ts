import { Message } from "discord.js";
import { CommandArgs, ICommand } from "my-module";

const SkipCommand: ICommand = {
	name: "skip",
	playerRequired: true,
	sameChannelRequired: true,
	channelRequired: true,
	argsDefinitions: [],
	joinPermissionRequired: false,
	async execute({ player, message }: CommandArgs): Promise<Message> {
		if (
			player.queue.size === 0 ||
			(player.position === 0 && !player.playing)
		)
			return message.channel.send("**Nothing Playing In This Server!**");
		player.stop();
		return message.channel.send(
			`**Skipped ${player.queue.current.title}**`,
		);
	},
};

export default SkipCommand;
