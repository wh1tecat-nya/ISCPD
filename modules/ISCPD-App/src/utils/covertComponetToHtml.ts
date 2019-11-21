// import * as React from "react";
import { ReactElement } from "react";
import { renderToString } from "react-dom/server";

export default function convertComponentToHtml(jsx: ReactElement): string {
	const body = renderToString(jsx);
	return `
	<!DOCTYPE html>
	<html>

	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		

		<title>paper css test</title>
	</head>

	<body class="A4">
		<section className="sheet padding-25mm">
			${body}
		</section>
	</body>
	</html>
	`.trim();
}
