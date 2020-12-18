import { Node } from "erela.js";
import { IManagerEvent } from "my-module";

const NodeErrorEvent: IManagerEvent = {
	name: "nodeError",
	async execute(client, _manager, node: Node, error) {
		client.logger.error(
			`Node error: ${node.options.identifier} => ${error.message}`,
		);
	},
};

export default NodeErrorEvent;
