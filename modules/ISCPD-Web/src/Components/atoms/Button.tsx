import styled from "styled-components";
import AntButton, { ButtonProps } from "antd/lib/button/button";

type Props = ButtonProps & {
	buttontype?: "default" | "small" | "large";
	width?: string;
};

type StyleProps = {
	height: string;
	fontSize: string;
};

const Button = styled(AntButton).attrs<Props, Props & StyleProps>(props => {
	let height: string, fontSize: string;
	const { buttontype, width = "auto" } = props;

	switch (buttontype) {
		case "small":
			height = "20px";
			fontSize = "10px";
			break;
		case "large":
			height = "60px";
			fontSize = "18px";
			break;
		default:
			height = "40px";
			fontSize = "14px";
			break;
	}
	return { height, width, fontSize };
})<Props>`
	height: ${({ height }) => height};
	width: ${({ width }) => width};
	font-size: ${({ fontSize }) => fontSize};
`;

export default Button;
