import React, { useEffect, useRef } from "react";
import styled, { ServerStyleSheet, StyleSheetManager } from "styled-components";
import { hydrate, findDOMNode } from "react-dom";
import { renderToString } from "react-dom/server";
import { useDispatch, useSelector } from "react-redux";
import paperSize from "paper-size";

import { actions, selectors } from "../../Store";

import { ReturnPayloadType } from "../../Types";

const {
	printActions: { setTemplateForm, setTemplateInstance },
} = actions;

const {
	templatesSelectors: { TemplateSelector, getTemplateSize },
	printSelectors: { getSelectTemplateName },
} = selectors;

const PreviewWrapper = styled.div`
	position: relative;
	overflow: hidden;
	height: 100%;
	width: 100%;
	box-sizing: border-box;
	padding: 20px;
	border-top: 1px solid black;
	background-color: #f0f0f0;
`;

type WrapperProps = {
	height: number;
	width: number;
};

type WrapperStyleProps = {
	aspect: number;
};

const PreviewFrame = styled.div.attrs<WrapperProps, WrapperStyleProps>(({ width, height }) => {
	let aspect;
	if (width > height) {
		aspect = height / width;
	} else {
		aspect = width / height;
	}
	return { aspect };
})<WrapperProps>`
	width: 100%;
	height: 100vw;
	max-width: calc((100vh * 0.9 - 41px) * ${({ aspect }) => aspect});
	max-height: 100%;
	margin: 0 auto;
	box-sizing: border-box;
	border: 1px solid gray;
	background-color: white;
`;

type SetTemplateFormPayload = ReturnPayloadType<typeof setTemplateForm>;
type SetTemplateInstancePayload = ReturnPayloadType<typeof setTemplateInstance>;

// const sheet = new ServerStyleSheet();

type Props = {};

const PreviewContent = (props: Props) => {
	const templateRef = useRef(null);
	const dispatch = useDispatch();
	const dispatchSetTemplateForm = (forms: SetTemplateFormPayload) =>
		dispatch(setTemplateForm(forms));
	const dispatchSetTemplateInstance = (template: SetTemplateInstancePayload) =>
		dispatch(setTemplateInstance(template));
	const templateName = useSelector(getSelectTemplateName) ?? null;
	const templateSize = useSelector(getTemplateSize)[templateName] ?? "A4";
	const TemplateComponent = useSelector(TemplateSelector)[templateName]?.component ?? null;

	const TemplateInstance = React.forwardRef((props: any, ref: React.Ref<HTMLDivElement>) =>
		templateName && TemplateComponent ? (
			<TemplateComponent handleManager={dispatchSetTemplateForm} pref={ref} />
		) : (
			<div ref={ref}>{"nothing :P"}</div>
		)
	);

	// const TemplateInstance = () =>
	// 	templateName && TemplateComponent ? (
	// 		<TemplateComponent handleManager={dispatchSetTemplateForm} pref={templateRef} />
	// 	) : (
	// 		<>{"nothing :P"}</>
	// 	);

	// const TemplateInstance = props =>
	// 	sheet.collectStyles(
	// 		templateName && TemplateComponent ? (
	// 			<TemplateComponent handleManager={dispatchSetTemplateForm} pref={templateRef} />
	// 		) : (
	// 			<>{"nothing :P"}</>
	// 		)
	// 	);

	// return sheet.collectStyles(
	// 	<ConvertToCss
	// 		outputClassName="preview"
	// 		component={() =>
	// 			templateName && TemplateComponent ? (
	// 				<TemplateComponent handleManager={dispatchSetTemplateForm} />
	// 			) : (
	// 				<>{"nothing :P"}</>
	// 			)
	// 		}
	// 	/>
	// );

	// const staticHtml = renderToString(<TemplateInstance />);
	// const hoge = hydrate(
	// 	<>
	// 		<TemplateInstance />
	// 	</>,
	// 	PreviewFrame
	// );
	// console.log(sheet.getStyleTags());

	useEffect(() => {
		dispatchSetTemplateInstance({ template: templateRef.current });
	}, [TemplateInstance]);

	const [baseWidth, baseHeight] = paperSize.getSize(templateSize, {
		unit: "mm",
	});

	return (
		<PreviewWrapper>
			<PreviewFrame height={baseHeight} width={baseWidth}>
				<TemplateInstance ref={templateRef} />
			</PreviewFrame>
		</PreviewWrapper>
	);
};

export default PreviewContent;

// const getStyleSheetPropertyValue = (selectorText: string) => {
// 	const docStyles = document.styleSheets;
// 	for (let i = 0; i <= docStyles.length; i++) {
// 		const docStyle = docStyles[i] as CSSStyleSheet;
// 		if (docStyle?.rules) {
// 			const cssRules = docStyle.rules;
// 			for (let j = 0; j < cssRules.length; j++) {
// 				const cssRule = cssRules[j] as CSSStyleRule;
// 				if (cssRule.selectorText === selectorText) {
// 					console.log("find");
// 					return cssRule.style.cssText;
// 				}
// 			}
// 		}
// 	}
// 	return null;
// };

// const getStyleValues = (Component: React.ReactInstance) => {
// 	// eslint-disable-next-line
// 	const element = findDOMNode(Component) as Element;
// 	if (!element?.classList) {
// 		return null;
// 	}

// 	// @ts-ignore
// 	const classNames = element.classList ? [...element.classList] : [];
// 	const styles = classNames.map(cn => getStyleSheetPropertyValue(`.${cn}`));
// 	console.log(styles);
// };
