import { Client, Collection } from "discord.js";
import { Manager } from "erela.js";

import { readdirSync } from "fs";
import { ICommand } from "my-module";
import { resolve } from "path";

import CONFIG from "../config";

export interface LooseObject {
	[key: string]: unknown;
}

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

	private async importCommands(): Promise<void> {
		const files = readdirSync(resolve(__dirname, "..", "commands"));
		for (const file of files) {
			const command = (
				await import(resolve(__dirname, "..", "commands", file))
			).default;
			this.commands.set(command.name, command);
			console.log(`[Loading Command]: ${command.name}`);
		}
	}

	private async importEvents(): Promise<void> {
		const files = readdirSync(resolve(__dirname, "..", "events", "client"));
		for (const file of files) {
			const event = (
				await import(resolve(__dirname, "..", "events", "client", file))
			).default;
			this.on(event.name, (...args) => event.execute(this, ...args));
			console.log(`[Loading Event]: ${event.name}`);
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
			console.log(`[Loading Manager Event]: ${event.name}`);
		}
	}

	public async connect(): Promise<string> {
		await this.importEvents();
		await this.importManagerEvents();
		await this.importCommands();
		return this.login(CONFIG.TOKEN);
	}
}
