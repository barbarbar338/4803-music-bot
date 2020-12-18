declare module "bargs" {
	export type OptionDefinitions = {
		name: string;
		type: (t: unknown) => unknown;
		aliases?: string[];
		default?: boolean;
	}[];
	export interface Result {
		_unknown: {
			_?: string;
			[key: string]: unknown;
		};
		[key: string]: unknown;
	}
	export function bargs(options: OptionDefinitions, argv?: string[]): Result;
}
