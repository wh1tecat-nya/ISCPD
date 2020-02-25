import React from "react";
import styled from "styled-components";
import { Card, Icon } from "antd";
import { useDispatch } from "react-redux";

import { actions } from "../../Store";

const {
	uiActions: { toggleShowTemplateList },
	printActions: { selectTemplate },
} = actions;

const { Meta } = Card;

type Props = {
	name: string;
	description: string;
};

const TemplateContent = (props: Props) => {
	const dispatch = useDispatch();
	const templateSelect = (templateName: string) => dispatch(selectTemplate({ templateName }));
	const toggleTemplateList = () => dispatch(toggleShowTemplateList());

	const { name, description } = props;
	return (
		<Card
			size="small"
			actions={[
				<Icon
					type="check"
					key="check"
					onClick={() => {
						toggleTemplateList();
						templateSelect(name);
					}}
				/>,
			]}
		>
			<Meta title={name} description={description} />
		</Card>
	);
};

export default TemplateContent;
