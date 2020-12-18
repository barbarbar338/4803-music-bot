declare module "locale-parser" {
	export interface I18nOptions {
		directory?: string;
		defaultLocale: string;
	}
	export interface I18nToJSON {
		constants?: I18nConstants;
		[key: string]: unknown;
	}
	export type I18nConstants = { [param: string]: string };
	export type I18nArgs = { [param: string]: string };
	export type I18nString = { [param: string]: string | string[] };
	export type I18nFile = Map<string, I18nString>;
	export type I18nLocales = Map<string, I18nFile>;
	export class I18n {
		private locales;
		private directory;
		private defaultLocale;
		private constants?;
		constructor(options: I18nOptions);
		private resolveString;
		private replace;
		getLocales(): string[];
		getConstant(constant?: string): string | I18nConstants | undefined;
		toJSON(args?: I18nArgs): I18nToJSON;
		get(
			locale: string,
			section: string,
			key: string,
			args?: I18nArgs,
		): string | string[];
	}
}
