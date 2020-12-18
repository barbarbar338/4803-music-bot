import { Node } from "erela.js";
import { IManagerEvent } from "my-module";

const NodeErrorEvent: IManagerEvent = {
	name: "nodeError",
	async execute(_client, _manager, node: Node, error) {
		console.error(
			`Node error: ${node.options.identifier} => ${error.message}`,
		);
	},
};

export default NodeErrorEvent;
