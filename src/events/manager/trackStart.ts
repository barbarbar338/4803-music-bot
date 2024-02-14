import { EmbedBuilder, TextChannel } from "discord.js";
import { IManagerEvent, LooseObject } from "my-module";
import { GuildModel } from "../../models/guildModel";

const TrackStartEvent: IManagerEvent = {
	name: "trackStart",
	async execute(client, _manager, player, track) {
		const channel = client.channels.cache.get(
			player.textChannel,
		) as TextChannel;
		if (!channel) return;

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

		const user = client.users.cache.get(
			(track.requester as LooseObject).id as string,
		);
		const embed = new EmbedBuilder()
			.setAuthor(
				(track.requester as LooseObject).username,
				user.displayAvatarURL({ dynamic: true }),
			)
			.setTitle(
				client.i18n.get(language, "events", "track_start_embed_title"),
			)
			.setColor("GREEN")
			.setThumbnail(
				`https://i.ytimg.com/vi/${track.identifier}/hqdefault.jpg`,
			)
			.setDescription(
				`:musical_note: ${
					track.title
				} :musical_note:\n\n${client.i18n.get(
					language,
					"events",
					"track_start_embed_song_length",
				)}: **${client.functions.formatTime(track.duration, true)}**`,
			)
			.setTimestamp();
		channel.send(embed);
	},
};

export default TrackStartEvent;
