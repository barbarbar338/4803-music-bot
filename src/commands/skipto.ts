import { Message } from "discord.js";
import { CommandArgs, ICommand } from "my-module";

const SkipToCommand: ICommand = {
	name: "skipto",
	channelRequired: true,
	sameChannelRequired: true,
	joinPermissionRequired: false,
	playerRequired: true,
	argsDefinitions: [
		{ name: "skip", aliases: ["s"], default: true, type: Number },
	],
	async execute({ player, message, args }: CommandArgs): Promise<Message> {
		if (
			player.queue.size === 0 ||
			(player.position === 0 && !player.playing)
		)
			return message.channel.send("**Nothing Playing In This Server!**");

		if (!args.skip)
			return message.channel.send(
				"**Please Enter The Song Number To Skip!**",
			);

		const position = args.skip as number;

		if (isNaN(position) || position < 1)
			return message.channel.send(
				"**Please Enter A Positive Integer Number!**",
			);
		if (
			position > player.queue.size ||
			!player.queue[player.queue.size > 1 ? position - 2 : position - 1]
		)
			return message.channel.send("**Song Not Found!**");

		if (position > 1 && player.queue.size != position) {
			player.queue.splice(0, position - 2);
			player.stop();
			return message.channel.send(
				`**Skipped \`${
					position - 1 === 1 ? "1 Song" : `${position - 1} Songs`
				}\`**`,
			);
		} else if (position > 1 && player.queue.size == position) {
			player.queue.splice(0, player.queue.length - 1);
			player.stop();
			return message.channel.send(
				`**Skipped \`${position - 1} Songs\`**`,
			);
		}
	},
};

export default SkipToCommand;
