import { combineReducers } from "redux";
import { History } from "history";
import { connectRouter } from "connected-react-router";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { State } from "../../Types";

import { uiReducer, uiActions, uiSelectors } from "./ui";
import { templatesReducer, templatesActions, templatesSelectors } from "./templates";
import { printReducer, printActions, printSelectors } from "./print";

export const createReducers = (history: History) => {
	return combineReducers<State>({
		router: connectRouter(history),
		ui: uiReducer,
		templates: templatesReducer,
		print: persistReducer(
			{
				key: "print",
				blacklist: ["forms", "template"],
				storage,
			},
			printReducer
		),
	});
};

export const actions = { uiActions, templatesActions, printActions };
export const selectors = { uiSelectors, templatesSelectors, printSelectors };
