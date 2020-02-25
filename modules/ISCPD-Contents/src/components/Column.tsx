import React, { Children } from "react";
import styled from "styled-components";

import Row from "./Row";

type Props = {
	size?: number;
	vPos?: "left" | "center" | "right";
	hPos?: "left" | "center" | "right";
} & React.HtmlHTMLAttributes<HTMLDivElement>;

export const Column = styled.div<Props>`
	border-right: 1px solid black;
	${({ size }) => `flex-basis: ${size ? `${size * 10}%` : 0};`}
	flex-shrink: 0;
	&:last-child {
		border-right: none;
	}
	${({ children }) =>
		Children.toArray(children).some(({ type }: React.ReactElement) => type === Row)
			? `
			flex-grow: 1;
			display: flex;
			flex-direction: column;
			& > ${Row} {
				flex-basis: 0;
				flex-grow: 1;
				flex-shrink: 0;
			}
			& > ${Row}:first-child {
				border-top: none;
			}
			`
			: null}
`;

const _BaseColumn = ({ className, children, ...props }: React.PropsWithChildren<Props>) => (
	<Column className={className} {...props}>
		<div>{children}</div>
	</Column>
);

export const TitleColumn = styled(_BaseColumn)<Props>`
	display: flex;
	text-align: center;
	justify-content: ${({ hPos }) =>
		hPos === "left" ? `flex-start` : hPos === "right" ? "flex-end" : "center"};
	align-items: ${({ vPos }) =>
		vPos === "left" ? `flex-start` : vPos === "right" ? "flex-end" : "center"};
`;

export const ValueColumn = styled(_BaseColumn)<Props>`
	max-height: -webkit-fill-available;
	white-space: pre-wrap;
	word-break: break-word;
	flex-grow: 1;
	display: flex;
	justify-content: ${({ hPos }) =>
		hPos === "center" ? "center" : hPos === "right" ? "flex-end" : "flex-start"};
	align-items: ${({ vPos }) =>
		vPos === "center" ? "center" : vPos === "right" ? "flex-end" : "flex-start"};
	${({ hPos }) =>
		hPos === "center" ? null : hPos === "right" ? `margin-right: 10px;` : `margin-left: 10px;`};
`;
