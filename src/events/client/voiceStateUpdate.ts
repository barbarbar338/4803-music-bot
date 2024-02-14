import { TextChannel, VoiceState } from "discord.js";
import { IEvent } from "my-module";
import { GuildModel, IGuildModel } from "../../models/guildModel";

const VoiceStateUpdateEvent: IEvent = {
	name: "voiceStateUpdate",
	async execute(client, oldState: VoiceState, newState: VoiceState) {
		if (oldState.channelId && !newState.channelId) {
			const player = client.manager.get(oldState.guild.id);
			if (!player) return;
			if (
				oldState.member.id != client.user.id &&
				oldState.channel.members.filter(
					(member) => member.id != client.user.id,
				).size < 1
			) {
				const channel = oldState.guild.channels.cache.get(
					player.textChannel,
				) as TextChannel;
				if (channel) {
					let guildModel: IGuildModel | null = await GuildModel.findOne({
						guildID: oldState.guild.id,
					  });
					  
					  if (!guildModel) {
						guildModel = await GuildModel.create({
						  guildID: oldState.guild.id,
						  language: "en",
						});
					  }
					const { language } = guildModel;
					await channel.send(
						{
							content: `${client.i18n.get(language, "events", "channel_empty")}`
						}
					);
				}
				player.destroy();
			}
		}
		if (newState.member.id == client.user.id) {
			const player = client.manager.get(newState.guild.id);
			const channel = newState.guild.channels.cache.get(
				player.textChannel,
			) as TextChannel;
			if (newState.mute) {
				if (channel) {
					let guildModel: IGuildModel | null = await GuildModel.findOne({
						guildID: oldState.guild.id,
					  });
					if (!guildModel) {
						guildModel = await GuildModel.create({
							guildID: channel.guild.id,
							language: "en",
						});
					}
					const { language } = guildModel;
					await channel.send(
						{
							content: `${client.i18n.get(language, "events", "player_muted")}`
						}
					);
				}
				player.pause(true);
			} else player.pause(false);
		}
	},
};

export default VoiceStateUpdateEvent;
