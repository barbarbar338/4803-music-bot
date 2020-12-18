import { IEvent } from "my-module";

const RawEvent: IEvent = {
	name: "raw",
	async execute(client, d) {
		client.manager.updateVoiceState(d);
	},
};

export default RawEvent;
