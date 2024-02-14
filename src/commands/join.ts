import { joinVoiceChannel } from "@discordjs/voice";
import { Message } from "discord.js";
import { CommandArgs, ICommand } from "my-module";

const JoinCommand: ICommand = {
	name: "join",
	channelRequired: true,
	sameChannelRequired: false,
	joinPermissionRequired: true,
	argsDefinitions: [],
	playerRequired: false,
	noEmptyQueue: false,
	category: "category_music",
	description: "join_description",
	usage: "join",
	examples: ["join"],
	async execute({
		manager,
		message,
		player,
		vc,
		client,
		language,
	}: CommandArgs): Promise<Message> {
		if (!player || (player && player.state === "DISCONNECTED")) {
			manager
				.create({
					guild: message.guild.id,
					voiceChannel: vc.id,
					textChannel: message.channel.id,
					selfDeafen: true,
				})
				.connect();
				await joinVoiceChannel({
					channelId: message.member.voice.channelId,
					guildId: message.guildId,
					adapterCreator: message.guild.voiceAdapterCreator,
					selfDeaf: true,
					selfMute: false
				})
				
			return message.channel.send(
				{
					content: "Connected."
				}
			);
		} else if (message.member.voice.channelId) {
			await joinVoiceChannel({
				channelId: message.member.voice.channelId,
				guildId: message.guildId,
				adapterCreator: message.guild.voiceAdapterCreator,
				selfDeaf: true,
				selfMute: false
			})
			return message.channel.send(
				{
					content: "Connected."
				}
			);
		} else
			return message.channel.send(
				{
					content: "I'm on another channel. How about you come to me?"
				}
			);
	},
};

export default JoinCommand;
