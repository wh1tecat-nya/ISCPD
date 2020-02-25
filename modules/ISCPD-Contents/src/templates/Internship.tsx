import React, { useEffect } from "react";

import { Header, Contents, Row, Column, TitleColumn, ValueColumn } from "../components";
import { Template, InitialForms, TemplateProps } from "../types";

import useInputHandleCreator from "../handler/InputHandleCreator";

const formsTemplates: InitialForms = [
	{ name: "クラス", key: "schoolClass", type: "Text", placeholder: "hoge" },
	{
		name: "出席番号",
		key: "classNumber",
		type: "Text",
	},
	{ name: "氏名", key: "personName", type: "Text" },
	{ name: "記入日", key: "inputDate", type: "Date" },
	{
		name: "参加予定期間",
		key: "participationDate",
		type: "DateRange",
		forms: [
			{ name: "参加開始日", key: "startDate", type: "Date" },
			{ name: "参加終了日", key: "endDate", type: "Date" },
		],
	},
	{ name: "企業名", key: "companyName", type: "Text" },
	{ name: "担当者", key: "personInCharge", type: "TextArea" },
	{ name: "最寄り駅", key: "nearStation", type: "Text" },
	{ name: "時給", key: "hourlyPay", type: "Text" },
	{ name: "何で知ったか", key: "howDidKnow", type: "Text" },
	{ name: "内容", key: "jobInfo", type: "TextArea" },
	{ name: "参加理由・同期", key: "joinReason", type: "TextArea" },
	{
		name: "出席出来ない授業",
		key: "restSubjects",
		type: "Grouped",
		amount: 8,
		forms: [
			{
				name: "曜日",
				key: "dayOfTheWeek",
				type: "Date",
			},
			{
				name: "時限",
				key: "subjectTime",
				type: "Text",
			},
			{
				name: "科目名",
				key: "subjectName",
				type: "Text",
			},
		],
	},
];

export const Internship: Template = {
	description: "インターンシップ申請書",
	size: "A4",
	component: (props: TemplateProps) => {
		const { handleManager } = props;
		const [values, forms] = useInputHandleCreator(formsTemplates);

		useEffect(() => {
			handleManager({ forms });
			return () => {
				handleManager({ forms: [] });
			};
		}, []);

		return (
			<Contents row={10} titleColor="#d2d0d0">
				<Header color="#d2d0d0">インターンシップ参加申請書</Header>
				<Row>
					<TitleColumn vPos="center" hPos="center" size={1.5}>
						クラス
					</TitleColumn>
					<ValueColumn vPos="center" hPos="center">
						{values.schoolClass}
					</ValueColumn>
					<TitleColumn vPos="center" hPos="center" size={1.25}>
						出席番号
					</TitleColumn>
					<ValueColumn vPos="center" hPos="center">
						{values.classNumber}
					</ValueColumn>
					<TitleColumn vPos="center" hPos="center">
						氏名
					</TitleColumn>
					<ValueColumn vPos="center" hPos="left" size={2}>
						{values.personName}
					</ValueColumn>
				</Row>
				<Row>
					<TitleColumn>記入日</TitleColumn>
					<ValueColumn>{values.inputDate}</ValueColumn>
				</Row>
				<Row>
					<TitleColumn>参加予定期間</TitleColumn>
					<ValueColumn>
						{values.participationDate.startDate}
						{values.participationDate.endDate}
					</ValueColumn>
				</Row>
			</Contents>
		);
	},
};
