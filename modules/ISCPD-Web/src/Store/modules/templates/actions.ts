import { actionCreatorFactory } from "typescript-fsa";
import { asyncFactory } from "typescript-fsa-redux-thunk";

import { State, Template } from "../../../Types";

const actionCreator = actionCreatorFactory("templates");
const thunkCreator = asyncFactory<State>(actionCreator);

type AddTemplatePayload = {
	name: string;
	data: Template;
};

type InitTemplatePayload = {};

export const addTemplate = actionCreator<AddTemplatePayload>("ADD_TEMPLATE");

export const initTemplates = thunkCreator<InitTemplatePayload, null>(
	"INIT_TEMPLATE",
	async () => {}
);
