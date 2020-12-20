import { Message } from "discord.js";
import { CommandArgs, ICommand } from "my-module";
import CONFIG from "../config";

const SeekCommand: ICommand = {
	name: "seek",
	playerRequired: true,
	channelRequired: true,
	sameChannelRequired: true,
	argsDefinitions: [
		{
			name: "seconds",
			aliases: ["s", "secs"],
			default: false,
			type: Number,
		},
		{
			name: "minutes",
			aliases: ["m", "mins"],
			default: false,
			type: Number,
		},
		{
			name: "hours",
			aliases: ["h", "hrs"],
			default: false,
			type: Number,
		},
		{
			name: "days",
			aliases: ["d", "dys"],
			default: false,
			type: Number,
		},
	],
	joinPermissionRequired: false,
	noEmptyQueue: true,
	async execute({
		client,
		player,
		message,
		args,
		language,
		guildModel,
	}: CommandArgs): Promise<Message> {
		const { seconds, minutes, hours, days } = args;
		if (seconds && minutes && hours && days)
			return await message.channel.send(
				client.i18n.get(language, "commands", "seek_invalid_format", {
					prefix: guildModel.prefix || CONFIG.PREFIX,
				}),
			);

		let str: string;
		if (seconds) str += `${seconds}s `;
		if (minutes) str += `${minutes}m `;
		if (hours) str += `${hours}h `;
		if (days) str += `${days}d`;
		str = str.trim();

		const timestampInMS = client.functions.parseTime(str);
		if (timestampInMS === null)
			return await message.channel.send(
				client.i18n.get(language, "commands", "seek_invalid_format", {
					prefix: guildModel.prefix || CONFIG.PREFIX,
				}),
			);
		if (timestampInMS > player.queue.current.duration || timestampInMS < 0)
			return message.channel.send(
				client.i18n.get(language, "commands", "seek_length"),
			);

		player.seek(timestampInMS);
		return message.channel.send(
			client.i18n.get(language, "commands", "seek_seeked"),
		);
	},
};

export default SeekCommand;
