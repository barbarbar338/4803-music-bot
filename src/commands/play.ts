import { joinVoiceChannel } from "@discordjs/voice";
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
	noEmptyQueue: false,
	category: "category_music",
	description: "play_description",
	usage: "play <search_term>",
	examples: ["play bohemian rhapsody", "play https://youtu.be/fJ9rUzIMcZQ"],
	async execute({
		manager,
		message,
		args,
		vc,
		client,
		language,
	}: CommandArgs): Promise<Message> {
		if (!args.query)
			return message.channel.send(
				{
					content: "You need to give me a URL or a search term."
				}
			);
			await joinVoiceChannel({
				channelId: message.member.voice.channelId,
				guildId: message.guildId,
				adapterCreator: message.guild.voiceAdapterCreator,
				selfDeaf: true,
				selfMute: false
			})

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
			return message.channel.send(
				{
					content: `An error occured while searching, please get in touch with Takachi (takachixrd) or 338 (barbarbar338). error: ${err}`
				}
			);
		}

		switch (res.loadType) {
			case "NO_MATCHES":
				if (!player.queue.current) player.destroy();
				return message.channel.send(
					{
						content: "I couldn't find any results."
					}
				);
			case "TRACK_LOADED":
				player.queue.add(res.tracks[0]);
				if (!player.playing && !player.paused && !player.queue.size)
					player.play();
				return message.channel.send(
					{
						content: `Enqueuing '${res.treacks[0].title}'`
					}
				);
			case "PLAYLIST_LOADED":
				player.queue.add(res.tracks);
				if (
					!player.playing &&
					!player.paused &&
					player.queue.totalSize === res.tracks.length
				)
					player.play();
					const playlist = res.playlist.name;
					const tracks = res.tracks.length;
				return message.reply(
					{
						content: `Enqueuing playlist ${playlist} with ${tracks} tracks.`
					}
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

				await message.channel.send(
					results +
						"\n\n" +
						client.i18n.get(language, "commands", "play_cancel"),
				);

				try {
					/*collected = await message.channel.awaitMessages(filter, {
						max: 1,
						time: 30e3,
						errors: ["time"],
					});*/
				} catch (e) {
					if (!player.queue.current) player.destroy();
					return message.channel.send(
						{
							content: "Process is canceled because you did not specify an option."
						}
					);
				}

				const first = collected.first().content;

				if (first.toLowerCase() === "cancel") {
					if (!player.queue.current) player.destroy();
					return message.channel.send(
						{
							content: "Type `cancel` to cancel the operation."
						}
					);
				}

				const index = Number(first) - 1;
				if (index < 0 || index > max - 1)
					return message.channel.send(
						{
							content: `The number you provided too small or too big (1-${max.toString}).`
						}
					);

				const track = res.tracks[index];
				player.queue.add(track);

				if (!player.playing && !player.paused && !player.queue.size)
					player.play();
				return message.reply(
					{
						content: `Enqueuing ${track.title}`
					}
				);
		}
	},
};

export default PlayCommand;
