import { Children } from "react";
import styled from "styled-components";

import { TitleColumn } from "./Column";

type Props = {
	size?: number;
};

const Row = styled.div<Props>`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	border-top: 1px solid black;

	${({ size }) =>
		size
			? `
			&&& {
				flex-basis: ${size * 10}%
			}`
			: null}

	${({ children }) =>
		Children.toArray(children).some(({ props: { children: gc } }: React.ReactElement) =>
			Children.toArray(gc).some(({ type }: React.ReactElement) => type === Row)
		)
			? `
				&&& {
					overflow-y: visible;
					flex-basis: 0;
					flex-grow: 1;
					flex-shrink: 0;
				}
			`
			: "overflow-y: hidden;"}

	${({ children }) =>
		Children.toArray(children).every(({ type }: React.ReactElement) => type === TitleColumn)
			? `
			& > div {
				height: 100%;
				flex-grow: 1;
			}
			`
			: null}
`;

export default Row;
