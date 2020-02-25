import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import { Label } from "../atoms";
import { selectors } from "../../Store";

const {
	printSelectors: { getSelectTemplateName },
} = selectors;

const TemplateHeaderWrapper = styled.div`
	flex-basis: 10%;
	flex-shrink: 0;
	display: flex;
	align-items: center;
	justify-content: left;
	padding: 0 20px 0 60px;
	background-color: #e5e5e5;
`;

type Props = {};

const TemplateHeader = (props: Props) => {
	const templateName = useSelector(getSelectTemplateName);

	return (
		<TemplateHeaderWrapper>
			<Label customtype="title">{templateName}</Label>
		</TemplateHeaderWrapper>
	);
};

export default TemplateHeader;
