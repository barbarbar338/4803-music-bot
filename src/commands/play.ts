import { Message } from "discord.js";
import { CommandArgs, ICommand } from "my-module";

const PlayCommand: ICommand = {
	name: "play",
	channelRequired: true,
	argsDefinitions: [
		{
			name: "query",
			aliases: ["search", "s", "q", "content", "term", "t"],
			type: String,
			default: true,
		},
	],
	joinPermissionRequired: true,
	playerRequired: false,
	sameChannelRequired: false,
	async execute({
		manager,
		message,
		args,
		vc,
	}: CommandArgs): Promise<Message> {
		if (!args.query)
			return message.reply("you need to give me a URL or a search term.");

		const player = manager.create({
			guild: message.guild.id,
			voiceChannel: vc.id,
			textChannel: message.channel.id,
		});

		if (player.state !== "CONNECTED") player.connect();

		const search = args.query as string;
		let res;

		try {
			res = await player.search(search, message.author);
			if (res.loadType === "LOAD_FAILED") {
				if (!player.queue.current) player.destroy();
				throw res.exception;
			}
		} catch (err) {
			return message.reply(
				`there was an error while searching: ${err.message}`,
			);
		}

		switch (res.loadType) {
			case "NO_MATCHES":
				if (!player.queue.current) player.destroy();
				return message.reply("there were no results found.");
			case "TRACK_LOADED":
				player.queue.add(res.tracks[0]);

				if (!player.playing && !player.paused && !player.queue.size)
					player.play();
				return message.reply(`enqueuing \`${res.tracks[0].title}\`.`);
			case "PLAYLIST_LOADED":
				player.queue.add(res.tracks);

				if (
					!player.playing &&
					!player.paused &&
					player.queue.totalSize === res.tracks.length
				)
					player.play();
				return message.reply(
					`enqueuing playlist \`${res.playlist.name}\` with ${res.tracks.length} tracks.`,
				);
			case "SEARCH_RESULT":
				let max = 5,
					collected;
				const filter = (m) =>
					m.author.id === message.author.id &&
					/^(\d+|end)$/i.test(m.content);
				if (res.tracks.length < max) max = res.tracks.length;

				const results = res.tracks
					.slice(0, max)
					.map((track, index) => `${++index} - \`${track.title}\``)
					.join("\n");

				message.channel.send(results);

				try {
					collected = await message.channel.awaitMessages(filter, {
						max: 1,
						time: 30e3,
						errors: ["time"],
					});
				} catch (e) {
					if (!player.queue.current) player.destroy();
					return message.reply("you didn't provide a selection.");
				}

				const first = collected.first().content;

				if (first.toLowerCase() === "end") {
					if (!player.queue.current) player.destroy();
					return message.channel.send("Cancelled selection.");
				}

				const index = Number(first) - 1;
				if (index < 0 || index > max - 1)
					return message.reply(
						`the number you provided too small or too big (1-${max}).`,
					);

				const track = res.tracks[index];
				player.queue.add(track);

				if (!player.playing && !player.paused && !player.queue.size)
					player.play();
				return message.reply(`enqueuing \`${track.title}\`.`);
		}
	},
};

export default PlayCommand;
