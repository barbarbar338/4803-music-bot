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
		if (!message.member.permissions.has("ADMINISTRATOR"))
			return message.channel.send(
				client.i18n.get(language, "commands", "no_admin_perm"),
			);
		const { reset, prefix } = args;
		if (reset) {
			await GuildModel.updateOne(
				{ guildID: message.guild.id },
				{ prefix: null },
			);
			return message.channel.send(
				client.i18n.get(language, "commands", "prefix_reset"),
			);
		} else {
			if (!prefix)
				return message.channel.send(
					client.i18n.get(language, "commands", "prefix_define"),
				);
			if ((prefix as string).length > 4)
				return message.channel.send(
					client.i18n.get(language, "commands", "prefix_length"),
				);
			await GuildModel.updateOne(
				{ guildID: message.guild.id },
				{ prefix: prefix as string },
			);
			return message.channel.send(
				client.i18n.get(language, "commands", "prefix_update", {
					prefix: prefix as string,
				}),
			);
		}
	},
};

export default PrefixCommand;
