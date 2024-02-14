import { Message, EmbedBuilder } from "discord.js";
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
				return;
		}
		const embedxd = new EmbedBuilder()
		.setColor('Random')
		.setTitle('Lyrpex Help Menu')
		.setAuthor({ name: message.author.username, iconURL: client.user.displayAvatarURL({}) })
		.setDescription('The list of commands.')
		.addFields(
			{ name: 'play', value: 'Plays the song you specified.', inline: true },
			{ name: 'bassboss', value: 'Adjusts the bass boost level.', inline: true },
			{ name: 'join', value: 'Bot joins the channel you are on.', inline: true },
			)
		.addFields(
			{ name: 'leave', value: 'Bot leaves the channel you are on.', inline: true },
			{ name: 'loopqueue', value: 'Loops the song queue.', inline: true },
			{ name: 'loopsong', value: 'Loops current song.', inline: true },
		)
		.addFields(
			{ name: 'nowplaying', value: 'Provides information about the song playing.', inline: true },
			{ name: 'pause', value: 'Pauses the song.', inline: true },
			{ name: 'ping', value: 'Shows the bots ping.', inline: true }
		)
		.addFields(
			{ name: 'queue', value: 'Shows the song queue.', inline: true },
			{ name: 'resume', value: 'Resumes the song.', inline: true },
			{ name: 'seek', value: 'Allows you to skip to the duration of the song you specified.', inline: true },
		)
		.addFields(
			{ name: 'shuffle', value: 'Shuffles the song queue.', inline: true },
			{ name: 'skip', value: 'Skips current song.', inline: true },
			{ name: 'skipto', value: 'Skips to the song you specified.', inline: true },
		)
		.addFields(
			{ name: 'volume', value: 'Adjusts the sound level.', inline: true },
			{ name: 'help', value: 'Gives information about commands.', inline: true },
			{ name: 'prefix', value: 'Changes the preferred prefix of your server.', inline: true },
		)
		.addFields(
			{ name: 'info', value: 'Gives information about the bot.', inline: true },
			{ name: 'stats', value: 'Gives bot statistics.', inline: true },
		)
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
