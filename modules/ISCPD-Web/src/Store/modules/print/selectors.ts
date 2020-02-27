import { createSelector } from "reselect";

import { State } from "../../../Types";

export const PrintSelector = (state: State) => state.print;

export const getSelectTemplateName = createSelector(
	PrintSelector,
	({ templateName }) => templateName
);

export const getSelectTemplateForms = createSelector(PrintSelector, ({ forms = [] }) => forms);
