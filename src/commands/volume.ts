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
	async execute({ player, message, args }: CommandArgs): Promise<Message> {
		if (
			player.queue.size === 0 ||
			(player.position === 0 && !player.playing)
		)
			return message.channel.send("**Nothing Playing In This Server!**");

		const volume = args.volume as number;

		if (!volume)
			return message.channel.send(
				`**Current Volume: \`${player.volume / 10}/10\`**`,
			);

		if (isNaN(volume))
			return message.channel.send(`**Please Enter A Positive Integer!**`);

		if (volume < 11 && volume > 0) {
			player.setVolume(volume * 10);
			return message.channel.send(`**Volume Set To: \`${volume}\`**`);
		} else {
			return message.channel.send("**Select Volume From 1-10**");
		}
	},
};

export default VolumeCommand;
