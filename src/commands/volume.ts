import { Message } from "discord.js";
import { CommandArgs, ICommand } from "my-module";

const VolumeCommand: ICommand = {
	name: "volume",
	channelRequired: true,
	playerRequired: true,
	sameChannelRequired: true,
	joinPermissionRequired: false,
	argsDefinitions: [
		{ name: "volume", aliases: ["v"], default: true, type: Number },
	],
	noEmptyQueue: true,
	category: "category_util",
	description: "volume_description",
	usage: "volume [level]",
	examples: [ "volume", "volume 2", "volume 1", "volume 10" ],
	async execute({
		player,
		message,
		args,
		client,
		language,
	}: CommandArgs): Promise<Message> {
		const volume = args.volume as number;
		if (!volume)
			return message.channel.send(
				client.i18n.get(language, "commands", "volume_current", {
					volume: `${player.volume / 10}/10`,
				}),
			);

		if (isNaN(volume) || (volume > 11 && volume < 1))
			return message.channel.send(
				client.i18n.get(language, "commands", "volume_range"),
			);

		player.setVolume(volume * 10);
		return message.channel.send(
			client.i18n.get(language, "commands", "volume_set", {
				volume: volume.toFixed(1),
			}),
		);
	},
};

export default VolumeCommand;
