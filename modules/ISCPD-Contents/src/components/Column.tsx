import styled from "styled-components";

type Props = {
	type: "title" | "value";
};

const BaseColumn = styled.div<Props>`
	border-right: 1px solid black;
	flex: auto;
`;

const Column = styled(BaseColumn).attrs((props: Props) => {
	const textAlign = props.type === "title" ? "center" : "left";
	return { textAlign };
})`
	text-align: ${props => props.textAlign};
`;

export default Column;

// const TitleColumn = styled(props => <BaseColumn {...props} />)`
// 	text-align: "center";
// `;

// const ValueColumn = styled(props => <BaseColumn {...props} />)`
// 	text-align: "left";
// `;

// export { TitleColumn, ValueColumn };
