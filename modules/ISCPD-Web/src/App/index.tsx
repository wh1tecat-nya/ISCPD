import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ConnectedRouter } from "connected-react-router";
import { createBrowserHistory } from "history";

import Routes from "./Routes";
import createStore from "../Store";

const history = createBrowserHistory();

const { store, persistor } = createStore(history);

export default function App() {
	return (
		<>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<ConnectedRouter history={history}>
						<Routes />
					</ConnectedRouter>
				</PersistGate>
			</Provider>
		</>
	);
}
