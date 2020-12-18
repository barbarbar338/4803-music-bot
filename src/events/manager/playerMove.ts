import { IManagerEvent } from "my-module";

const PlayerMoveEvent: IManagerEvent = {
	name: "playerMove",
	async execute(client, _manager, player, _currentChannel, newChannel) {
		player.voiceChannel = client.channels.cache.get(newChannel).id;
	},
};

export default PlayerMoveEvent;
