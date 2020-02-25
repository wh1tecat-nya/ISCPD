import React, { useCallback } from "react";
import styled from "styled-components";
import { Card, DatePicker } from "antd";
import { useSelector } from "react-redux";
import { DatePickerProps, RangePickerProps } from "antd/lib/date-picker/interface";
import locale from "antd/lib/date-picker/locale/ja_JP";

import { selectors } from "../../Store";

const { RangePicker } = DatePicker;

const {
	printSelectors: { getSelectTemplateName },
} = selectors;

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

const PickerWrapper = styled.div`
	.ant-calendar-picker {
		width: 100%;
	}
	.ant-calender-picker-input {
		border-radius: 5px;
	}
`;

type Props = {
	title: string;
	formtype: "Date"; // TODO RangePicker
	placeholder: string;
	handler: React.Dispatch<React.SetStateAction<any>>;
};

const InputDateForm = (props: Props) => {
	const handler = useCallback((_, date) => props.handler(date), [props]);

	return (
		<FormWrapper>
			<Card size="small" title={props.title} bordered={false}>
				{props.formtype === "Date" ? (
					<PickerWrapper>
						<DatePicker
							placeholder={props.placeholder}
							locale={locale}
							format={"YYYY年MM月DD日(ddd)"}
							onChange={handler}
						/>
					</PickerWrapper>
				) : (
					<></> // TODO RangePicker
				)}
			</Card>
		</FormWrapper>
	);
};

export default InputDateForm;
