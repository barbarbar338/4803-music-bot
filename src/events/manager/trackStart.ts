import { MessageEmbed, TextChannel } from "discord.js";
import { IManagerEvent, LooseObject } from "my-module";

const TrackStartEvent: IManagerEvent = {
	name: "trackStart",
	async execute(client, _manager, player, track) {
		const user = client.users.cache.get(
			(track.requester as LooseObject).id as string,
		);
		const embed = new MessageEmbed()
			.setAuthor(
				(track.requester as LooseObject).username,
				user.displayAvatarURL({ dynamic: true }),
			)
			.setTitle("Now Playing")
			.setColor("GREEN")
			.setThumbnail(
				`https://i.ytimg.com/vi/${track.identifier}/hqdefault.jpg`,
			)
			.setDescription(
				`:musical_note: ${
					track.title
				} :musical_note:\n\nSong Length: **${client.functions.formatTime(
					track.duration,
					true,
				)}**`,
			)
			.setTimestamp();
		(client.channels.cache.get(player.textChannel) as TextChannel).send(
			embed,
		);
	},
};

export default TrackStartEvent;
