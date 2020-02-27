import { actionCreatorFactory } from "typescript-fsa";
import { asyncFactory } from "typescript-fsa-redux-thunk";

import { generate, print } from "../../../Utils";
import { State, FormHandlers } from "../../../Types";

const actionCreator = actionCreatorFactory("print");
const thunkCreator = asyncFactory<State>(actionCreator);

type SelectTemplatePayload = {
	templateName: string;
};

type SetTemplateFormPayload = {
	forms: FormHandlers;
};

type SetTemplateInstancePayload = {
	template: any;
};

type RenderPreviewPayload = {
	name: string;
	formValues: Object;
};

type PrintInputPayload = {};

export const selectTemplate = thunkCreator<SelectTemplatePayload, null>(
	"SELECT_TEMPLATE",
	async (payload, dispatch, getState) => {
		// const templates = TemplateSelector(getState());
		// dispatch(
		// 	rerenderPreview({
		// 		templateName: payload.name,
		// 		forms: templates[payload.name].forms,
		// 	})
		// );
		// TODO: get and set TemplateData from template name in payload;
	}
);

export const setTemplateForm = actionCreator<SetTemplateFormPayload>("SET_TEMPLATE_FORM");

export const setTemplateInstance = actionCreator<SetTemplateInstancePayload>(
	"SET_TEMPLATE_INSTANCE"
);

export const rerenderPreview = thunkCreator<RenderPreviewPayload, null>(
	"RERENDER_PREVIEW",
	async (payload, dispatch) => {}
);

export const printInputTemplate = thunkCreator<PrintInputPayload, null>(
	"PRINT_INPUT_TEMPLATE",
	async (paylaod, dispatch, getState) => {
		const {
			print: { templateName, template },
			templates,
		} = getState();
		const printSize = templates[templateName].size;
		const styleTags = Array.from(document.getElementsByTagName("style"));
		const styleTagTexts = styleTags.map(el => el.innerHTML);

		const printString = generate(template.parentElement);

		print({
			printSize,
			title: templateName,
			css: "https://unpkg.com/paper-css@0.4.1/paper.min.css",
			style: styleTagTexts,
			contents: printString,
		});
	}
);
