import { Message } from "discord.js";
import { CommandArgs, ICommand } from "my-module";

const LoopSongCommand: ICommand = {
	name: "loopsong",
	playerRequired: true,
	channelRequired: true,
	sameChannelRequired: true,
	argsDefinitions: [],
	joinPermissionRequired: false,
	async execute({ player, message }: CommandArgs): Promise<Message> {
		if (
			player.queue.size === 0 ||
			(player.position === 0 && !player.playing)
		)
			return message.channel.send("**Nothing Playing In This Server!**");

		if (!player.trackRepeat) {
			player.setTrackRepeat(true);
			return message.channel.send("**🔁 Song Has Been Looped!**");
		} else {
			player.setTrackRepeat(false);
			return message.channel.send("**🔁 Song Has Been Unlooped!**");
		}
	},
};

export default LoopSongCommand;
