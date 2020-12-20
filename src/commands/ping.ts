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
		return message.channel.send(
			client.i18n.get(language, "commands", "ping_ping", {
				ping: client.ws.ping.toFixed(2),
			}),
		);
	},
};

export default PingCommand;
