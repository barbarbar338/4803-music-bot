import { IEvent } from "my-module";

const ReadyEvent: IEvent = {
	name: "ready",
	async execute(client) {
		client.manager.init(client.user.id);
		console.info(`[${client.user.username}]: Logged in!`);
	},
};

export default ReadyEvent;
