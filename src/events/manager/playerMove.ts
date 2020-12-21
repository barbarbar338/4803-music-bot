import { TextChannel } from "discord.js";
import { IManagerEvent } from "my-module";
import { GuildModel } from "../../models/guildModel";

const PlayerMoveEvent: IManagerEvent = {
	name: "playerMove",
	async execute(client, _manager, player, _currentChannel, newChannel) {
		if (!newChannel) {
			const channel = client.channels.cache.get(
				player.textChannel,
			) as TextChannel;
			if (channel) {
				let guildModel = await GuildModel.findOne({
					guildID: channel.guild.id,
				});
				if (!guildModel) {
					guildModel = await GuildModel.create({
						guildID: channel.guild.id,
						language: "en",
					});
				}
				const { language } = guildModel;
				await channel.send(
					client.i18n.get(
						language,
						"events",
						"disconnected_from_channel",
					),
				);
			}
			player.destroy();
		} else player.voiceChannel = client.channels.cache.get(newChannel).id;
	},
};

export default PlayerMoveEvent;
