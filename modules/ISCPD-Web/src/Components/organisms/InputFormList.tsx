import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Collapse, Tabs } from "antd";
import "moment/locale/ja";

import { InputTextForm, InputDateForm } from "../molecules";
import { selectors } from "../../Store";

import {
	FormHandler,
	BaseInitialFormWithHandler,
	NestedBaseInitialFormWithHandler,
} from "../../Types";

const { Panel } = Collapse;
const { TabPane } = Tabs;

const {
	printSelectors: { getSelectTemplateForms },
} = selectors;

type Props = {};

const InputFormListWrapper = styled.div<Props>`
	overflow-y: scroll;
	.ant-collapse,
	.ant-collapse-item,
	.ant-collapse-header {
		border: 0;
		border-radius: 0;
	}
	.ant-collapse {
		background-color: #e5e5e5;
	}
	.ant-collapse-item > .ant-collapse-content,
	.ant-collapse .ant-collapse {
		background-color: #f0f0f0;
		border-radius: 0;
	}
	.ant-collapse-content .ant-collapse-item > .ant-collapse-content,
	.ant-collapse-content .ant-collapse-item > .ant-collapse-content .ant-card-body {
		background-color: #fafafa;
	}
	.ant-collapse-header,
	.ant-collapse-content {
		border-bottom: 1px solid #cccccc;
	}
	.ant-collapse-content-box
		.ant-collapse-item:last-child:not(.ant-collapse-item-active)
		> .ant-collapse-header,
	.ant-collapse-content-box .ant-collapse-item:last-child > .ant-collapse-content {
		border-bottom: 0;
	}

	.ant-collapse-content-box > div > .ant-card > .ant-card-head {
		display: none;
	}
	.ant-collapse-content-box {
		padding: 0 0 0 10px;
	}
	.ant-collapse-content-box > div {
		border: 0;
	}
	.ant-tabs-bar {
		display: grid;
	}
`;

const formMapper = (form: BaseInitialFormWithHandler, index: number) => {
	const randomKey = Math.random()
		.toString(32)
		.substring(2);

	if (form.type === "Text" || form.type === "TextArea") {
		return (
			<InputTextForm
				title={form.name}
				formtype={form.type}
				placeholder={form.placeholder ?? ""}
				handler={form.handler}
				key={`${randomKey}-${index}`}
			/>
		);
	}
	if (form.type === "Date") {
		return (
			<InputDateForm
				title={form.name}
				formtype={form.type}
				placeholder={form.placeholder ?? ""}
				handler={form.handler}
				key={`${randomKey}-${index}`}
			/>
		);
	}
	return <></>;
};

const InputFormList = React.memo((props: Props) => {
	const forms = useSelector(getSelectTemplateForms) ?? [];

	return (
		<InputFormListWrapper>
			{forms.map((form, i) => {
				if (isBaseTemplates(form)) {
					return formMapper(form, i);
				} else {
					return (
						<Collapse key={i} bordered={false}>
							<Panel key={i} header={form.name}>
								{isGroupedForm(form) ? (
									<Tabs tabPosition="top" animated={false}>
										{form.forms.map((nForm, nI) => (
											<TabPane tab={nI} key={`${i}-${nI}`}>
												{nForm.map(formMapper)}
											</TabPane>
										))}
									</Tabs>
								) : (
									<Collapse bordered={false}>
										{form.forms.map((nForm, nI) => (
											<Panel key={`${i}-${nI}`} header={nForm.name}>
												{formMapper(nForm, nI)}
											</Panel>
										))}
									</Collapse>
								)}
							</Panel>
						</Collapse>
					);
				}
			})}
		</InputFormListWrapper>
	);
});

function isBaseTemplates(template: FormHandler): template is BaseInitialFormWithHandler {
	return "name" in template && "type" in template && "handler" in template;
}

function isGroupedForm(
	forms: NestedBaseInitialFormWithHandler
): forms is NestedBaseInitialFormWithHandler<"Grouped"> {
	return "name" in forms && "type" in forms && "forms" in forms && "amount" in forms;
}

export default InputFormList;
