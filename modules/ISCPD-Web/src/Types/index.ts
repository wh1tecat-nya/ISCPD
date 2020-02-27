import React from "react";
import { RouterState } from "connected-react-router";
import { ActionCreator } from "typescript-fsa";

import {
	FormType,
	NestedFormType,
	FormHandler,
	FormHandlers,
	BaseInitialFormWithHandler,
	NestedBaseInitialFormWithHandler,
	Template,
} from "ISCPD-Contents";

export {
	FormType,
	NestedFormType,
	FormHandler,
	FormHandlers,
	BaseInitialFormWithHandler,
	NestedBaseInitialFormWithHandler,
	Template,
};

export type ReturnPayloadType<T> = T extends ActionCreator<infer K> ? K : never;

export type State = {
	router: RouterState;
	ui: UI;
	templates: Templates;
	print: Print;
};

export type UI = {
	isShowTemplateList: boolean;
};

export type Templates = {
	[templateName: string]: Template;
};

export type Print = {
	templateName: string;
	forms: FormHandlers;
	template: any;
};
