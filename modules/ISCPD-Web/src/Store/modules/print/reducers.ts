import { Reducer } from "redux";
import { isType } from "typescript-fsa";
import { Print } from "../../../Types";

import { selectTemplate, setTemplateForm, setTemplateInstance } from "./actions";

const initialState: Print = {
	templateName: "",
	forms: [],
	template: null,
};

const reducer: Reducer<Print> = (state = initialState, action) => {
	if (isType(action, selectTemplate.async.started)) {
		const { templateName } = action.payload;
		return {
			...state,
			templateName,
		};
	}
	if (isType(action, setTemplateForm)) {
		const { forms } = action.payload;
		return {
			...state,
			forms,
		};
	}
	if (isType(action, setTemplateInstance)) {
		const { template } = action.payload;
		return {
			...state,
			template,
		};
	}

	return state;
};

export default reducer;
