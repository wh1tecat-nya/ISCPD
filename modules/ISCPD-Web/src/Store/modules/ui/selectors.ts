import { createSelector } from "reselect";

import { State } from "../../../Types";

const uiSelector = (state: State) => state.ui;

export const getListContentStatus = createSelector(
	uiSelector,
	({ isShowTemplateList }) => isShowTemplateList
);
