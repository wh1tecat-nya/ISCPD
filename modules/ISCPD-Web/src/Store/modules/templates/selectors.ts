import { createSelector, createSelectorCreator } from "reselect";

import { State, Templates } from "../../../Types";

export const TemplateSelector: (state: State) => Templates = (state: State) => state.templates;

export const getTemplateContents = createSelector(TemplateSelector, templates =>
	Object.entries(templates).map(([name, template]) => ({
		name,
		description: template.description,
	}))
);

export const getTemplateSize = createSelector(TemplateSelector, templates =>
	Object.fromEntries(Object.entries(templates).map(([name, template]) => [name, template.size]))
);
