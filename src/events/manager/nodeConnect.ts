import { Node } from "erela.js";
import { IManagerEvent } from "my-module";

const NodeConnectEvent: IManagerEvent = {
	name: "nodeConnect",
	async execute(client, _manager, node: Node) {
		client.logger.info(`Node "${node.options.identifier}" connected`);
	},
};

export default NodeConnectEvent;
