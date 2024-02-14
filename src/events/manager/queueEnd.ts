import { TextChannel, VoiceChannel } from "discord.js";
import { IManagerEvent } from "my-module";
import CONFIG from "../../config";
import { GuildModel, IGuildModel } from "../../models/guildModel";

const QueueEndEvent: IManagerEvent = {
	name: "queueEnd",
	async execute(client, _manager, player) {
		player.destroy();
		const channel = client.channels.cache.get(player.textChannel);
		if (!channel) return;

		let guildModel: IGuildModel | null = await GuildModel.findOne({
			guildID: (channel as VoiceChannel).guild.id,
		});
		if (!guildModel) {
			guildModel = await GuildModel.create({
				guildID: (channel as VoiceChannel).guild.id,
				language: "en",
			});
		}
		const { language, prefix } = guildModel;

		(channel as TextChannel).send(
			{
				content: `${client.i18n.get(language, "events", "queue_end", {
					prefix: prefix || CONFIG.PREFIX,
				})}`
			}
		);
	},
};

export default QueueEndEvent;
