import {
	ActivityType,
	Client,
	Collection,
	PresenceStatusData,
} from "discord.js";
import { Manager } from "erela.js";
import { I18n } from "locale-parser";
import { connect } from "mongoose";

import { readdirSync } from "fs";
import { ICommand } from "my-module";
import { resolve } from "path";

import CONFIG from "../config";
import Logger from "./Logger";
import * as Functions from "./Functions";

export class Core extends Client {
	public token = CONFIG.TOKEN;
	public manager = new Manager({
		...CONFIG.ERELA,
		send: (id, payload) => {
			const guild = this.guilds.cache.get(id);
			if (guild) guild.shard.send(payload);
		},
	});
	public commands = new Collection<string, ICommand>();
	public logger = Logger;
	public functions = Functions;
	public i18n = new I18n(CONFIG.I18N);

	constructor() {
		super({
			shardCount: CONFIG.SHARD_COUNT,
			presence: {
				activity: {
					name: Functions.random<string>(
						CONFIG.PRESENCE.activity.name,
					),
					type: Functions.random<ActivityType>(
						CONFIG.PRESENCE.activity.type,
					),
				},
				afk: false,
				status: Functions.random<PresenceStatusData>(
					CONFIG.PRESENCE.status,
				),
			},
		});
	}

	private async importCommands(): Promise<void> {
		const files = readdirSync(resolve(__dirname, "..", "commands"));
		for (const file of files) {
			const command = (
				await import(resolve(__dirname, "..", "commands", file))
			).default;
			this.commands.set(command.name, command);
			this.logger.info(`Loading command ${command.name}`);
		}
	}

	private async importEvents(): Promise<void> {
		const files = readdirSync(resolve(__dirname, "..", "events", "client"));
		for (const file of files) {
			const event = (
				await import(resolve(__dirname, "..", "events", "client", file))
			).default;
			this.on(event.name, (...args) => event.execute(this, ...args));
			this.logger.info(`Loading event ${event.name}`);
		}
	}

	private async importManagerEvents(): Promise<void> {
		const files = readdirSync(
			resolve(__dirname, "..", "events", "manager"),
		);
		for (const file of files) {
			const event = (
				await import(
					resolve(__dirname, "..", "events", "manager", file)
				)
			).default;
			this.manager.on(event.name, (...args) =>
				event.execute(this, this.manager, ...args),
			);
			this.logger.info(`Loading manager event ${event.name}`);
		}
	}

	public async connect(): Promise<string> {
		this.logger.info("Loading files");
		await this.importEvents();
		await this.importManagerEvents();
		await this.importCommands();
		this.logger.info("Connecting to MongoDB");
		await connect(CONFIG.MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		this.logger.info("Connecting to Discord API");
		return this.login(CONFIG.TOKEN);
	}
}
