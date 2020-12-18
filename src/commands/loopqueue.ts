import { Message } from "discord.js";
import { CommandArgs, ICommand } from "my-module";

const LoopQueueCommand: ICommand = {
	name: "loopqueue",
	playerRequired: true,
	channelRequired: true,
	sameChannelRequired: true,
	argsDefinitions: [],
	joinPermissionRequired: false,
	async execute({ message, player }: CommandArgs): Promise<Message> {
		if (
			player.queue.size === 0 ||
			(player.position === 0 && !player.playing)
		)
			return message.channel.send("**Nothing Playing In This Server!**");
		if (!player.queueRepeat) {
			player.setQueueRepeat(true);
			return message.channel.send("**🔁 Queue Has Been Looped!**");
		} else {
			player.setQueueRepeat(false);
			return message.channel.send("**🔁 Queue Has Been Unlooped!**");
		}
	},
};

export default LoopQueueCommand;
