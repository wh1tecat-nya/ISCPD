import React, { useCallback } from "react";
import styled from "styled-components";
import { Card } from "antd";

import { TextBox, TextArea } from "../atoms";
import { selectors } from "../../Store";

const FormWrapper = styled.div`
	display: flex;
	border-bottom: 1px solid #cccccc;
	.ant-card {
		width: 100%;
	}
	.ant-card-head {
		background-color: #e5e5e5;
		border-bottom: 1px solid #e0e0e0;
	}
	.ant-card-body {
		background-color: #f0f0f0;
	}
`;

type Props = {
	title: string;
	formtype: "Text" | "TextArea";
	placeholder: string;
	handler: React.Dispatch<React.SetStateAction<any>>;
};

const InputTextForm = (props: Props) => {
	const handler = useCallback(e => props.handler(e.target.value), [props]);

	return (
		<FormWrapper>
			<Card size="small" title={props.title} bordered={false}>
				{props.formtype === "Text" ? (
					<TextBox allowClear placeholder={props.placeholder} onChange={handler} />
				) : (
					<TextArea
						allowClear
						autoSize={{ minRows: 2, maxRows: 4 }}
						placeholder={props.placeholder}
						onChange={handler}
					/>
				)}
			</Card>
		</FormWrapper>
	);
};

export default InputTextForm;
