import React from "react";
import styled from "styled-components";

type Prop = {
	color?: string;
} & React.HtmlHTMLAttributes<HTMLDivElement>;

const _Header = ({ className, children }: Prop) => (
	<div className={className}>
		<div>{children}</div>
	</div>
);

const Header = styled(_Header)`
	text-align: center;
	display: flex;
	justify-content: center;
	align-items: center;
	${({ color }) => (color ? `background-color: ${color};` : null)}
`;

export default Header;
