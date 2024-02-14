import { Message, EmbedBuilder } from "discord.js";
import { Categories, CommandArgs, ICommand } from "my-module";
import CONFIG from "../config";

const HelpCommand: ICommand = {
	name: "statistics",
	argsDefinitions: [
		{ name: "statistics", aliases: ["stats"], type: String, default: true },
	],
	channelRequired: false,
	joinPermissionRequired: false,
	playerRequired: false,
	sameChannelRequired: false,
	noEmptyQueue: false,
	category: "category_help",
	description: "help_description",
	usage: "",
	examples: [],
	async execute({
		client,
		message,
		language,
		args,
		guildModel,
	}: CommandArgs): Promise<Message> {
		const { command } = args;
		if (command) {
			const cmd = client.commands.get(command as string);
			if (!cmd)
				return;
		}
		const embedxd = new EmbedBuilder()
		.setColor('Random')
		.setTitle('Lyrpex Statistic')
		.setAuthor({ name: message.author.username, iconURL: client.user.displayAvatarURL({}) })
		.setDescription(`Developer's: \`takachixrd\` & \`barbarbar338\` \nServer's: **${client.guilds.cache.size}** \nUser's: **${client.users.cache.size}** \nUptime: **${client.uptime.toString()}** \nPing: **${client.ws.ping.toString()}**`)
		.setTimestamp()
		.setFooter({ text: 'Lyrpex Music <3', iconURL: client.user.displayAvatarURL({}) });
		message.channel.send({
			embeds: [
				embedxd
			]
		})
	},
};

export default HelpCommand;