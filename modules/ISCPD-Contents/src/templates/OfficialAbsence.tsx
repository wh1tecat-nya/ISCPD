import React, { useEffect } from "react";

import { Header, Contents, Row, Column, TitleColumn, ValueColumn } from "../components";
import { Template, InitialForms, TemplateProps } from "../types";

import useInputHandleCreator from "../handler/InputHandleCreator";

const formsTemplates: InitialForms = [
	{
		name: "クラス",
		key: "schoolClass",
		type: "Text",
		placeholder: "342(4T1)",
	},
	{ name: "学籍番号", key: "studentNumber", type: "Text" },
	{ name: "氏名", key: "personName", type: "Text" },
	{ name: "記入日", key: "inputDate", type: "Date" },
	{
		name: "公欠期間",
		key: "oaDate",
		type: "DateRange",
		forms: [
			{ name: "公欠開始日", key: "oaStartDate", type: "Date" },
			{ name: "公欠終了日", key: "oaEndDate", type: "Date" },
		],
	},
	{ name: "公欠理由", key: "oaReason", type: "TextArea" },
	{
		name: "出席できない授業",
		type: "Grouped",
		key: "restSubjects",
		amount: 8,
		forms: [
			{
				name: "日付(曜日)",
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
	{ name: "その他・特記事項", key: "other", type: "TextArea" },
];

export const OfficialAbsence: Template = {
	description: "公欠申請用テンプレート",
	size: "A4",
	component: (props: TemplateProps) => {
		const { handleManager, pref } = props;
		const [values, forms] = useInputHandleCreator(formsTemplates);

		useEffect(() => {
			handleManager({ forms });
			return () => {
				handleManager({ forms: [] });
			};
		}, []);

		return (
			<Contents top={15} bottom={30} row={15} titleColor="#d2d0d0" ref={pref}>
				<Header color="#d2d0d0">公欠申請書</Header>
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
						{values.studentNumber}
					</ValueColumn>
					<TitleColumn vPos="center" hPos="center" size={1.25}>
						氏名
					</TitleColumn>
					<ValueColumn vPos="center" hPos="left" size={2}>
						{values.personName}
					</ValueColumn>
				</Row>
				<Row>
					<TitleColumn vPos="center" hPos="center" size={1.5}>
						記入日
					</TitleColumn>
					<ValueColumn vPos="center">{values.inputDate}</ValueColumn>
				</Row>
				<Row>
					<TitleColumn vPos="center" hPos="center" size={1.5}>
						公欠期間
					</TitleColumn>
					<ValueColumn vPos="center">
						{values.oaDate.oaStartDate}
						{values.oaDate.oaEndDate ? `　〜　${values.oaDate.oaEndDate}` : null}
					</ValueColumn>
				</Row>
				<Row size={1}>
					<TitleColumn vPos="center" hPos="center" size={1.5}>
						公欠理由
					</TitleColumn>
					<ValueColumn>{values.oaReason}</ValueColumn>
				</Row>
				<Row>
					<TitleColumn vPos="center" hPos="center" size={1.5}>
						出席できない授業
					</TitleColumn>
					<Column>
						<Row>
							<TitleColumn vPos="center" hPos="center">
								日付(曜日)
							</TitleColumn>
							<TitleColumn vPos="center" hPos="center">
								時限
							</TitleColumn>
							<TitleColumn vPos="center" hPos="center">
								科目名
							</TitleColumn>
						</Row>
						{values.restSubjects.map((v, i) => (
							<Row key={i}>
								<ValueColumn vPos="center" hPos="center">
									{v.dayOfTheWeek}
								</ValueColumn>
								<ValueColumn vPos="center" hPos="center">
									{v.subjectTime}
								</ValueColumn>
								<ValueColumn vPos="center" hPos="center">
									{v.subjectName}
								</ValueColumn>
							</Row>
						))}
					</Column>
				</Row>
				<Row size={1.5}>
					<TitleColumn vPos="center" hPos="center" size={1.5}>
						その他・特記事項
					</TitleColumn>
					<ValueColumn>{values.other}</ValueColumn>
				</Row>
			</Contents>
		);
	},
};
