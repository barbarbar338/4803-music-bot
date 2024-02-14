import { Message } from "discord.js";
import { CommandArgs, ICommand } from "my-module";

const PingCommand: ICommand = {
	name: "ping",
	argsDefinitions: [],
	channelRequired: false,
	joinPermissionRequired: false,
	playerRequired: false,
	sameChannelRequired: false,
	noEmptyQueue: false,
	category: "category_help",
	description: "ping_description",
	usage: "ping",
	examples: ["ping"],
	async execute({
		client,
		message,
		language,
	}: CommandArgs): Promise<Message> {
		let ping = client.ws.ping.toFixed(2) as string;
		return message.channel.send(
			{
				content: `🏓 Pong! ${ping} ms.`
			}
		);
	},
};

export default PingCommand;
