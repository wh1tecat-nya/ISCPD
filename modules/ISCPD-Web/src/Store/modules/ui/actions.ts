import { actionCreatorFactory } from "typescript-fsa";

const actionCreator = actionCreatorFactory("ui");

export const toggleShowTemplateList = actionCreator("TOGGLE_SHOW_TEMPLATE_LIST");
