import React from "react";
import convertComponentToHtml from "./covertComponetToHtml";

import { OfficialAbsence } from "ISCPD-Contents";

export function wrapper() {
	console.log(OfficialAbsence);
	const jsx = (
		<>
			<h2>hoge</h2>
			{/* <OfficialAbsence /> */}
		</>
	);
	const html = convertComponentToHtml(jsx);
	return html;
}
