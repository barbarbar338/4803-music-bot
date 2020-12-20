import { bargs } from "bargs/dist";
import { Message } from "discord.js";
import { IEvent } from "my-module";
import CONFIG from "../../config";
import { GuildModel } from "../../models/guildModel";

const MessageEvent: IEvent = {
	name: "message",
	async execute(client, message: Message) {
		if (!message.content || !message.guild || message.author.bot) return;

		let guildModel = await GuildModel.findOne({
			guildID: message.guild.id,
		});
		if (!guildModel) {
			guildModel = await GuildModel.create({
				guildID: message.guild.id,
				language: "en",
			});
		}
		const { language, prefix: guildPrefix } = guildModel;

		const prefix = guildPrefix || CONFIG.PREFIX;
		if (!message.content.startsWith(prefix)) return;
		const [name, ...args] = message.content
			.slice(prefix.length)
			.split(/\s+/g);
		const command = client.commands.get(name);
		if (!command) return;

		const player = client.manager.get(message.guild.id);
		const { channel } = message.member.voice;

		if (command.playerRequired && !player)
			return message.channel.send(
				client.i18n.get(language, "events", "message_player_required"),
			);
		if (command.channelRequired && !channel)
			return message.channel.send(
				client.i18n.get(language, "events", "message_channel_required"),
			);
		if (
			command.sameChannelRequired &&
			(!player || channel.id !== player.voiceChannel)
		)
			return message.channel.send(
				client.i18n.get(
					language,
					"events",
					"message_same_channel_required",
				),
			);
		if (
			command.joinPermissionRequired &&
			!channel.permissionsFor(client.user).has("CONNECT")
		)
			return message.channel.send(
				client.i18n.get(language, "events", "message_channel_no_perm", {
					channel: channel.toString(),
				}),
			);

		if (
			command.noEmptyQueue &&
			player.queue.size === 0 &&
			player.position === 0 &&
			!player.playing
		)
			return message.channel.send(
				client.i18n.get(language, "commands", "queue_empty", {
					prefix: guildModel.prefix || CONFIG.PREFIX,
				}),
			);

		const isSuccess = await command.execute({
			client,
			message,
			args: bargs(command.argsDefinitions, args),
			manager: client.manager,
			player,
			vc: channel,
			language,
			guildModel,
		});

		if (!isSuccess)
			return message.channel.send(
				client.i18n.get(language, "events", "message_error"),
			);
	},
};

export default MessageEvent;
