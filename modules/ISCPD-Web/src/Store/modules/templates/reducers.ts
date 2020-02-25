import { Reducer } from "redux";
import { isType } from "typescript-fsa";
import {} from "typescript-fsa-redux-thunk";
import { Templates } from "../../../Types";

import { addTemplate } from "./actions";

const initialState: Templates = {};

const reducer: Reducer<Templates> = (state = initialState, action) => {
	if (isType(action, addTemplate)) {
		const { name: templateName, data: templateData } = action.payload;
		return {
			...state,
			[templateName]: templateData,
		};
	}

	return state;
};

export default reducer;
