import * as React from "react";
import { Header, Contents, Row, Column } from "../components/index";
// import Header from "../components/Header";
// import Contents from "../components/Contents";
// import Row from "../components/Row";
// import Column from "../components/Column";
// import { TitleColumn, ValueColumn } from "../components/Column";

export function OfficialAbsence() {
	return (
		<div id="content">
			<Header>公欠申請書</Header>
			<Contents>
				<Row>
					<Column type="title">クラス</Column>
					<Column type="value"></Column>
				</Row>
			</Contents>
		</div>
	);
}
