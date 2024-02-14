import { Message } from "discord.js";
import { CommandArgs, ICommand } from "my-module";
import { GuildModel } from "../models/guildModel";

const PrefixCommand: ICommand = {
	name: "prefix",
	argsDefinitions: [
		{
			name: "reset",
			type: Boolean,
			aliases: ["r", "delete", "d", "del"],
			default: false,
		},
		{
			name: "prefix",
			type: String,
			aliases: ["p"],
			default: true,
		},
	],
	channelRequired: false,
	joinPermissionRequired: false,
	playerRequired: false,
	sameChannelRequired: false,
	noEmptyQueue: false,
	category: "category_config",
	description: "prefix_description",
	usage: "prefix <prefix>",
	examples: ["prefix -reset", "prefix !", "prefix ?", "prefix 4!"],
	async execute({
		client,
		message,
		language,
		args,
	}: CommandArgs): Promise<Message> {
		if (!message.member.permissions.has("Administrator"))
			return message.channel.send(
				{
					content: "You need `Administrator` permission to use this command."
				}
			);
		const { reset, prefix } = args;
		if (reset) {
			await GuildModel.updateOne(
				{ guildID: message.guild.id },
				{ prefix: null },
			);
			return message.channel.send(
				{
					content: "Your server's preferred prefix has been successfully reset."
				}
			);
		} else {
			if (!prefix)
				return message.channel.send(
					{
						content: "Specify your server's preferred prefix"
					}
				);
			if ((prefix as string).length > 4)
				return message.channel.send(
					{
						content: "Your server's preferred prefix should be less than 5 characters."
					}
				);
			await GuildModel.updateOne(
				{ guildID: message.guild.id },
				{ prefix: prefix as string },
			);
			let newprefix = prefix as string;
			return message.channel.send(
				{
					content: `Your server's preferred prefix has been successfully updated. Try using ${newprefix}help command to see effects`
				}
			);
		}
	},
};

export default PrefixCommand;
