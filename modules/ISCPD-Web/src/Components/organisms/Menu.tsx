import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "../atoms";

import { actions } from "../../Store";

const {
	uiActions: { toggleShowTemplateList },
	printActions: { printInputTemplate: printAction },
} = actions;

const MenuWrapper = styled.div`
	flex-basis: 10%;
	flex-shrink: 0;
	align-self: stretch;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-around;
	padding: 20px 10px;
	border-top: 1px solid black;
`;

type Props = {};

const Menu = () => {
	const dispatch = useDispatch();
	const toggleTemplateList = () => dispatch(toggleShowTemplateList());
	const print = () => dispatch(printAction());

	return (
		<MenuWrapper>
			<Button width="40%" buttontype="large" onClick={toggleTemplateList}>
				Templates
			</Button>
			<Button width="40%" buttontype="large" onClick={print}>
				Print
			</Button>
		</MenuWrapper>
	);
};

export default Menu;
