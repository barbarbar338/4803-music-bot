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
	noEmptyQueue: false,
	argsDefinitions: [
		{ name: "level", aliases: ["lvl", "l"], type: String, default: true },
	],
	category: "category_util",
	description: "bassboost_description",
	usage: "bassboost <level>",
	examples: [ "bassboost none", "bassboost low", "bassboost medium", "bassboost high"],
	async execute({
		client,
		language,
		message,
		args,
		player,
	}: CommandArgs): Promise<Message> {
		let level = "none";
		if (args.level && (args.level as string).toLowerCase() in levels)
			level = (args.level as string).toLowerCase();

		const bands = new Array(3)
			.fill(null)
			.map((_, i) => ({ band: i, gain: levels[level] }));

		player.setEQ(...bands);

		return message.channel.send(
			client.i18n.get(language, "commands", "bass_boost_set", {
				level,
			}),
		);
	},
};

export default BassBoostCommand;
