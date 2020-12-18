import { Message, MessageEmbed } from "discord.js";
import { CommandArgs, ICommand } from "my-module";

const NowPlayingCommand: ICommand = {
	name: "nowplaying",
	playerRequired: true,
	channelRequired: true,
	sameChannelRequired: true,
	argsDefinitions: [],
	joinPermissionRequired: false,
	async execute({ client, player, message }: CommandArgs): Promise<Message> {
		if (
			player.queue.size === 0 ||
			(player.position === 0 && !player.playing)
		)
			return message.channel.send("**Nothing Playing In This Server!**");

		const video = player.queue.current;
		let description;

		if (video.isStream) {
			description = "Live Stream";
		} else {
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

		const embed = new MessageEmbed()
			.setThumbnail(
				`https://i.ytimg.com/vi/${video.identifier}/hqdefault.jpg`,
			)
			.setColor("GREEN")
			.setTitle(video.title)
			.setDescription(description)
			.setFooter(
				message.author.username,
				message.author.displayAvatarURL({ dynamic: true }),
			)
			.setTimestamp();
		return message.channel.send(embed);
	},
};

export default NowPlayingCommand;
