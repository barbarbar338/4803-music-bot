import { Message, MessageEmbed } from "discord.js";
import { Categories, CommandArgs, ICommand } from "my-module";
import CONFIG from "../config";

const HelpCommand: ICommand = {
	name: "help",
	argsDefinitions: [
		{ name: "command", aliases: ["c"], type: String, default: true },
	],
	channelRequired: false,
	joinPermissionRequired: false,
	playerRequired: false,
	sameChannelRequired: false,
	noEmptyQueue: false,
	category: "category_help",
	description: "help_description",
	usage: "help [command_name]",
	examples: ["help", "help ping"],
	async execute({
		client,
		message,
		language,
		args,
		guildModel,
	}: CommandArgs): Promise<Message> {
		const { command } = args;
		const prefix = guildModel.prefix || CONFIG.PREFIX;
		if (command) {
			const cmd = client.commands.get(command as string);
			if (!cmd)
				return message.channel.send(
					client.i18n.get(
						language,
						"commands",
						"help_command_not_found",
						{
							command: command as string,
						},
					),
				);
			const embed = new MessageEmbed()
				.setColor("GREEN")
				.setTitle(
					client.i18n.get(
						language,
						"commands",
						"help_command_title",
						{ command: cmd.name },
					),
				)
				.addField(
					client.i18n.get(language, "commands", "help_command_name"),
					cmd.name,
				)
				.addField(
					client.i18n.get(
						language,
						"commands",
						"help_command_category",
					),
					client.i18n.get(language, "details", cmd.category),
				)
				.addField(
					client.i18n.get(
						language,
						"commands",
						"help_command_description",
					),
					client.i18n.get(language, "details", cmd.description),
				)
				.addField(
					client.i18n.get(language, "commands", "help_command_usage"),
					cmd.usage,
				)
				.addField(
					client.i18n.get(
						language,
						"commands",
						"help_command_examples",
					),
					`\`\`\`${cmd.examples
						.map((example) => `${prefix}${example}`)
						.join("\n")}\`\`\``,
				)
				.setFooter(
					`Requested By - ${message.author.username}`,
					message.author.displayAvatarURL({ dynamic: true }),
				)
				.setTimestamp();
			return message.channel.send(embed);
		} else {
			const categories: Categories = {};
			for (const command of client.commands.array()) {
				if (!categories[command.category])
					categories[command.category] = [command];
				else
					categories[command.category] = [
						...categories[command.category],
						command,
					];
			}
			const embed = new MessageEmbed()
				.setColor("GREEN")
				.setFooter(
					`Requested By - ${message.author.username}`,
					message.author.displayAvatarURL({ dynamic: true }),
				)
				.setTimestamp()
				.setTitle(
					client.i18n.get(language, "commands", "help_all_commands"),
				)
				.setDescription(
					client.i18n.get(language, "commands", "help_description", {
						prefix,
					}),
				);
			for (const category in categories) {
				const commands = categories[category];
				embed.addField(
					client.i18n.get(language, "details", category),
					commands.map((cmd) => `\`${cmd.name}\``).join(" | "),
				);
			}
			return message.channel.send(embed);
		}
	},
};

export default HelpCommand;
