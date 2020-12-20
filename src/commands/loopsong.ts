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
	async execute({
		player,
		message,
		client,
		language,
	}: CommandArgs): Promise<Message> {
		if (!player.trackRepeat) {
			player.setTrackRepeat(true);
			return message.channel.send(
				client.i18n.get(language, "commands", "loopsong_looped"),
			);
		} else {
			player.setTrackRepeat(false);
			return message.channel.send(
				client.i18n.get(language, "commands", "loopsong_unlooped"),
			);
		}
	},
};

export default LoopSongCommand;
