import { useState } from "react";
import {
	InitialForm,
	NestedBaseInitialForm,
	FormValue,
	FormHandlers,
	BaseInitialFormWithHandler,
} from "../types";

type HandleForms = [FormValue, FormHandlers];

const InputHandleCreator: (forms: Array<InitialForm>) => HandleForms = forms => {
	return forms.reduce<HandleForms>(
		([values, templates], formTemplate) => {
			const [value, handler] = useState();
			const { name, key } = formTemplate;

			if (isNestedForm(formTemplate)) {
				if (formTemplate.type === "Grouped") {
					const { type, forms, amount } = formTemplate;

					const retValue = { [key]: [] };
					const retHandler = { name, type, forms: [], amount };

					for (let i = 0; i < amount; i++) {
						const [nValues, nTemplates] = InputHandleCreator(forms);
						if (!isBaseTemplates(nTemplates)) {
							throw new Error("Nested templates are allowed only once.");
						}
						retValue[key].push(nValues);
						retHandler.forms.push(nTemplates);
					}

					return [{ ...values, ...retValue }, [...templates, retHandler]];
				}
				const { type, forms } = formTemplate;

				const [nValues, nTemplates] = InputHandleCreator(forms);
				if (!isBaseTemplates(nTemplates)) {
					throw new Error("Nested templates are allowed only once.");
				}

				const retValue = { [key]: nValues };
				const retHandler = { name, type, forms: nTemplates };

				return [{ ...values, ...retValue }, [...templates, retHandler]];
			}

			const { type, placeholder = null } = formTemplate;

			return [
				{ ...values, [key]: value },
				[...templates, { name, type, handler, placeholder }],
			];
		},
		[{}, []]
	);
};

export default InputHandleCreator;

// TypeGuards

function isNestedForm(formTemplate: InitialForm): formTemplate is NestedBaseInitialForm {
	return "name" in formTemplate && "forms" in formTemplate && "key" in formTemplate;
}

function isBaseTemplates(
	nestedTemplates: FormHandlers
): nestedTemplates is BaseInitialFormWithHandler[] {
	return nestedTemplates.every(
		template => "name" in template && "type" in template && "handler" in template
	);
}
