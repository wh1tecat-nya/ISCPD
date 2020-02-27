import React from "react";
import styled from "styled-components";
import { renderToString } from "react-dom/server";

export const generate = (template: any) => {
	const jsx = (
		<div className="sheet" style={{ margin: "0 auto", boxSizing: "border-box" }}>
			<div
				style={{ height: "100%", width: "100%" }}
				dangerouslySetInnerHTML={{ __html: template.innerHTML }}
			/>
		</div>
	);

	const body = renderToString(jsx);

	return body;
};
