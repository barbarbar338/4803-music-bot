import { IEvent } from "my-module";

const ReadyEvent: IEvent = {
	name: "ready",
	async execute(client) {
		client.manager.init(client.user.id);
		client.logger.info(`Logged in as ${client.user.username}`);
	},
};

export default ReadyEvent;
