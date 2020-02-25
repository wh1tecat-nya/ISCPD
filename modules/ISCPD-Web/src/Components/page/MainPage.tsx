import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import { TemplateHeader, PreviewContent, TemplateList, InputFormList, Menu } from "../organisms";

import { selectors } from "../../Store";

const {
	uiSelectors: { getListContentStatus },
} = selectors;

const PageWrapper = styled.div`
	height: 100vh;
	width: 100vw;
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
`;

const PreviewWrapper = styled.div`
	align-self: stretch;
	flex-grow: 1;
	display: flex;
	flex-direction: column;
`;

const FormWrapper = styled.div<{ active: boolean }>`
	border-left: 1px solid black;
	align-self: stretch;
	flex-basis: 25%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	background-color: #f0f0f0;
	${({ active }) =>
		active
			? `& > div:nth-child(1) {
				display: none;
				}`
			: `& > div:nth-child(2) {
				display: none;
				}`}
`;

const MainPage = () => {
	const listContentStatus = useSelector(getListContentStatus);

	return (
		<PageWrapper>
			<PreviewWrapper>
				<TemplateHeader />
				<PreviewContent />
			</PreviewWrapper>
			<FormWrapper active={listContentStatus}>
				<InputFormList />
				<TemplateList />
				<Menu />
			</FormWrapper>
		</PageWrapper>
	);
};

export default MainPage;
