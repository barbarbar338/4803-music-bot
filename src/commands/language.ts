import { Message } from "discord.js";
import { CommandArgs, ICommand } from "my-module";
import { GuildModel } from "../models/guildModel";

const PrefixCommand: ICommand = {
	name: "language",
	argsDefinitions: [
        {
            name: "reset",
            type: Boolean,
            aliases: [ "r", "delete", "d", "del" ],
            default: false
        },
        {
            name: "language",
            type: String,
            aliases: [ "l", "lang" ],
            default: true
        }
    ],
	channelRequired: false,
	joinPermissionRequired: false,
	playerRequired: false,
	sameChannelRequired: false,
	noEmptyQueue: false,
	category: "category_config",
	description: "language_description",
	usage: "language <language>",
	examples: [ "prelanguagefix -reset", "language en", "language tr" ],
	async execute({
		client,
		message,
		language,
        args
	}: CommandArgs): Promise<Message> {
        if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send(client.i18n.get(language, "commands", "no_admin_perm"));
        const { reset, language: newLang } = args;
        if (reset) {
            await GuildModel.updateOne({ guildID: message.guild.id }, { language: null });
            return message.channel.send(client.i18n.get(language, "commands", "language_reset"));
        } else {
            if (!newLang) return message.channel.send(client.i18n.get(language, "commands", "language_define"));
			const languages = client.i18n.getLocales();
			if (!languages.includes(newLang as string)) return message.channel.send(client.i18n.get(language, "commands", "language_not_found", {
				languages: languages.join(", ")
			}));
            await GuildModel.updateOne({ guildID: message.guild.id }, { language: newLang as string });
            return message.channel.send(client.i18n.get(newLang as string, "commands", "language_update", {
                language: newLang as string
            }));
        }
	},
};

export default PrefixCommand;
