import React from "react";
import { View, Text, WebView } from "react-native";

import { wrapper } from "./utils/wrappter";
// import { OfficialAbsence } from "ISCPD-Contents";
// import convertComponentToHtml from "./utils/covertComponetToHtml";

// type Props = {
// 	html: string;
// };

export default function App() {
	const htmlString = wrapper();
	console.log(htmlString);

	return (
		<>
			{/* <View>
				<Text>hoge</Text>
			</View> */}
			{/* <WebView
				originWhitelist={["*"]}
				source={{ uri: "https://github.com/facebook/react-native" }}
				style={{ marginTop: 20 }}
			/> */}
			<WebView style={{ marginTop: 30, marginLeft: 30 }} source={{ html: htmlString }} />
		</>
	);
}
