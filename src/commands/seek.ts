import { Message } from "discord.js";
import { CommandArgs, ICommand } from "my-module";
import { parseTime } from "../struct/Functions";

const SeekCommand: ICommand = {
	name: "seek",
	playerRequired: true,
	channelRequired: true,
	sameChannelRequired: true,
	argsDefinitions: [
		{ name: "time", aliases: ["t"], default: true, type: String },
	],
	joinPermissionRequired: false,
	async execute({ player, message, args }: CommandArgs): Promise<Message> {
		if (
			player.queue.size === 0 ||
			(player.position === 0 && !player.playing)
		)
			return message.channel.send("**Nothing Playing In This Server!**");

		const timestampInMS = parseTime(args.time as string);

		if (timestampInMS === null)
			return message.channel.send(
				`**Please Enter Time In This Format!\n\n\`\`\`css\n1s, 1m, 1h, 1d, 1w, 1month, 1y\`\`\`**`,
			);
		if (timestampInMS > player.queue.current.duration || timestampInMS < 0)
			return message.channel.send(
				"**Cannot Seek Beyond Length Of Song!\nPlease Enter Time In This Format!\n\n```css\n1s, 1m, 1h, 1d, 1w, 1month, 1y```**",
			);

		player.seek(timestampInMS);
		return message.channel.send("**▶️ Seeked!**");
	},
};

export default SeekCommand;
