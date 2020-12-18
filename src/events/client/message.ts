import { bargs } from "bargs/dist";
import { Message } from "discord.js";
import { IEvent } from "my-module";
import CONFIG from "../../config";

const MessageEvent: IEvent = {
	name: "message",
	async execute(client, message: Message) {
		if (
			!message.content ||
			!message.content.startsWith(CONFIG.PREFIX) ||
			!message.guild ||
			message.author.bot
		)
			return;
		const [name, ...args] = message.content
			.slice(CONFIG.PREFIX.length)
			.split(/\s+/g);
		const command = client.commands.get(name);
		if (!command) return;

		const player = client.manager.get(message.guild.id);
		const { channel } = message.member.voice;

		if (command.playerRequired && !player)
			return message.reply("there is no player for this guild.");
		if (command.channelRequired && !channel)
			return message.reply("you need to join a voice channel.");
		if (
			command.sameChannelRequired &&
			(!player || channel.id !== player.voiceChannel)
		)
			return message.reply("you're not in the same voice channel.");
		if (
			command.joinPermissionRequired &&
			!channel.permissionsFor(client.user).has("CONNECT")
		)
			return message.channel.send(
				`No Permissions To Connect ${channel.toString()}`,
			);

		const isSuccess = await command.execute({
			client,
			message,
			args: bargs(command.argsDefinitions, args),
			manager: client.manager,
			player,
			vc: channel,
		});

		if (!isSuccess)
			await message.channel.send(
				"An error occured while executing command. Please try again later.",
			);
	},
};

export default MessageEvent;
