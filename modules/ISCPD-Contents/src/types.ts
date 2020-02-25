export type FormType = "Text" | "TextArea" | "Date" | "Image";

export type NestedFormType = "DateRange" | "Grouped";

type Key = {
	key: string;
};

type BaseNestedInitialForm<T, FT = NestedFormType> = {
	name: string;
	type: FT;
	forms: T[];
};

type NestedInitialForm<T, FT> = FT extends "Grouped"
	? BaseNestedInitialForm<T, FT> & { amount: number }
	: FT extends NestedFormType
	? BaseNestedInitialForm<T, FT>
	: never;

type BaseInitialForm = {
	name: string;
	type: FormType;
	placeholder?: string;
};

type BaseInitialFormWithKey = BaseInitialForm & Key;

export type BaseInitialFormWithHandler = BaseInitialForm & {
	handler: React.Dispatch<any>;
};

export type NestedBaseInitialFormWithHandler<FT = NestedFormType> = FT extends "Grouped"
	? {
			forms: Array<Array<BaseInitialFormWithHandler>>;
	  } & NestedInitialForm<BaseInitialFormWithHandler, FT>
	: NestedInitialForm<BaseInitialFormWithHandler, FT>;

export type NestedBaseInitialForm<FT = NestedFormType> = NestedInitialForm<
	BaseInitialForm & Key,
	FT
> &
	Key;

export type InitialForm<FT = NestedFormType> = BaseInitialFormWithKey | NestedBaseInitialForm<FT>;

export type InitialForms = Array<InitialForm>;

export type FormValue = {
	[key: string]: any | { [nestKey: string]: any };
};

export type FormHandler<FT = NestedFormType> =
	| BaseInitialFormWithHandler
	| NestedBaseInitialFormWithHandler<FT>;

export type FormHandlers<FT = NestedFormType> = Array<FormHandler<FT>>;

export type TemplateProps = {
	handleManager: (value: { forms: FormHandlers }) => void;
	pref: React.Ref<HTMLDivElement>;
};

export type Template = {
	description: string;
	size: "A4" | "A5" | "B4" | "B5";
	component: (props: TemplateProps, ref: any) => JSX.Element;
};
