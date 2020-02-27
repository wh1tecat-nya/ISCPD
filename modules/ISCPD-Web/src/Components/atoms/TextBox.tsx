import React from "react";
import styled from "styled-components";
import { Input } from "antd";
import { TextAreaProps as AreaProps, InputProps } from "antd/lib/input";

const { TextArea: Area } = Input;

type TextBoxProps = InputProps & {
	placeholder: string;
};

type TextAreaProps = AreaProps & {
	placeholder: string;
};

export const TextBox = styled(Input)<TextBoxProps>`
	> input {
		border-radius: 5px;
	}
`;

export const TextArea = styled(Area)<TextAreaProps>`
	> input {
		border-radius: 5px;
	}
`;
