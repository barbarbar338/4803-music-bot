import { Message } from "discord.js";
import { CommandArgs, ICommand } from "my-module";

const JoinCommand: ICommand = {
	name: "join",
	channelRequired: true,
	sameChannelRequired: false,
	joinPermissionRequired: true,
	argsDefinitions: [],
	playerRequired: false,
	async execute({
		manager,
		message,
		player,
		vc,
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
			return message.channel.send("**Connected**");
		} else if (!message.guild.me.voice.channel) {
			message.guild.me.voice.channel.join();
			return message.channel.send("**Connected**");
		} else {
			return message.channel.send(
				"**I'm Connected To A Voice Channel!**",
			);
		}
	},
};

export default JoinCommand;
