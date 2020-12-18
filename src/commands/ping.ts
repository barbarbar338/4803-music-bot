import { Message } from "discord.js";
import { CommandArgs, ICommand } from "my-module";

const PingCommand: ICommand = {
	name: "ping",
	argsDefinitions: [],
	channelRequired: false,
	joinPermissionRequired: false,
	playerRequired: false,
	sameChannelRequired: false,
	async execute({ client, message }: CommandArgs): Promise<Message> {
		return message.channel.send(
			`:ping_pong: Pong! pingim ${client.ws.ping}ms`,
		);
	},
};

export default PingCommand;
