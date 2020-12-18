import { Node } from "erela.js";
import { IManagerEvent } from "my-module";

const NodeConnectEvent: IManagerEvent = {
	name: "nodeConnect",
	async execute(_client, _manager, node: Node) {
		console.info(`Node "${node.options.identifier}" connected`);
	},
};

export default NodeConnectEvent;
