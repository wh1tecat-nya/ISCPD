import React from "react";
import styled from "styled-components";

import Header from "./Header";
import Row from "./Row";
import { TitleColumn } from "./Column";

type InnerProps = {
	row: number;
	titleColor?: string;
} & React.HtmlHTMLAttributes<HTMLDivElement>;

const InnerContents = styled.div<InnerProps>`
	height: 100%;
	display: flex;
	flex-direction: column;
	border: 1px solid black;

	${({ titleColor }) =>
		titleColor
			? `
		& ${TitleColumn} {
			background-color: ${titleColor};
		}`
			: null}

	& > ${Row}, & > ${Header} {
		flex-basis: auto;
		flex-grow: ${({ row }) => 1 / row};
		flex-shrink: 0;
	}
`;

type Props = InnerProps & {
	top?: number;
	right?: number;
	left?: number;
	bottom?: number;
};

const _Contents = React.forwardRef(
	(
		{ className, children, ...props }: React.PropsWithChildren<Props>,
		ref: React.Ref<HTMLDivElement>
	) => (
		<div id="template" className={className} ref={ref}>
			<InnerContents {...props}>{children}</InnerContents>
		</div>
	)
);

const Contents = styled(_Contents)`
	width: -webkit-fill-available;
	height: 100%;
	box-sizing: border-box;
	font-size: 16px;
	${({ top = 5, right = 5, left = 5, bottom = 5 }) => `
		padding-top: ${top}%;
		padding-right: ${right}%;
		padding-left: ${left}%;
		padding-bottom: ${bottom}%;
	`}
`;

export default Contents;
