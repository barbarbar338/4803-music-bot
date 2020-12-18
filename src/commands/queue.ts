import { Message } from "discord.js";
import { CommandArgs, ICommand } from "my-module";

const QueueCommand: ICommand = {
	name: "queue",
	channelRequired: true,
	sameChannelRequired: true,
	playerRequired: true,
	argsDefinitions: [],
	joinPermissionRequired: false,
	async execute({ client, message, player }: CommandArgs): Promise<Message> {
		if (
			player.queue.size === 0 ||
			(player.position === 0 && !player.playing)
		)
			return message.channel.send("**Nothing Playing In This Server!**");

		let currentPage = 0;
		const embeds = client.functions.generateQueueEmbed(
			client,
			message,
			player.queue,
		);
		const queueEmbed = await message.channel.send(
			`**Current Page - ${currentPage + 1}/${embeds.length}**`,
			embeds[currentPage],
		);
		await queueEmbed.react("⬅️");
		await queueEmbed.react("⏹");
		await queueEmbed.react("➡️");

		const filter = (reaction, user) =>
			["⬅️", "⏹", "➡️"].includes(reaction.emoji.name) &&
			message.author.id === user.id;
		const collector = queueEmbed.createReactionCollector(filter);

		collector.on("collect", async (reaction) => {
			if (reaction.emoji.name === "➡️") {
				if (currentPage < embeds.length - 1) {
					currentPage++;
					queueEmbed.edit(
						`**Current Page - ${currentPage + 1}/${
							embeds.length
						}**`,
						embeds[currentPage],
					);
				}
			} else if (reaction.emoji.name === "⬅️") {
				if (currentPage !== 0) {
					--currentPage;
					queueEmbed.edit(
						`**Current Page - ${currentPage + 1}/${
							embeds.length
						}**`,
						embeds[currentPage],
					);
				}
			} else {
				collector.stop();
				reaction.message.reactions.removeAll();
			}
			await reaction.users.remove(message.author.id);
		});

		return queueEmbed;
	},
};

export default QueueCommand;
