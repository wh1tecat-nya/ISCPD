import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import { TemplateContent } from "../molecules";

import { selectors } from "../../Store";

const {
	templatesSelectors: { getTemplateContents },
} = selectors;

type Props = {};

const TemplateListWrapper = styled.div<Props>`
	overflow-y: scroll;
`;

const TemplateList = (props: Props) => {
	const templateContents = useSelector(getTemplateContents);

	return (
		<TemplateListWrapper>
			{templateContents.map((templateContent, i) => (
				<TemplateContent
					key={i}
					name={templateContent.name}
					description={templateContent.description}
				/>
			))}
		</TemplateListWrapper>
	);
};

export default TemplateList;
