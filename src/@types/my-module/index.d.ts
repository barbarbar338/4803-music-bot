declare module "my-module" {
	export interface CommandArgs {
		client: import("../../struct/Core").Core;
		message: import("discord.js").Message;
		args: import("bargs").Result;
		manager: import("erela.js").Manager;
		player?: import("erela.js").Player;
		vc?: import("discord.js").VoiceChannel;
	}
	export interface ICommand {
		name: string;
		channelRequired: boolean;
		playerRequired: boolean;
		sameChannelRequired: boolean;
		joinPermissionRequired: boolean;
		argsDefinitions: import("bargs").OptionDefinitions;
		execute: (
			commandArgs: CommandArgs,
		) => Promise<import("discord.js").Message>;
	}
	export interface IEvent {
		name: string;
		execute: (
			client: import("../../struct/Core").Core,
			...args: any[]
		) => Promise<unknown>;
	}
	export interface IManagerEvent {
		name: string;
		execute: (
			client: import("../../struct/Core").Core,
			manager: import("erela.js").Manager,
			...args: any[]
		) => Promise<unknown>;
	}
	export interface LooseObject {
		[key: string]: unknown;
	}
}
