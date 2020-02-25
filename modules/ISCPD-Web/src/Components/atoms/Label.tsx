import React from "react";
import styled from "styled-components";

type Props = {
	customtype?: "default" | "small" | "large" | "title";
	colortype?: string;
};

type StyleProps = {
	fontSize: string;
};

const Label = styled.div.attrs<Props, Props & StyleProps>(props => {
	let fontSize: string;

	switch (props.customtype) {
		case "small":
			fontSize = "10px";
			break;
		case "large":
			fontSize = "18px";
			break;
		case "title":
			fontSize = "3vw";
			break;
		default:
			fontSize = "14px";
			break;
	}
	return { fontSize };
})<Props>`
	font-size: ${({ fontSize }) => fontSize};
`;

export default Label;
