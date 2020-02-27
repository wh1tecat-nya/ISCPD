type PrintSize = "A4" | "A5" | "B4" | "B5";

type Params = {
	contents: any;
	printSize: PrintSize;
	title?: string;
	css?: string | string[];
	style?: string | string[];
};

const PRINT_ID = "printcontent";

const craeteLinkTag = (cssUrls: string | string[]) => {
	if (Array.isArray(cssUrls)) {
		return cssUrls.map(url => `<link rel="stylesheet" href="${url}" >`).join("\n");
	}

	return `<link rel="stylesheet" href="${cssUrls}" >`;
};

const createStyleElement = (styles: string | string[]) => {
	if (Array.isArray(styles)) {
		return styles.map(styleText => {
			const styleElement = document.createElement("style");
			styleElement.innerHTML = styleText;
			return styleElement;
		});
	}
	const styleElement = document.createElement("style");
	styleElement.innerHTML = styles;
	return styleElement;
};

const createPrintFrame = (title, size, css) => {
	const printFrame = document.createElement("iframe");
	printFrame.setAttribute(
		"style",
		"visibility: hidden; height: 0; width: 0; position: absolute;"
	);
	printFrame.setAttribute("id", PRINT_ID);

	printFrame.srcdoc = `
	<html>
		<head>
			<title>${title}</title>
			${css ? craeteLinkTag(css) : null}
		</head>
		<body class="${size}" >
		</body>
	</html>
	`;

	return printFrame;
};

export const print = (params: Params) => {
	const { contents, printSize, title = "document", css = null, style = null } = params;

	const usedFrame = document.getElementById(PRINT_ID);
	if (usedFrame) usedFrame.parentNode.removeChild(usedFrame);

	const printFrame = createPrintFrame(title, printSize, css);

	document.getElementsByTagName("body")[0].appendChild(printFrame);

	const printFrameElement = document.getElementById(PRINT_ID) as HTMLFrameElement;

	printFrameElement.onload = () => {
		const printDocumnet =
			printFrameElement.contentWindow.document || printFrameElement.contentDocument;
		printDocumnet.body.innerHTML = contents;

		if (style) {
			if (Array.isArray(style)) {
				const styleElements = createStyleElement(style) as HTMLStyleElement[];
				styleElements.forEach(styleElement => printDocumnet.head.appendChild(styleElement));
			} else {
				const styleElement = createStyleElement(style) as HTMLStyleElement;
				printDocumnet.head.appendChild(styleElement);
			}
		}

		// TODO: impl image loading

		printFrameElement.focus();
		printFrameElement.contentWindow.print();
	};
};
