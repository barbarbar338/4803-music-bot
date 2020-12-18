import { Document, Schema, model } from "mongoose";

export interface IGuildModel extends Document {
	guildID: string;
	language: string;
	prefix?: string;
}

export const GuildSchema = new Schema({
	guildID: {
		type: String,
		required: true,
		unique: true,
	},
	language: {
		type: String,
		required: true,
		default: "en",
	},
	prefix: String,
});

export const GuildModel = model<IGuildModel>(
	"GuildModel",
	GuildSchema,
	"GUILD_COLLECTION",
);
