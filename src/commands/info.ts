import { Message, EmbedBuilder } from "discord.js";
import { CommandArgs, ICommand } from "my-module";
import CONFIG from "../config";

const InfoCommand: ICommand = {
	name: "info",
	argsDefinitions: [],
	channelRequired: false,
	joinPermissionRequired: false,
	playerRequired: false,
	sameChannelRequired: false,
	noEmptyQueue: false,
	category: "category_help",
	description: "info_description",
	usage: "info",
	examples: ["info"],
	async execute({
		client,
		message,
		language,
	}: CommandArgs): Promise<Message> {
		const embed = new EmbedBuilder()
			.setColor("Green")
			.setThumbnail(client.user.avatarURL())
			.setFooter({
				text: `Requested By - ${message.author.username}`,
				iconURL: message.author.displayAvatarURL({}),}
			)
			.setTimestamp()
			.setTitle("Thanks for choosing Lyrpex.")
			.setDescription(
				client.i18n.get(language, "commands", "info_description") +
					"\n\n" +
					client.i18n.get(
						language,
						"commands",
						"info_support_server",
					) +
					": " +
					`[${client.i18n.get(language, "commands", "click")}](${
						CONFIG.SUPPORT_SERVER
					})` +
					"\n" +
					client.i18n.get(language, "commands", "info_invite") +
					": " +
					`[${client.i18n.get(
						language,
						"commands",
						"click",
					)}](${CONFIG.INVITE.replace(
						/{CLIENT_ID}/g,
						client.user.id,
					)})` +
					"\n" +
					client.i18n.get(language, "commands", "info_github") +
					": " +
					`[${client.i18n.get(language, "commands", "click")}](${
						CONFIG.GITHUB_REPO
					})` +
					"\n" +
					client.i18n.get(language, "commands", "info_crowdin") +
					": " +
					`[${client.i18n.get(language, "commands", "click")}](${
						CONFIG.CROWDIN_PROJECT
					})`,
			);

		return message.channel.send({
			embeds: [embed]
		});
	},
};

export default InfoCommand;
