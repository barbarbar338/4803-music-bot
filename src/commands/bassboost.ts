import { Message } from "discord.js";
import { CommandArgs, ICommand } from "my-module";

const levels = {
	none: 0.0,
	low: 0.1,
	medium: 0.15,
	high: 0.25,
};

const BassBoostCommand: ICommand = {
	name: "bassboost",
	playerRequired: true,
	channelRequired: true,
	sameChannelRequired: true,
	joinPermissionRequired: false,
	argsDefinitions: [
		{ name: "level", aliases: ["lvl", "l"], type: String, default: true },
	],
	async execute({ message, args, player }: CommandArgs): Promise<Message> {
		let level = "none";
		if (args.level && (args.level as string).toLowerCase() in levels)
			level = (args.level as string).toLowerCase();

		const bands = new Array(3)
			.fill(null)
			.map((_, i) => ({ band: i, gain: levels[level] }));

		player.setEQ(...bands);

		return message.reply(`set the bassboost level to ${level}`);
	},
};

export default BassBoostCommand;
