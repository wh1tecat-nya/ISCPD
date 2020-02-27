import { Reducer } from "redux";
import { isType } from "typescript-fsa";
import { UI } from "../../../Types";

import { toggleShowTemplateList } from "./actions";

const initialState: UI = {
	isShowTemplateList: false,
};

const reducer: Reducer<UI> = (state = initialState, action) => {
	if (isType(action, toggleShowTemplateList)) {
		const newStatus = !state.isShowTemplateList;
		return {
			...state,
			isShowTemplateList: newStatus,
		};
	}

	return state;
};

export default reducer;
