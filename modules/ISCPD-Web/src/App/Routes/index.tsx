import React, { useEffect } from "react";
import { Switch, Route } from "react-router";
import { useDispatch } from "react-redux";

import * as templates from "ISCPD-Contents";

import { MainPage } from "../../Components/page";
import { actions } from "../../Store";

type Props = {};

const Routes = (props: Props) => {
	const dispatch = useDispatch();
	useEffect(() => {
		for (const [templateName, template] of Object.entries(templates)) {
			const { description, size, component: templateComponent } = template;

			dispatch(
				actions.templatesActions.addTemplate({
					name: templateName,
					data: {
						description,
						component: templateComponent,
						size,
					},
				})
			);
		}
	}, []);

	return (
		<Switch>
			<Route exact path="/" component={MainPage} />
		</Switch>
	);
};

export default Routes;
