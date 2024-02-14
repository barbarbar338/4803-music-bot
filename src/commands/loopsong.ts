import { Message } from "discord.js";
import { CommandArgs, ICommand } from "my-module";

const LoopSongCommand: ICommand = {
	name: "loopsong",
	playerRequired: true,
	channelRequired: true,
	sameChannelRequired: true,
	argsDefinitions: [],
	joinPermissionRequired: false,
	noEmptyQueue: true,
	category: "category_util",
	description: "loopsong_description",
	usage: "loopsong",
	examples: ["loopsong"],
	async execute({
		player,
		message,
		client,
		language,
	}: CommandArgs): Promise<Message> {
		if (!player.trackRepeat) {
			player.setTrackRepeat(true);
			return message.channel.send(
				{
					content: "🔁 Looping the song."
				}
			);
		} else {
			player.setTrackRepeat(false);
			return message.channel.send(
				{
					content: "🔁 Song doesn't loop anymore."
				}
			);
		}
	},
};

export default LoopSongCommand;
