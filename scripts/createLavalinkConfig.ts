import * as yaml from "yaml";
import * as fs from "fs";
import CONFIG from "../src/config";
import Logger from "../src/struct/Logger";

Logger.info("Creating Lavalink configuration file");

const LavalinkConfig = {
	server: {
		port: CONFIG.LAVALINK.port,
		address: CONFIG.LAVALINK.host,
	},
	lavalink: {
		server: {
			password: CONFIG.LAVALINK.password,
			sources: {
				youtube: true,
				bandcamp: true,
				soundcloud: true,
				twitch: true,
				vimeo: true,
				mixer: true,
				http: true,
				local: false,
			},
			bufferDurationMs: 400,
			youtubePlaylistLoadLimit: 6,
			youtubeSearchEnabled: true,
			soundcloudSearchEnabled: true,
			"gc-warnings": true,
		},
	},
	metrics: {
		prometheus: {
			enabled: false,
			endpoint: "/metrics",
		},
	},
	sentry: {
		dsn: "",
	},
	logging: false,
};

const yamlFormatted = yaml.stringify(LavalinkConfig, {
	indent: 4,
});

fs.writeFileSync("./application.yaml", yamlFormatted);
