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
	examples: [ "join" ],
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
			return message.channel.send(
				client.i18n.get(language, "commands", "join_joined"),
			);
		} else if (!message.guild.me.voice.channel) {
			message.guild.me.voice.channel.join();
			return message.channel.send(
				client.i18n.get(language, "commands", "join_joined"),
			);
		} else
			return message.channel.send(
				client.i18n.get(language, "commands", "join_another_channel"),
			);
	},
};

export default JoinCommand;
