import { Message, EmbedBuilder } from "discord.js";
import { CommandArgs, ICommand } from "my-module";

const NowPlayingCommand: ICommand = {
	name: "nowplaying",
	playerRequired: true,
	channelRequired: true,
	sameChannelRequired: true,
	argsDefinitions: [],
	joinPermissionRequired: false,
	noEmptyQueue: true,
	category: "category_util",
	description: "nowplaying_description",
	usage: "nowplaying",
	examples: ["nowplaying"],
	async execute({
		client,
		player,
		message,
		language,
	}: CommandArgs): Promise<Message> {
		const video = player.queue.current;
		let description;

		if (video.isStream)
			description = client.i18n.get(
				language,
				"commands",
				"now_playing_live_stream",
			);
		else {
			const part = Math.floor((player.position / video.duration) * 30);
			const positionObj = {
				seconds: Math.floor((player.position / 1000) % 60),
				minutes: Math.floor((player.position / (1000 * 60)) % 60),
				hours: Math.floor((player.position / (1000 * 60 * 60)) % 24),
			};
			const totalDurationObj = {
				seconds: Math.floor((video.duration / 1000) % 60),
				minutes: Math.floor((video.duration / (1000 * 60)) % 60),
				hours: Math.floor((video.duration / (1000 * 60 * 60)) % 24),
			};
			description = `${
				"─".repeat(part) + "⚪" + "─".repeat(30 - part)
			}\n\n\`${client.functions.formatDuration(
				positionObj,
			)} / ${client.functions.formatDuration(totalDurationObj)}\``;
		}

		const embed = new EmbedBuilder()
			.setThumbnail(
				`https://i.ytimg.com/vi/${video.identifier}/hqdefault.jpg`,
			)
			.setColor("Green")
			.setTitle(video.title)
			.setDescription(description)
			.setFooter({
				text: message.author.username,
				iconURL: message.author.displayAvatarURL({  })}
			)
			.setTimestamp();
		return message.channel.send({
			embeds: [embed]
		});
	},
};

export default NowPlayingCommand;
